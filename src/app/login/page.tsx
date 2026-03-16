'use client'

import React, { useState } from 'react'
import { Lock, User, ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulação de login para o admin
        setTimeout(() => {
            window.location.href = '/admin/dashboard'
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-acai-dark flex items-center justify-center p-4 overflow-hidden relative font-sans">
            {/* Efeitos de Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-acai-vibrant/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-acai-lime/10 rounded-full blur-[120px] -ml-64 -mb-64" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/20">
                    <div className="text-center mb-10">
                        <div className="w-24 h-24 bg-acai-dark rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg rotate-3 overflow-hidden border-4 border-acai-vibrant">
                            <img src="/logo-acai2.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-3xl font-serif font-black text-acai-dark italic tracking-tighter">Painel do Admin</h1>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Cantinho do Açaí</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-acai-dark/50 ml-4">Usuário</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-acai-vibrant transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@cantinho.com"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-acai-vibrant focus:bg-white p-4 pl-14 rounded-2xl outline-none font-bold transition-all text-acai-dark"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-acai-dark/50 ml-4">Senha</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-acai-vibrant transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-acai-vibrant focus:bg-white p-4 pl-14 rounded-2xl outline-none font-bold transition-all text-acai-dark"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-acai-dark text-white p-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-acai-vibrant transition-all shadow-xl shadow-acai-vibrant/20 disabled:opacity-75 group"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>Acessar Dashboard <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            <Sparkles size={12} className="text-acai-lime" /> Sistema de Gestão Cantinho 4.0
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
