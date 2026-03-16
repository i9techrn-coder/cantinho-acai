'use client'

import React, { useState, useEffect } from 'react'
import {
    TrendingUp,
    ShoppingBag,
    Clock,
    DollarSign,
    Target,
    ArrowLeft,
    ArrowRight,
    Settings,
    LogOut
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
    // Estados Mock para demonstração (serão ligados ao Supabase no futuro)
    const [metaAnual, setMetaAnual] = useState(150000)
    const [faturamentoDia, setFaturamentoDia] = useState(450.75)
    const [faturamentoAno, setFaturamentoAno] = useState(42500.50)
    const [pedidosDia, setPedidosDia] = useState(18)
    const [pedidosAndamento, setPedidosAndamento] = useState(5)

    const porcentagemMeta = (faturamentoAno / metaAnual) * 100
    const faltaParaMeta = metaAnual - faturamentoAno

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header Admin */}
            <header className="bg-acai-dark text-white p-6 shadow-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                            <img src="/logo-acai2.jpg" alt="Logo" className="w-10 h-10 rounded-xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black italic tracking-tighter">ADMIN DASHBOARD</h1>
                            <p className="text-acai-lime text-xs font-bold uppercase tracking-widest">Cantinho do Açaí</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                            <Settings size={20} />
                        </button>
                        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 bg-red-500/20 text-red-500 px-5 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">
                            <LogOut size={20} /> Sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
                {/* Métricas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <MetricCard
                        title="Pedidos Hoje"
                        value={pedidosDia.toString()}
                        icon={<ShoppingBag className="text-acai-vibrant" />}
                        trend="+12% em relação a ontem"
                    />
                    <MetricCard
                        title="Em Andamento"
                        value={pedidosAndamento.toString()}
                        icon={<Clock className="text-orange-500" />}
                        subtitle="Pedidos sendo preparados"
                    />
                    <MetricCard
                        title="Faturado Hoje"
                        value={`R$ ${faturamentoDia.toFixed(2)}`}
                        icon={<DollarSign className="text-green-500" />}
                        trend="+5% do esperado"
                    />
                    <MetricCard
                        title="Total do Ano"
                        value={`R$ ${faturamentoAno.toLocaleString()}`}
                        icon={<TrendingUp className="text-blue-500" />}
                        subtitle="Valor bruto acumulado"
                    />
                </div>

                {/* Dashboard de Metas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-acai-dark flex items-center gap-3">
                                <Target className="text-acai-vibrant" size={32} /> Meta de Faturamento
                            </h3>
                            <div className="text-right">
                                <span className="text-gray-400 text-sm font-bold uppercase block">Meta Anual</span>
                                <span className="text-2xl font-black text-acai-dark">R$ {metaAnual.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="space-y-6">
                            <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${porcentagemMeta}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-acai-vibrant to-acai-lime relative"
                                >
                                    <div className="absolute inset-0 bg-[rgba(255,255,255,0.1)] bg-[length:20px_20px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                                </motion.div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="p-6 bg-acai-vibrant/5 rounded-3xl border border-acai-vibrant/10">
                                    <span className="text-acai-vibrant text-sm font-bold uppercase block mb-1">Já Conquistado</span>
                                    <span className="text-3xl font-black text-acai-vibrant">{porcentagemMeta.toFixed(1)}%</span>
                                </div>
                                <div className="text-right p-6 bg-orange-500/5 rounded-3xl border border-orange-500/10">
                                    <span className="text-orange-500 text-sm font-bold uppercase block mb-1">Faltam para atingir</span>
                                    <span className="text-3xl font-black text-orange-500">R$ {faltaParaMeta.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Atalhos Rápidos de Gestão */}
                    <div className="bg-acai-dark p-8 rounded-[32px] text-white shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Settings size={22} className="text-acai-lime" /> Gestão do Site
                            </h3>
                            <div className="space-y-4">
                                <AdminButton label="Gerenciar Cardápio" />
                                <AdminButton label="Alterar Chave PIX" />
                                <AdminButton label="Editar Contatos" />
                                <AdminButton label="Banner de Promoção" />
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest">Log de Atividade</p>
                            <p className="text-[10px] text-center text-acai-lime mt-1 italic">Sincronizado com Supabase em tempo real</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function MetricCard({ title, value, icon, trend, subtitle }: any) {
    return (
        <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
                {trend && <span className="text-[10px] font-black uppercase text-green-500 px-2 py-1 bg-green-50 rounded-lg">{trend}</span>}
            </div>
            <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">{title}</h4>
            <div className="text-3xl font-black text-acai-dark tracking-tighter">{value}</div>
            {subtitle && <p className="text-xs text-gray-400 mt-2 font-medium">{subtitle}</p>}
        </div>
    )
}

function AdminButton({ label }: { label: string }) {
    return (
        <button className="w-full p-4 rounded-2xl bg-white/10 hover:bg-acai-vibrant text-left font-bold transition-all flex justify-between items-center group">
            {label}
            <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </button>
    )
}
