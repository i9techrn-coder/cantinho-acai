'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Settings } from 'lucide-react'

interface NavbarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    cartCount: number
    setIsCartOpen: (open: boolean) => void
}

export function Navbar({ activeTab, setActiveTab, cartCount, setIsCartOpen }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const tabs = [
        { id: 'home', label: 'HOME' },
        { id: 'pedido', label: 'MONTE SEU AÇAÍ' },
        { id: 'contato', label: 'CONTATO' }
    ]

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-acai-vibrant/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
                    <img src="/logo-acai2.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-acai-vibrant shadow-md" />
                    <h1 className="text-xl md:text-2xl font-serif font-black text-acai-dark tracking-tighter italic">Cantinho do Açaí</h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-acai-vibrant text-white shadow-lg shadow-acai-vibrant/30'
                                : 'text-white/90 bg-acai-dark hover:bg-acai-vibrant hover:text-white shadow-md'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2.5 bg-acai-vibrant text-white rounded-2xl shadow-lg shadow-acai-vibrant/40 hover:scale-110 transition-transform"
                    >
                        <ShoppingBag size={22} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-acai-lime text-acai-dark text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>


                    <button className="md:hidden p-2 text-acai-dark" onClick={() => setIsMenuOpen(prev => !prev)}>
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-[80px] left-0 right-0 bg-white border-b border-acai-vibrant/20 shadow-2xl overflow-hidden md:hidden z-40 p-6"
                    >
                        <div className="flex flex-col gap-2 text-center">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                                    className={`py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-acai-vibrant text-white shadow-lg' : 'text-gray-600 bg-gray-50'
                                        }`}
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
