'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronLeft,
    MapPin,
    Phone,
    User,
    ShoppingBag,
    MessageCircle,
    Truck,
    CreditCard,
    QrCode,
    Banknote,
    CheckCircle2,
    Loader2,
    Copy,
    Check
} from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useFlashData } from '@/hooks/useFlashData'

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart()
    const { data: storeData, loading } = useFlashData()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        nome: '',
        whatsapp: '',
        rua: '',
        numero: '',
        bairro: '',
        complemento: '',
        pagamento: 'pix',
        cartaoTipo: 'debito',
        cartaoBandeira: 'visa',
        troco: ''
    })

    const [pixConfirmado, setPixConfirmado] = useState(false)
    const [copiado, setCopiado] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (items.length === 0) return

        if (formData.pagamento === 'pix' && !pixConfirmado) {
            alert('Por favor, confirme que realizou o pagamento via PIX.')
            return
        }

        setIsProcessing(true)

        // Formatação da mensagem para o WhatsApp
        const itemsText = items.map(item => {
            let details = `*${item.name}* (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`
            details += `   Base: ${item.saborBase}\n`
            if (item.frutas.length > 0) details += `   Frutas: ${item.frutas.join(', ')}\n`
            if (item.adicionais.length > 0) details += `   Adicionais: ${item.adicionais.join(', ')}\n`
            if (item.coberturas.length > 0) details += `   Coberturas: ${item.coberturas.join(', ')}\n`
            return details
        }).join('\n')

        const entregaText = `📍 *Endereço de Entrega:*\n${formData.rua}, ${formData.numero}\nBairro: ${formData.bairro}\n${formData.complemento ? `Ref: ${formData.complemento}` : ''}`

        let pagamentoText = `💳 *Forma de Pagamento:* `
        if (formData.pagamento === 'pix') {
            pagamentoText += `PIX`
        } else if (formData.pagamento === 'cartao') {
            pagamentoText += `CARTÃO (${formData.cartaoTipo.toUpperCase()} - ${formData.cartaoBandeira.toUpperCase()})`
        } else {
            pagamentoText += `DINHEIRO${formData.troco ? ` (Troco para R$ ${formData.troco})` : ''}`
        }

        const fullMessage = `💜 *NOVO PEDIDO - CANTINHO DO AÇAÍ*\n\n` +
            `👤 *Cliente:* ${formData.nome}\n` +
            `📱 *WhatsApp:* ${formData.whatsapp}\n\n` +
            `🛒 *Itens:*\n${itemsText}\n` +
            `💰 *TOTAL: R$ ${totalPrice.toFixed(2)}*\n\n` +
            `${entregaText}\n\n` +
            `${pagamentoText}\n\n` +
            `--- Enviado via Site ---`

        const whatsappUrl = `https://wa.me/${storeData?.contact?.whatsapp || '5584987071007'}?text=${encodeURIComponent(fullMessage)}`

        // Simulação de processamento
        setTimeout(() => {
            window.open(whatsappUrl, '_blank')
            setIsProcessing(false)
            setIsFinished(true)
            clearCart()
        }, 1500)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-acai-dark flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-acai-lime mb-4" size={48} />
                <p className="text-white font-serif italic text-xl">Preparando seu checkout...</p>
            </div>
        )
    }

    if (isFinished) {
        return (
            <div className="min-h-screen bg-acai-dark flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-[40px] p-12 max-w-lg w-full text-center shadow-3xl"
                >
                    <div className="w-24 h-24 bg-acai-lime rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-acai-lime/20">
                        <CheckCircle2 size={48} className="text-acai-dark" />
                    </div>
                    <h2 className="text-4xl font-serif font-black text-acai-dark mb-4 italic">Pedido Enviado!</h2>
                    <p className="text-gray-500 font-medium mb-12 text-lg">
                        Seu pedido foi encaminhado para o nosso WhatsApp. Em instantes confirmaremos tudo com você!
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-acai-vibrant text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-acai-vibrant/20 hover:scale-105 transition-all"
                    >
                        VOLTAR PARA O INÍCIO
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="p-3 bg-white rounded-2xl text-acai-vibrant shadow-sm hover:bg-acai-light transition-colors"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <h1 className="text-3xl md:text-5xl font-serif font-black text-acai-dark italic">Finalizar <span className="text-acai-vibrant">Pedido</span></h1>
                    <div className="w-12 h-12" /> {/* Spacer */}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            {/* Dados Pessoais */}
                            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
                                <h3 className="text-xl font-black text-acai-dark mb-8 flex items-center gap-3 uppercase tracking-tighter">
                                    <User className="text-acai-vibrant" size={24} /> Seus Dados
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Nome Completo</label>
                                        <input required name="nome" value={formData.nome} onChange={handleInputChange} type="text" placeholder="Como podemos te chamar?" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">WhatsApp</label>
                                        <input required name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="tel" placeholder="(00) 00000-0000" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                    </div>
                                </div>
                            </div>

                            {/* Entrega */}
                            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
                                <h3 className="text-xl font-black text-acai-dark mb-8 flex items-center gap-3 uppercase tracking-tighter">
                                    <MapPin className="text-acai-vibrant" size={24} /> Onde Entregar?
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Rua / Avenida</label>
                                        <input required name="rua" value={formData.rua} onChange={handleInputChange} type="text" placeholder="Nome da rua" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Número</label>
                                        <input required name="numero" value={formData.numero} onChange={handleInputChange} type="text" placeholder="Ex: 123" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Bairro</label>
                                        <input required name="bairro" value={formData.bairro} onChange={handleInputChange} type="text" placeholder="Seu bairro" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Ponto de Referência</label>
                                        <input name="complemento" value={formData.complemento} onChange={handleInputChange} type="text" placeholder="Próximo a..." className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                    </div>
                                </div>
                            </div>

                            {/* Pagamento */}
                            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
                                <h3 className="text-xl font-black text-acai-dark mb-8 flex items-center gap-3 uppercase tracking-tighter">
                                    <CreditCard className="text-acai-vibrant" size={24} /> Pagamento
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    {[
                                        { id: 'pix', label: 'Pix', icon: QrCode },
                                        { id: 'cartao', label: 'Cartão', icon: CreditCard },
                                        { id: 'dinheiro', label: 'Dinheiro', icon: Banknote }
                                    ].map(method => (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, pagamento: method.id }))}
                                            className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${formData.pagamento === method.id
                                                ? 'border-acai-vibrant bg-acai-light/30 text-acai-vibrant shadow-md'
                                                : 'border-gray-50 bg-gray-50 text-gray-400 hover:bg-white hover:border-acai-light'}`}
                                        >
                                            <method.icon size={32} />
                                            <span className="font-black uppercase tracking-widest text-xs">{method.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {formData.pagamento === 'pix' && (
                                        <motion.div
                                            key="pix-info"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="space-y-6"
                                        >
                                            <div className="bg-[#FAFDF2] p-6 md:p-8 rounded-[30px] border-2 border-[#84CC16] shadow-sm text-center space-y-6">
                                                <h4 className="text-2xl font-black text-[#40186F] tracking-tight">Pagamento via PIX</h4>

                                                <p className="text-gray-500 font-bold text-base">
                                                    Use este QR Code para pagar <span className="text-[#40186F]">R$ {totalPrice.toFixed(2)}</span>.
                                                </p>

                                                <div className="relative inline-block mx-auto">
                                                    <div className="bg-white p-4 rounded-[30px] shadow-xl relative z-10">
                                                        <img
                                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=40186F&data=84987071007`}
                                                            alt="QR Code Pix"
                                                            className="w-48 h-48 md:w-52 md:h-52 rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="absolute -inset-4 bg-acai-lime/10 blur-xl rounded-[60px] -z-10" />
                                                </div>

                                                <div className="space-y-4">
                                                    <p className="text-gray-500 font-black uppercase text-xs tracking-[0.2em]">Ou pague via Chave PIX (Telefone):</p>
                                                    <div className="relative">
                                                        <div className="w-full bg-white border-2 border-dashed border-gray-200 p-6 rounded-[30px] flex items-center justify-between group overflow-hidden">
                                                            <span className="text-[#40186F] font-black text-xl md:text-2xl tracking-widest pl-2">84987071007</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText('84987071007')
                                                                    setCopiado(true)
                                                                    setTimeout(() => setCopiado(false), 2000)
                                                                }}
                                                                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-acai-vibrant hover:bg-acai-light transition-all"
                                                            >
                                                                {copiado ? <Check size={28} className="text-green-500" /> : <Copy size={28} />}
                                                            </button>
                                                        </div>
                                                        <AnimatePresence>
                                                            {copiado && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0 }}
                                                                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-green-600 bg-green-50 px-4 py-1 rounded-full uppercase tracking-widest border border-green-100"
                                                                >
                                                                    Copiado para o Celular!
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Checkbox de Confirmação */}
                                            <div
                                                onClick={() => setPixConfirmado(!pixConfirmado)}
                                                className={`bg-white p-6 rounded-[30px] border-2 transition-all cursor-pointer flex gap-5 items-center shadow-sm ${pixConfirmado ? 'border-acai-vibrant border-opacity-100' : 'border-gray-100'}`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${pixConfirmado ? 'bg-acai-vibrant border-acai-vibrant text-white' : 'bg-gray-50 border-gray-200'}`}>
                                                    {pixConfirmado && <Check size={20} strokeWidth={4} />}
                                                </div>
                                                <p className="text-[#40186F] font-black text-sm md:text-base leading-tight">
                                                    Confirmo que já realizei o pagamento via PIX neste aparelho de forma independente.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {formData.pagamento === 'cartao' && (
                                        <motion.div
                                            key="cartao-info"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-2 gap-3">
                                                {['debito', 'credito'].map(type => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, cartaoTipo: type }))}
                                                        className={`p-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${formData.cartaoTipo === type
                                                            ? 'border-acai-vibrant bg-acai-vibrant text-white'
                                                            : 'border-gray-50 bg-gray-50 text-gray-400'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2 font-sans">Selecione a Bandeira</p>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {['visa', 'master', 'elo', 'hipercard'].map(brand => (
                                                        <button
                                                            key={brand}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, cartaoBandeira: brand }))}
                                                            className={`p-3 rounded-xl border-2 flex items-center justify-center transition-all ${formData.cartaoBandeira === brand
                                                                ? 'border-acai-vibrant bg-acai-vibrant/10 text-acai-vibrant'
                                                                : 'border-gray-50 bg-gray-50 text-gray-300'}`}
                                                        >
                                                            <span className="font-black text-[9px] uppercase">{brand}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {formData.pagamento === 'dinheiro' && (
                                        <motion.div
                                            key="dinheiro-info"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="space-y-2"
                                        >
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Troco para quanto?</label>
                                            <input name="troco" value={formData.troco} onChange={handleInputChange} type="number" placeholder="Ex: 50.00" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-acai-vibrant outline-none transition-all font-bold" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-acai-dark rounded-[40px] p-8 text-white sticky top-28 shadow-2xl">
                            <h3 className="text-2xl font-serif font-black italic mb-6 flex items-center gap-3">
                                <ShoppingBag className="text-acai-lime" size={32} /> Resumo
                            </h3>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                                {items.map((item, idx) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <div className="flex justify-between font-black text-sm mb-1 uppercase tracking-tight">
                                            <span>{item.name}</span>
                                            <span className="text-acai-lime">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                            {item.saborBase} • {item.frutas.length + item.adicionais.length} itens
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-6">
                                <div className="flex justify-between items-center text-white/60 font-bold uppercase tracking-widest text-xs">
                                    <span>SUBTOTAL</span>
                                    <span>R$ {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/60 font-bold uppercase tracking-widest text-xs">
                                    <span>ENTREGA</span>
                                    <span className="text-acai-lime">A DEFINIR</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <span className="font-serif font-black italic text-2xl">TOTAL</span>
                                    <span className="text-4xl font-black text-acai-lime drop-shadow-[0_0_15px_rgba(132,204,22,0.4)]">R$ {totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isProcessing || items.length === 0}
                                className="w-full bg-acai-lime text-acai-dark font-black py-6 rounded-3xl text-xl mt-10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-acai-lime/20 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <Loader2 className="animate-spin" size={28} />
                                ) : (
                                    <><MessageCircle size={28} /> ENVIAR PEDIDO</>
                                )}
                            </button>
                            <p className="text-center text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mt-6">Abertura no WhatsApp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
