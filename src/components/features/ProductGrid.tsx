'use client'

import React from 'react'
import { ProductCard } from './ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ProductGrid() {
    const { products, loading } = useProducts()

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        )
    }

    // Show only 8 featured products on home
    const featured = products.slice(0, 8)

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl font-black text-chocolate font-serif leading-tight">
                            Nossas <span className="text-primary italic">Delícias</span> <br />
                            Mais Pedidas
                        </h2>
                        <p className="mt-4 text-chocolate/40 text-lg font-medium">
                            Uma seleção especial do que há de melhor em nossa confeitaria para você.
                        </p>
                    </div>
                    <Link href="/produtos">
                        <button className="group flex items-center gap-3 text-base font-black tracking-widest text-primary uppercase border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
                            Ver Cardápio Completo
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {featured.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* Call to action banners */}
                <div className="mt-32 grid md:grid-cols-2 gap-8">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group relative h-96 overflow-hidden rounded-[40px] bg-chocolate p-12 text-white shadow-premium"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-center max-w-sm">
                            <h3 className="text-4xl font-black font-serif italic mb-6">Encomendas para Festas</h3>
                            <p className="text-white/70 mb-10 font-medium text-xl leading-relaxed">Personalizamos bolos e doces para tornar seu evento único e inesquecível.</p>
                            <Link href="/contato">
                                <button className="w-fit px-10 py-5 rounded-2xl bg-primary text-base font-black tracking-widest uppercase hover:bg-white hover:text-primary transition-all">
                                    Consultar Agora
                                </button>
                            </Link>
                        </div>
                        <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 group-hover:opacity-60 transition-opacity rounded-l-[100px]" alt="" />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group relative h-96 overflow-hidden rounded-[40px] bg-secondary p-12 text-chocolate shadow-premium border border-primary/10"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-center max-w-sm">
                            <h3 className="text-4xl font-black font-serif italic mb-6 text-primary">Kits de Sobremesas</h3>
                            <p className="text-chocolate/60 mb-10 font-medium text-xl leading-relaxed">Combos especiais para compartilhar com quem você ama no dia a dia.</p>
                            <Link href="/produtos?categoria=combo">
                                <button className="w-fit px-10 py-5 rounded-2xl bg-chocolate text-white text-base font-black tracking-widest uppercase hover:bg-primary transition-all">
                                    Ver Combos
                                </button>
                            </Link>
                        </div>
                        <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 group-hover:opacity-30 transition-opacity rounded-l-[100px]" alt="" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
