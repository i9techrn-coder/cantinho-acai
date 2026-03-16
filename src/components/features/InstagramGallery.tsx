'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

export function InstagramGallery() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 text-[#ff1493] font-black tracking-widest text-sm uppercase"
                        >
                            <span className="w-8 h-[2px] bg-[#ff1493]" />
                            Trend do Momento
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-[#2d1b0d] font-serif tracking-tighter leading-tight">
                            Nossos famosos <br />
                            <span className="text-[#ff1493] italic">Bento Cakes</span>
                        </h2>
                    </div>
                    <p className="text-xl text-[#2d1b0d]/60 max-w-md font-medium">
                        O presente perfeito que virou febre. Mini bolos cheios de personalidade e sabor irresistível.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Main Visual Case */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-7 relative group"
                    >
                        <div className="relative overflow-hidden rounded-[50px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                            <img
                                src="/brain/468c1444-5b84-4e71-8cf4-f57e37f8f635/bento_cakes_gallery_1772968831813.png"
                                alt="Bento Cakes Diversos"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Interaction */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b0d]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12">
                                <div className="flex items-center gap-6 text-white text-xl font-black">
                                    <span className="flex items-center gap-2"><Heart fill="white" size={24} /> 1.2k</span>
                                    <span className="flex items-center gap-2"><MessageCircle size={24} /> 85</span>
                                    <span className="flex items-center gap-2"><Share2 size={24} /></span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Decorative Label */}
                        <div className="absolute -bottom-6 -right-6 md:right-12 z-20 bg-[#ff1493] text-white p-8 rounded-[35px] shadow-2xl rotate-3">
                            <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Mais Pedidos</p>
                            <p className="text-2xl font-black">KITS BENTO</p>
                            <p className="text-3xl font-serif italic">R$ 45,90</p>
                        </div>
                    </motion.div>

                    {/* Side Info / CTA */}
                    <div className="lg:col-span-5 space-y-12 pl-0 lg:pl-12">
                        <div className="grid gap-8">
                            {[
                                { title: "100% Personalizado", desc: "A frase e o desenho que você escolher." },
                                { title: "Massa Fofinha", desc: "Nossa receita secreta que derrete na boca." },
                                { title: "Entrega Rápida", desc: "Perfeito para surpresas de última hora." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#fce7f3] flex items-center justify-center text-[#ff1493] font-black shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-[#2d1b0d] mb-1">{item.title}</h4>
                                        <p className="text-[#2d1b0d]/50 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-20 rounded-[30px] bg-[#fff5f8] border-2 border-[#ff1493]/20 text-[#ff1493] font-black text-xl hover:bg-[#ff1493] hover:text-white transition-all duration-300 shadow-lg shadow-pink-100"
                        >
                            VER TODOS OS MODELOS
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    )
}
