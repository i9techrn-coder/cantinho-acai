'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Sparkles, Zap } from 'lucide-react'

export function Hero({ onOrder }: { onOrder: () => void }) {
    return (
        <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-acai-dark pt-24 pb-16">
            {/* Background Image Setup with Gradients */}
            <div className="absolute inset-0 z-0 bg-acai-dark">
                {/* Imagem de fundo opcional com overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-acai-vibrant/20 via-transparent to-acai-lime/10" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-acai-vibrant/20 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-acai-vibrant/10 rounded-full blur-3xl -ml-32 -mb-32" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                {/* Badge Top */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-acai-lime text-acai-dark font-black tracking-widest uppercase text-xs px-5 py-2 rounded-full mb-8 shadow-lg shadow-acai-lime/20"
                >
                    <Sparkles size={14} fill="currentColor" />
                    O açaí mais recheado da cidade 💜
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-serif font-black text-white mb-8 leading-tight max-w-5xl italic tracking-tighter drop-shadow-2xl"
                >
                    O sabor que <span className="text-acai-vibrant bg-white px-6 rounded-[40px] inline-block -rotate-2 ml-2 shadow-2xl">explode</span> <br />
                    na sua boca.
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-200 font-medium mb-12 max-w-2xl drop-shadow-md leading-relaxed"
                >
                    No Cantinho do Açaí, cada copo é uma obra-prima. Frutas frescas, cremes artesanais e os melhores recheios para você montar do seu jeito.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <button
                        onClick={onOrder}
                        className="btn-primary group flex items-center justify-center gap-3 px-12 py-5 text-xl border-4 border-acai-vibrant hover:bg-acai-dark hover:text-white transition-all shadow-[0_20px_50px_rgba(147,51,234,0.4)] rounded-full bg-acai-vibrant text-white"
                    >
                        <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                        MONTE SEU AÇAÍ
                    </button>

                    <button
                        className="flex items-center gap-3 px-8 py-5 text-lg font-black text-white hover:text-acai-lime transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-acai-lime group-hover:bg-acai-lime/10 transition-all">
                            <Zap size={20} className="text-acai-lime" fill="currentColor" />
                        </div>
                        VER PROMOÇÕES
                    </button>
                </motion.div>
            </div>

            {/* Floating Element decorativo */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] top-1/4 hidden lg:block"
            >
                <div className="p-4 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                    <img src="/pote-acai.png" className="w-40 h-40 object-contain drop-shadow-2xl" alt="Açaí" />
                    <div className="mt-4 text-center">
                        <p className="text-acai-lime font-black text-xs uppercase tracking-widest">Favorito</p>
                        <p className="text-white font-black">Copo Premium</p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
