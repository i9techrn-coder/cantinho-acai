'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, Instagram, MessageCircle } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { motion, AnimatePresence } from 'framer-motion'
import { CartDrawer } from './CartDrawer'

const BRAND_NAME = "Cantinho do Açaí"
const INSTAGRAM_HANDLE = "@cantinho_do_acai1901"
const WHATSAPP_NUMBER = "5584987071007"

export function Navbar() {
    const { totalItems } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)

        // Listen to custom event to open cart
        const handleOpenCart = () => setIsCartOpen(true)
        window.addEventListener('open-cart', handleOpenCart)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('open-cart', handleOpenCart)
        }
    }, [])

    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'MONTE SEU AÇAÍ', href: '#monte-seu-acai' },
        { label: 'CONTATO', href: '#contato' },
    ]

    return (
        <>
            <header
                className={`sticky top-0 z-[60] w-full transition-all duration-500 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-lg py-3 border-b border-acai-vibrant/10'
                    : 'bg-white shadow-sm py-5'
                    }`}
            >
                <div className="container mx-auto flex items-center justify-between gap-4 px-4 lg:px-8 max-w-[1400px]">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex flex-col">
                            <img src="/logo-acai2.jpg" alt={BRAND_NAME} className="h-12 lg:h-16 w-auto object-contain rounded-full shadow-sm" />
                        </Link>
                    </div>

                    {/* Desktop Navigation Center - ALWAYS VISIBLE FROM MD UP */}
                    <nav className="hidden md:flex flex-1 justify-center items-center">
                        <div className="flex items-center space-x-2 lg:space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="flex items-center justify-center min-w-[120px] px-6 py-2.5 text-[13px] font-black tracking-widest transition-all duration-300 bg-acai-vibrant text-white rounded-xl shadow-lg shadow-acai-vibrant/20 hover:scale-105 active:scale-95 hover:bg-acai-dark uppercase"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center justify-end space-x-3 lg:space-x-5 flex-shrink-0">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative group"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-acai-vibrant text-white shadow-lg shadow-acai-vibrant/20 transition-all group-hover:scale-110 group-active:scale-95 group-hover:-rotate-3">
                                <ShoppingCart size={24} />
                                {totalItems > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-acai-lime text-[11px] font-black text-acai-dark border-2 border-white ring-2 ring-acai-lime/20 animate-in zoom-in">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* Mobile Menu Toggle button - ONLY VISIBLE BELOW MD */}
                        <button
                            className="md:hidden flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-acai-dark shadow-sm ml-2"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[70] bg-white flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 border-b border-gray-50">
                                <div>
                                    <span className="text-3xl font-black italic text-acai-dark font-serif tracking-tighter">{BRAND_NAME}</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="h-14 w-14 flex items-center justify-center rounded-2xl bg-acai-light/50 text-acai-vibrant active:scale-90 transition-transform"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto p-8 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="flex items-center justify-between p-6 px-8 rounded-2xl bg-acai-vibrant text-white font-black text-xl shadow-lg shadow-acai-vibrant/10 active:scale-95 transition-transform uppercase"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>{link.label}</span>
                                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <ShoppingCart size={18} />
                                        </div>
                                    </Link>
                                ))}
                            </nav>

                            <div className="p-8 border-t border-gray-50 bg-[#fdfdfd] space-y-6">
                                <div className="flex gap-4">
                                    <a href={`https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`} className="flex-1 flex flex-col items-center justify-center h-20 rounded-3xl bg-white border border-gray-100 text-acai-vibrant shadow-sm">
                                        <Instagram size={28} />
                                        <span className="text-[10px] font-black mt-1">INSTAGRAM</span>
                                    </a>
                                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex-1 flex flex-col items-center justify-center h-20 rounded-3xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20">
                                        <MessageCircle size={28} />
                                        <span className="text-[10px] font-black mt-1">WHATSAPP</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Injeta o CartDrawer aqui (Controlado pelo isCartOpen) */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onNavigateToPedido={() => {
                    setIsCartOpen(false);
                    // Como não existe rota de pedido, rola até o componente
                    const el = document.getElementById('monte-seu-acai');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                whatsappNumber={WHATSAPP_NUMBER}
            />
        </>
    )
}

