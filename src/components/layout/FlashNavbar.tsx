'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FlashNavbarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    cartCount: number
    setIsCartOpen: (open: boolean) => void
    onToggleAdmin: () => void
}

export function FlashNavbar({ activeTab, setActiveTab, cartCount, setIsCartOpen, onToggleAdmin }: FlashNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    const tabs = [
        { id: 'home', label: 'Início' },
        { id: 'pedido', label: 'Faça seu Pedido' },
        { id: 'sobre', label: 'Sobre' },
        { id: 'loja', label: 'Nossa Loja' },
        { id: 'blog', label: 'Blog' },
        { id: 'contato', label: 'Contato' }
    ]

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-bakery-pink/30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
                    <div className="w-10 h-10 bg-bakery-pink-hot rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shadow-bakery-pink-hot/20">G</div>
                    <h1 className="text-xl md:text-2xl font-serif font-black text-bakery-pink-dark tracking-tighter italic">Cakes Gabi</h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`nav-link ${activeTab === tab.id ? 'text-bakery-pink-dark font-black scale-110' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-bakery-pink-dark hover:bg-bakery-pink/20 rounded-full transition-colors"
                    >
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-bakery-pink-hot text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={onToggleAdmin}
                        className="p-2 text-gray-400 hover:text-bakery-pink-hot hover:bg-bakery-pink/10 rounded-full transition-all"
                    >
                        <Settings size={22} />
                    </button>

                    <button className="md:hidden p-2 text-bakery-pink-dark" onClick={() => setIsMenuOpen(prev => !prev)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-[80px] left-0 right-0 bg-white border-b border-bakery-pink/30 shadow-xl overflow-hidden md:hidden z-40"
                    >
                        <div className="flex flex-col px-6 py-2">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100 mb-1">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Navegação</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-1 text-gray-500 hover:text-bakery-pink-hot">
                                    <X size={20} />
                                </button>
                            </div>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                                    className={`py-4 text-left text-lg font-bold capitalize transition-colors border-b border-gray-100 last:border-0 ${activeTab === tab.id ? 'text-bakery-pink-hot' : 'text-gray-600'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
