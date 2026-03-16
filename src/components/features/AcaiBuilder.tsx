'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShoppingBag, ChevronRight, X, AlertCircle } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

// --- DADOS DO MENU ---
const TAMANHOS = [
    { id: '200ml', nome: '200ml', preco: 9.00, limiteAdicionais: 2, limiteFrutas: 1, scale: 'scale-75', img: '/pote-acai.png' },
    { id: '350ml', nome: '350ml', preco: 12.00, limiteAdicionais: 7, limiteFrutas: 1, scale: 'scale-90', img: '/pote-acai.png' },
    { id: '500ml', nome: '500ml', preco: 16.00, limiteAdicionais: 9, limiteFrutas: 2, scale: 'scale-100', img: '/pote-acai.png' },
    { id: '1litro', nome: '1 Litro', preco: 35.00, limiteAdicionais: 12, limiteFrutas: 3, scale: 'scale-110', img: '/pote-acai.png' }
]

const SABORES = [
    "Açaí Tradicional",
    "Creme de Ovomaltine",
    "Creme de Ninho",
    "Trufado",
    "Creme de Morango",
    "Creme de Amendoim",
    "Creme de Cupuaçu",
    "Creme de Sonho de Valsa",
    "Creme de Tapioca"
]

const FRUTAS = ["Banana", "Morango", "Kiwi", "Uva"]

const ADICIONAIS = [
    "Leite em pó", "Farinha láctea", "Amendoim triturado", "Paçoca em pó",
    "Ovomaltine em pó", "Granola", "Paçoca", "Sucrilhos", "Marshmallow",
    "M&M", "Jujuba", "Chocobol", "Canudo wafer", "Gotas de chocolate"
]

const COBERTURAS = ["Leite condensado", "Calda de morango", "Calda de chocolate"]

const WHATSAPP_NUMERO = "5584987071007"

