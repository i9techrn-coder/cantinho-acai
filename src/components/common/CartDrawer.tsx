'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowLeft, Smartphone, CreditCard, Banknote, Copy, CheckCircle2, Phone } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { QRCodeSVG } from 'qrcode.react'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
    onNavigateToPedido: () => void
    whatsappNumber: string
}

type CheckoutStep = 'cart' | 'identification' | 'delivery' | 'payment'

export function CartDrawer({ isOpen, onClose, onNavigateToPedido, whatsappNumber }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
    const [step, setStep] = useState<CheckoutStep>('cart')

    // Form states
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [complement, setComplement] = useState('')

    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'money' | 'card'>('pix')
    const [changeFor, setChangeFor] = useState('')
    const [cardType, setCardType] = useState('debito')
    const [cardBrand, setCardBrand] = useState('Visa')

    // PIX Specific State
    const [pixPaid, setPixPaid] = useState(false)
    const [copiedPix, setCopiedPix] = useState(false)
    const pixKey = "84987071007"

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('cart')
                setPixPaid(false)
                setCopiedPix(false)
            }, 300)
        }
    }, [isOpen])

    const handleCopyPix = () => {
        navigator.clipboard.writeText(pixKey)
        setCopiedPix(true)
        setTimeout(() => setCopiedPix(false), 2000)
    }

    const isStepValid = () => {
        if (step === 'identification') return name.trim().length > 2 && phone.trim().length > 8
        if (step === 'delivery') return street.trim().length > 3 && number.trim().length > 0 && neighborhood.trim().length > 2
        if (step === 'payment' && paymentMethod === 'pix') return pixPaid
        if (step === 'payment' && paymentMethod === 'money') return true
        if (step === 'payment' && paymentMethod === 'card') return true
        return true
    }

    const handleCheckout = () => {
        let paymentDetails = ''
        if (paymentMethod === 'pix') {
            paymentDetails = 'PIX (Pagamento Online Realizado)'
        } else if (paymentMethod === 'money') {
            paymentDetails = `Dinheiro\nTroco para: R$ ${changeFor || 'Não precisa de troco'}`
        } else {
            paymentDetails = `Cartão de ${cardType === 'debito' ? 'Débito' : 'Crédito'} (Bandeira: ${cardBrand})`
        }

        const itemsText = items.map(item => {
            let desc = `- ${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)})\n`
            if (item.saborBase) desc += `  Base: ${item.saborBase}\n`
            if (item.frutas && item.frutas.length > 0) desc += `  Frutas: ${item.frutas.join(', ')}\n`
            if (item.adicionais && item.adicionais.length > 0) desc += `  Complementos: ${item.adicionais.join(', ')}\n`
            if (item.coberturas && item.coberturas.length > 0) desc += `  Coberturas: ${item.coberturas.join(', ')}\n`
            return desc
        }).join('\n')

        const message = `*NOVO PEDIDO - Cantinho do Açaí* 🍧\n\n` +
            `*👤 DADOS DO CLIENTE:*\n` +
            `Nome: ${name}\n` +
            `Celular: ${phone}\n\n` +
            `*📍 ENDEREÇO DE ENTREGA:*\n` +
            `${street}, ${number}\n` +
            `Bairro: ${neighborhood}\n` +
            (complement ? `Complemento: ${complement}\n\n` : '\n') +
            `*🛍️ ITENS DO PEDIDO:*\n` +
            `${itemsText}\n` +
            `*Total do Pedido: R$ ${totalPrice.toFixed(2)}*\n\n` +
            `*💳 FORMA DE PAGAMENTO:*\n` +
            `${paymentDetails}`

        const encodedMessage = encodeURIComponent(message)
        window.open(`https://wa.me/55${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank')
        onClose()
    }

    const renderHeaderTitle = () => {
        if (step === 'cart') return 'Seu Carrinho'
        if (step === 'identification') return 'Seus Dados'
        if (step === 'delivery') return 'Entrega'
        if (step === 'payment') return 'Pagamento'
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed right-0 top-0 h-[100dvh] w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center bg-acai-light/30 border-acai-vibrant/20">
                            <div className="flex items-center gap-3">
                                {step !== 'cart' && (
                                    <button
                                        onClick={() => {
                                            if (step === 'identification') setStep('cart')
                                            if (step === 'delivery') setStep('identification')
                                            if (step === 'payment') setStep('delivery')
                                        }}
                                        className="p-2 hover:bg-white rounded-full transition-colors text-acai-dark"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                )}
                                <h2 className="text-2xl font-serif font-black text-acai-dark tracking-tighter italic">{renderHeaderTitle()}</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                            {/* STEP 1: CART */}
                            {step === 'cart' && (
                                <>
                                    {items.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                                            <ShoppingBag size={64} strokeWidth={1} className="text-acai-lime" />
                                            <p className="font-medium">Seu carrinho está vazio.</p>
                                            <button
                                                onClick={() => { onClose(); onNavigateToPedido(); }}
                                                className="mt-4 px-8 py-3 bg-acai-vibrant text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                                            >
                                                Montar Açaí
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {items.map(item => (
                                                <div key={item.id} className="flex gap-4 items-start bg-white p-4 rounded-3xl border border-acai-light hover:border-acai-vibrant/20 transition-all shadow-sm">
                                                    <div className="w-16 h-16 bg-acai-light rounded-2xl flex items-center justify-center text-3xl shrink-0">
                                                        🍧
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-black text-acai-dark leading-tight">{item.name}</h4>
                                                        {item.saborBase && <p className="text-xs text-gray-500 mt-1"><span className="font-bold">Base:</span> {item.saborBase}</p>}
                                                        {((item.frutas?.length || 0) > 0 || (item.adicionais?.length || 0) > 0) && (
                                                            <p className="text-xs text-acai-vibrant line-clamp-1 mt-0.5">
                                                                +[...] opções
                                                            </p>
                                                        )}
                                                        <p className="text-sm text-green-600 font-bold mt-2">R$ {item.price.toFixed(2)}</p>

                                                        <div className="flex items-center gap-3 mt-3">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 border rounded-lg hover:bg-gray-50 transition-colors"><Minus size={14} /></button>
                                                            <span className="font-black text-acai-dark w-6 text-center">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 border rounded-lg hover:bg-gray-50 transition-colors"><Plus size={14} /></button>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all shrink-0"><Trash2 size={20} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* STEP 2: IDENTIFICATION */}
                            {step === 'identification' && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <label className="block text-sm font-bold text-acai-dark mb-1 ml-1">Seu Nome</label>
                                        <input
                                            type="text"
                                            value={name} onChange={e => setName(e.target.value)}
                                            placeholder="Nome completo"
                                            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-acai-dark mb-1 ml-1">Celular / WhatsApp (Com DDD)</label>
                                        <input
                                            type="tel"
                                            value={phone} onChange={e => setPhone(e.target.value)}
                                            placeholder="(84) 99999-9999"
                                            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none shadow-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: DELIVERY */}
                            {step === 'delivery' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <label className="block text-sm font-bold text-acai-dark mb-1 ml-1">Rua / Avenida</label>
                                        <input
                                            type="text"
                                            value={street} onChange={e => setStreet(e.target.value)}
                                            placeholder="Ex: Av. Bernardo Vieira"
                                            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none shadow-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-acai-dark mb-1 ml-1">Número</label>
                                            <input
                                                type="text"
                                                value={number} onChange={e => setNumber(e.target.value)}
                                                placeholder="S/N ou Ex: 123"
                                                className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-acai-dark mb-1 ml-1">Bairro</label>
                                            <input
                                                type="text"
                                                value={neighborhood} onChange={e => setNeighborhood(e.target.value)}
                                                placeholder="Ex: Tirol"
                                                className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-acai-dark mb-1 ml-1">Ponto de Ref. / Comp.</label>
                                        <input
                                            type="text"
                                            value={complement} onChange={e => setComplement(e.target.value)}
                                            placeholder="Apto, Casa, Em frente a..."
                                            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none shadow-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: PAYMENT */}
                            {step === 'payment' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={() => { setPaymentMethod('pix'); setPixPaid(false); }}
                                            className={`p-4 rounded-2xl border-2 text-center transition-all ${paymentMethod === 'pix' ? 'border-acai-vibrant bg-acai-vibrant/5 text-acai-vibrant' : 'border-gray-100 hover:border-gray-200 bg-white text-gray-500'}`}
                                        >
                                            <Smartphone className="mx-auto mb-2" size={24} />
                                            <span className="font-bold text-sm">Pix</span>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('card')}
                                            className={`p-4 rounded-2xl border-2 text-center transition-all ${paymentMethod === 'card' ? 'border-acai-vibrant bg-acai-vibrant/5 text-acai-vibrant' : 'border-gray-100 hover:border-gray-200 bg-white text-gray-500'}`}
                                        >
                                            <CreditCard className="mx-auto mb-2" size={24} />
                                            <span className="font-bold text-sm">Cartão</span>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('money')}
                                            className={`p-4 rounded-2xl border-2 text-center transition-all ${paymentMethod === 'money' ? 'border-acai-vibrant bg-acai-vibrant/5 text-acai-vibrant' : 'border-gray-100 hover:border-gray-200 bg-white text-gray-500'}`}
                                        >
                                            <Banknote className="mx-auto mb-2" size={24} />
                                            <span className="font-bold text-sm">Dinheiro</span>
                                        </button>
                                    </div>

                                    {paymentMethod === 'pix' && (
                                        <div className="animate-in fade-in slide-in-from-top-4 space-y-4">
                                            <div className="bg-white border-2 border-acai-lime rounded-3xl p-4 sm:p-6 text-center space-y-3 sm:space-y-4 shadow-sm relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-acai-lime/20 blur-3xl rounded-full" />
                                                <h4 className="font-black text-acai-dark text-lg md:text-xl relative z-10">Pagamento via PIX</h4>
                                                <p className="text-gray-500 text-xs sm:text-sm relative z-10">Use este QR Code para pagar <strong className="text-acai-vibrant">R$ {totalPrice.toFixed(2)}</strong>.</p>

                                                <div className="bg-white p-3 rounded-2xl shadow-md inline-block mx-auto relative z-10 border border-gray-100">
                                                    <QRCodeSVG value={`${pixKey}`} size={140} level="M" fgColor="#37073b" />
                                                </div>

                                                <div className="pt-2 relative z-10">
                                                    <p className="text-xs sm:text-sm font-bold text-gray-500 mb-2">Ou pague via Chave PIX (Telefone):</p>
                                                    <button
                                                        onClick={handleCopyPix}
                                                        className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:border-acai-vibrant hover:bg-acai-light transition-colors group"
                                                    >
                                                        <span className="font-mono font-black text-acai-dark tracking-widest text-sm">{pixKey}</span>
                                                        {copiedPix ? <CheckCircle2 className="text-green-500" size={18} /> : <Copy className="text-gray-400 group-hover:text-acai-vibrant" size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <label className={`flex items-start gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-colors shadow-sm ${pixPaid ? 'bg-green-50/50 border-green-500' : 'bg-white border-gray-200 hover:border-acai-vibrant/50'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={pixPaid}
                                                    onChange={e => setPixPaid(e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-300 mt-0.5 text-green-500 focus:ring-green-500 accent-green-500 cursor-pointer"
                                                />
                                                <span className={`font-bold select-none text-xs sm:text-sm ${pixPaid ? 'text-green-700' : 'text-acai-dark'}`}>
                                                    Confirmo que já realizei o pagamento via PIX neste aparelho de forma independente.
                                                </span>
                                            </label>
                                        </div>
                                    )}

                                    {paymentMethod === 'money' && (
                                        <div className="animate-in fade-in slide-in-from-top-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                            <label className="block text-sm font-bold text-acai-dark mb-2">Troco para quanto?</label>
                                            <input
                                                type="text"
                                                value={changeFor} onChange={e => setChangeFor(e.target.value)}
                                                placeholder="Ex: Vou pagar com R$ 100"
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none transition-all"
                                            />
                                            <p className="text-xs text-gray-400 mt-2 font-medium ml-1">Deixe em branco se não precisar de troco.</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                            <div>
                                                <label className="block text-sm font-bold text-acai-dark mb-2">Qual cartão você vai passar lá na porta?</label>
                                                <div className="flex bg-gray-100 p-1.5 rounded-[20px]">
                                                    <button onClick={() => setCardType('debito')} className={`flex-1 py-3 rounded-2xl font-bold transition-all ${cardType === 'debito' ? 'bg-white shadow-sm text-acai-dark' : 'text-gray-500 hover:text-gray-700'}`}>Débito</button>
                                                    <button onClick={() => setCardType('credito')} className={`flex-1 py-3 rounded-2xl font-bold transition-all ${cardType === 'credito' ? 'bg-white shadow-sm text-acai-dark' : 'text-gray-500 hover:text-gray-700'}`}>Crédito</button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-acai-dark mb-2">Qual a bandeira?</label>
                                                <select
                                                    value={cardBrand} onChange={e => setCardBrand(e.target.value)}
                                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-acai-vibrant focus:border-transparent outline-none transition-all text-gray-700 font-bold appearance-none"
                                                >
                                                    <option value="Visa">Visa</option>
                                                    <option value="Mastercard">Mastercard</option>
                                                    <option value="Elo">Elo</option>
                                                    <option value="Hipercard">Hipercard</option>
                                                    <option value="American Express">American Express</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {items.length > 0 && (
                            <div className="shrink-0 p-4 sm:p-6 border-t bg-white rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
                                <div className="flex justify-between text-lg sm:text-xl font-black mb-4 text-acai-dark">
                                    <span>Total Pedido</span>
                                    <span className="text-green-600">R$ {totalPrice.toFixed(2)}</span>
                                </div>
                                <button
                                    disabled={!isStepValid()}
                                    onClick={() => {
                                        if (step === 'cart') setStep('identification')
                                        else if (step === 'identification') setStep('delivery')
                                        else if (step === 'delivery') setStep('payment')
                                        else if (step === 'payment') handleCheckout()
                                    }}
                                    className="w-full py-4 bg-green-500 text-white rounded-[20px] text-lg font-black shadow-xl shadow-green-500/30 border-2 border-green-400 hover:bg-green-600 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {step === 'cart' ? 'Prosseguir para Checkout'
                                        : step === 'payment' ? <><Phone size={20} /> Enviar p/ WhatsApp e Finalizar</>
                                            : 'Continuar Preenchimento'}
                                </button>
                                {step === 'cart' && (
                                    <button
                                        onClick={() => { onClose(); onNavigateToPedido(); }}
                                        className="w-full text-center mt-3 font-bold text-acai-vibrant hover:underline"
                                    >
                                        Concluir este e comprar mais 👉
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    )
}
