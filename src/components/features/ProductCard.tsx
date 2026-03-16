'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col overflow-hidden rounded-[40px] bg-white shadow-[0_20px_50px_rgba(45,27,13,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(255,20,147,0.1)] border border-[#fce7f3]/50"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-[#fff5f8]">
                <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm text-[#ff1493] flex items-center justify-center shadow-lg transition-colors hover:bg-[#ff1493] hover:text-white">
                        <Heart size={18} />
                    </button>
                </div>
                {product.price < 50 && (
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-black text-[#ff1493] shadow-lg border border-pink-100">
                        <Sparkles size={12} fill="currentColor" />
                        <span>DESTAQUE</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col p-8 bg-white">
                <div className="mb-4">
                    <h3 className="text-2xl font-black text-[#2d1b0d] leading-tight group-hover:text-[#ff1493] transition-colors font-serif">
                        {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-[#2d1b0d]/50 leading-relaxed">
                        {product.description || 'Uma delícia artesanal preparada com ingredientes selecionados.'}
                    </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ff1493] mb-1">Valor</p>
                        <p className="text-2xl font-black text-[#2d1b0d] font-serif italic">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </p>
                    </div>
                    <Button
                        onClick={() => addItem(product)}
                        className="h-12 w-12 rounded-2xl bg-[#ff1493] p-0 text-white shadow-lg shadow-[#ff1493]/20 hover:bg-[#2d1b0d] hover:shadow-[#2d1b0d]/20 transition-all duration-300"
                    >
                        <ShoppingCart size={20} />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