export function AcaiBuilder() {
    const [step, setStep] = useState(1)

    // Estado do pedido
    const [tamanhoId, setTamanhoId] = useState<string | null>(null)
    const [saborSelecionado, setSaborSelecionado] = useState<string>("Açaí Tradicional")
    const [frutasSelecionadas, setFrutasSelecionadas] = useState<string[]>([])
    const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<string[]>([])
    const [coberturasSelecionadas, setCoberturasSelecionadas] = useState<string[]>([])

    const { addItem } = useCart()
    const [isAdding, setIsAdding] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const tamanhoAtual = useMemo(() => TAMANHOS.find(t => t.id === tamanhoId), [tamanhoId])

    // Limites com base no tamanho selecionado
    const limiteFrutas = tamanhoAtual?.limiteFrutas || 0
    const limiteAdicionais = tamanhoAtual?.limiteAdicionais || 0

    // Helpers de Seleção Simples
    const toggleItem = (item: string, listaAtual: string[], setLista: React.Dispatch<React.SetStateAction<string[]>>, limite: number) => {
        if (listaAtual.includes(item)) {
            setLista(listaAtual.filter(i => i !== item))
        } else {
            if (listaAtual.length < limite) {
                setLista([...listaAtual, item])
            }
        }
    }

    const handleAddToCart = () => {
        if (!tamanhoAtual) return

        setIsAdding(true)

        addItem({
            name: `Açaí ${tamanhoAtual.nome}`,
            price: tamanhoAtual.preco,
            saborBase: saborSelecionado,
            frutas: frutasSelecionadas,
            adicionais: adicionaisSelecionados,
            coberturas: coberturasSelecionadas
        })

        // Timeout para dar feedback visual
        setTimeout(() => {
            setIsAdding(false)
            setShowSuccessModal(true)

            // Disparar evento para atualizar cart count se necessário
            window.dispatchEvent(new CustomEvent('cart-updated'))
        }, 600)
    }

    const resetBuilder = () => {
        setStep(1)
        setTamanhoId(null)
        setSaborSelecionado("Açaí Tradicional")
        setFrutasSelecionadas([])
        setAdicionaisSelecionados([])
        setCoberturasSelecionadas([])
        setShowSuccessModal(false)
    }

    // Renderizadores de Etapas
    const renderStepTamanho = () => (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-10">
                <h3 className="text-3xl font-serif font-black text-acai-dark mb-4">Escolha o Tamanho</h3>
                <p className="text-gray-500 font-medium max-w-lg mx-auto">Selecione o tamanho ideal pra sua fome! Cada tamanho dá direito a uma quantidade diferente de complementos.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TAMANHOS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTamanhoId(t.id)}
                        className={`relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center group ${tamanhoId === t.id
                            ? 'border-acai-vibrant bg-acai-light/50 scale-105 shadow-xl shadow-acai-vibrant/20'
                            : 'border-transparent bg-white hover:border-acai-lime/50 hover:shadow-lg shadow-sm'
                            }`}
                    >
                        {tamanhoId === t.id && (
                            <div className="absolute top-4 right-4 bg-acai-vibrant text-white rounded-full p-1 animate-in zoom-in z-10">
                                <Check size={16} strokeWidth={3} />
                            </div>
                        )}

                        <div className={`w-28 h-28 mb-6 relative transition-transform duration-500 ease-in-out group-hover:-translate-y-2 ${t.scale}`}>
                            <img src={t.img} alt={t.nome} className={`w-full h-full object-contain drop-shadow-xl ${tamanhoId === t.id ? 'opacity-100 scale-110' : 'opacity-80'}`} />
                        </div>

                        <h4 className="text-2xl font-black text-acai-dark mb-2 mt-4">{t.nome}</h4>
                        <div className="text-acai-vibrant font-black text-xl mb-4">
                            R$ {t.preco.toFixed(2)}
                        </div>

                        <div className="w-full h-px bg-gray-100 my-4" />

                        <div className="space-y-2 text-sm font-bold text-gray-500 w-full">
                            <div className="flex justify-between items-center px-2 py-1 rounded-lg bg-gray-50">
                                <span>Complementos</span>
                                <span className="text-acai-dark bg-acai-lime/20 px-2 py-0.5 rounded text-xs">{t.limiteAdicionais} incluídos</span>
                            </div>
                            <div className="flex justify-between items-center px-2 py-1 rounded-lg bg-gray-50">
                                <span>Frutas</span>
                                <span className="text-acai-dark bg-acai-lime/20 px-2 py-0.5 rounded text-xs">{t.limiteFrutas} incluídas</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    disabled={!tamanhoId}
                    onClick={() => setStep(2)}
                    className="btn-primary flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 px-12 py-4 text-xl"
                >
                    Avançar para Escolher Sabores
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    )

    const renderStepSabores = () => (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-serif font-black text-acai-dark mb-4">Base e Sabores</h3>
                <p className="text-gray-500 font-medium">Você quer açaí puro ou os nossos cremes deliciosos?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SABORES.map(sabor => (
                    <button
                        key={sabor}
                        onClick={() => setSaborSelecionado(sabor)}
                        className={`p-5 rounded-2xl border-2 font-bold text-left transition-all ${saborSelecionado === sabor
                            ? 'border-acai-vibrant bg-acai-vibrant text-white shadow-lg shadow-acai-vibrant/30'
                            : 'border-transparent bg-white text-acai-dark hover:border-acai-light shadow-sm'
                            }`}
                    >
                        {sabor}
                    </button>
                ))}
            </div>

            <div className="flex w-full justify-between mt-12 pt-8 border-t border-gray-100">
                <button onClick={() => setStep(1)} className="px-6 py-3 font-bold text-gray-400 hover:text-acai-dark transition-colors">Voltar</button>
                <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">
                    Próximo Passo <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )

    const renderStepRecheios = () => (
        <div className="space-y-12 animate-in slide-in-from-right duration-500">
            <div className="text-center">
                <h3 className="text-3xl font-serif font-black text-acai-dark mb-4">Hora de Rechear!</h3>
                <p className="text-gray-500 font-medium">Você escolheu o copo de <strong>{tamanhoAtual?.nome}</strong>. Selecione seus ingredientes com sabedoria!</p>
            </div>

            {/* Frutas */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h4 className="text-2xl font-black text-acai-dark mb-1 flex items-center gap-2">
                            Frutas 🍎
                        </h4>
                        <p className="text-sm font-medium text-gray-400">Restam <strong className="text-acai-vibrant">{limiteFrutas - frutasSelecionadas.length}</strong> escolhas</p>
                    </div>
                    <div className="bg-acai-light text-acai-vibrant font-black px-4 py-2 rounded-xl text-sm border border-acai-vibrant/20">
                        {frutasSelecionadas.length} / {limiteFrutas}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {FRUTAS.map(f => {
                        const isSelected = frutasSelecionadas.includes(f)
                        const isDisabled = !isSelected && frutasSelecionadas.length >= limiteFrutas
                        return (
                            <button
                                key={f}
                                disabled={isDisabled}
                                onClick={() => toggleItem(f, frutasSelecionadas, setFrutasSelecionadas, limiteFrutas)}
                                className={`p-4 rounded-2xl font-bold border-2 transition-all flex flex-col items-center justify-center text-center gap-2 ${isSelected
                                    ? 'border-acai-lime bg-acai-lime text-acai-dark shadow-md'
                                    : isDisabled
                                        ? 'border-transparent bg-gray-50 text-gray-300 cursor-not-allowed opacity-50'
                                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-acai-light/50 hover:text-acai-vibrant'
                                    }`}
                            >
                                {isSelected && <Check size={20} className="w-full text-acai-dark mb-1" />}
                                {f}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Complementos */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h4 className="text-2xl font-black text-acai-dark mb-1 flex items-center gap-2">
                            Complementos Ccrocantes 🥜
                        </h4>
                        <p className="text-sm font-medium text-gray-400">Restam <strong className="text-acai-vibrant">{limiteAdicionais - adicionaisSelecionados.length}</strong> escolhas</p>
                    </div>
                    <div className="bg-acai-light text-acai-vibrant font-black px-4 py-2 rounded-xl text-sm border border-acai-vibrant/20">
                        {adicionaisSelecionados.length} / {limiteAdicionais}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {ADICIONAIS.map(a => {
                        const isSelected = adicionaisSelecionados.includes(a)
                        const isDisabled = !isSelected && adicionaisSelecionados.length >= limiteAdicionais
                        return (
                            <button
                                key={a}
                                disabled={isDisabled}
                                onClick={() => toggleItem(a, adicionaisSelecionados, setAdicionaisSelecionados, limiteAdicionais)}
                                className={`py-4 px-3 rounded-xl font-bold border-2 transition-all flex items-center justify-between text-left text-sm ${isSelected
                                    ? 'border-acai-lime bg-acai-lime/20 text-acai-dark'
                                    : isDisabled
                                        ? 'border-transparent bg-gray-50 text-gray-300 cursor-not-allowed opacity-50'
                                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-acai-light/50 hover:text-acai-vibrant'
                                    }`}
                            >
                                {a}
                                {isSelected && <Check size={16} className="text-acai-lime" />}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Coberturas */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h4 className="text-2xl font-black text-acai-dark mb-1 flex items-center gap-2">
                            Cobertura 🍫
                        </h4>
                        <p className="text-sm font-medium text-gray-400">A vontade! Pode misturar.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {COBERTURAS.map(c => {
                        const isSelected = coberturasSelecionadas.includes(c)
                        return (
                            <button
                                key={c}
                                onClick={() => {
                                    if (coberturasSelecionadas.includes(c)) setCoberturasSelecionadas(coberturasSelecionadas.filter(item => item !== c))
                                    else setCoberturasSelecionadas([...coberturasSelecionadas, c])
                                }}
                                className={`p-4 rounded-2xl font-bold border-2 transition-all flex justify-between items-center ${isSelected
                                    ? 'border-acai-vibrant bg-acai-vibrant text-white shadow-md'
                                    : 'border-transparent bg-gray-50 text-gray-600 hover:bg-acai-light hover:text-acai-vibrant'
                                    }`}
                            >
                                {c}
                                {isSelected && <Check size={20} />}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="flex w-full justify-between mt-12 pt-8 border-t border-gray-100 mb-20">
                <button onClick={() => setStep(2)} className="px-6 py-3 font-bold text-gray-400 hover:text-acai-dark transition-colors">Voltar</button>
                {/* Usamos link_href em vez disso e estilizamos como botão */}
            </div>

            {/* Botão Fixo Flutuante de Pedido (Visível apenas na última etapa) */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-acai-light shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-center animate-in slide-in-from-bottom duration-500">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-6 px-4">
                    <div className="hidden md:block">
                        <span className="text-gray-500 font-medium text-sm block">Valor desta montagem:</span>
                        <span className="text-2xl font-black text-acai-dark">R$ {tamanhoAtual?.preco?.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 max-w-lg btn-primary flex items-center justify-center gap-3 py-4 text-xl disabled:opacity-75 disabled:cursor-wait"
                    >
                        {isAdding ? (
                            <><ShoppingBag size={24} className="animate-bounce" /> Adicionando...</>
                        ) : (
                            <><ShoppingBag size={24} /> Adicionar ao Carrinho</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Progresso UI */}
            <div className="flex items-center justify-center mb-16 max-w-2xl mx-auto relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                    <div className="h-full bg-acai-lime transition-all duration-700 ease-out" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                </div>

                <div className="w-full flex justify-between relative z-10 px-2 lg:px-0">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="flex flex-col items-center gap-3">
                            <button
                                onClick={() => setStep(s > step ? step : s)}
                                className={`w-12 h-12 rounded-full font-black text-xl flex items-center justify-center transition-all duration-500 shadow-md border-4 ${step === s
                                    ? 'bg-acai-vibrant text-white border-transparent scale-110 shadow-acai-vibrant/30'
                                    : step > s
                                        ? 'bg-acai-lime text-acai-dark border-transparent'
                                        : 'bg-white text-gray-300 border-gray-100'
                                    }`}
                            >
                                {step > s ? <Check strokeWidth={4} /> : s}
                            </button>
                            <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block ${step === s ? 'text-acai-vibrant' : step > s ? 'text-acai-dark' : 'text-gray-300'}`}>
                                {s === 1 ? 'Copo' : s === 2 ? 'Base' : 'Ingredientes'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Conteúdo Dinâmico */}
            <AnimatePresence mode="wait">
                {step === 1 && <motion.div key="1" exit={{ opacity: 0, x: -50 }}>{renderStepTamanho()}</motion.div>}
                {step === 2 && <motion.div key="2" exit={{ opacity: 0, x: -50 }}>{renderStepSabores()}</motion.div>}
                {step === 3 && <motion.div key="3" exit={{ opacity: 0, x: -50 }}>{renderStepRecheios()}</motion.div>}
            </AnimatePresence>

            {/* Modal de Sucesso - Decisão do Cliente */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-acai-dark/80 backdrop-blur-sm"
                            onClick={resetBuilder}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[40px] p-8 md:p-12 max-w-lg w-full relative z-10 shadow-3xl text-center"
                        >
                            <div className="w-20 h-20 bg-acai-lime rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-acai-lime/20">
                                <Check size={40} className="text-acai-dark" strokeWidth={3} />
                            </div>

                            <h3 className="text-3xl font-serif font-black text-acai-dark mb-4 italic">Açaí Adicionado! 🍧</h3>
                            <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
                                Seu delicioso açaí de {tamanhoAtual?.nome} já está no carrinho. O que faremos agora?
                            </p>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => window.location.href = '/checkout'}
                                    className="w-full bg-acai-vibrant text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-acai-vibrant/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    <ShoppingBag size={24} /> FINALIZAR PEDIDO
                                </button>

                                <button
                                    onClick={resetBuilder}
                                    className="w-full bg-gray-50 text-acai-vibrant font-black py-5 rounded-2xl text-lg hover:bg-acai-light hover:text-acai-dark transition-all border-2 border-transparent hover:border-acai-vibrant/10"
                                >
                                    + ADICIONAR MAIS ITENS
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
