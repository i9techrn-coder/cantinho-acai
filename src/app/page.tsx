'use client'

import React, { useState } from 'react'
import { AcaiBuilder } from '@/components/features/AcaiBuilder'
import { Instagram, MapPin, Phone, Loader2, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { CartDrawer } from '@/components/common/CartDrawer'
import { useCart } from '@/hooks/useCart'
import { useFlashData } from '@/hooks/useFlashData'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { data, loading } = useFlashData()
  const { totalItems } = useCart()

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-acai-dark">
        <Loader2 className="animate-spin text-acai-lime mb-4" size={64} />
        <p className="text-2xl font-serif text-white font-black tracking-tighter italic">Preparando o melhor açaí...</p>
      </div>
    )
  }

  if (!data) return null

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-acai-light flex flex-col font-sans">
      <Navbar
        activeTab="" // Not using tabs anymore
        setActiveTab={(tab) => scrollToSection(tab)}
        cartCount={totalItems}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="flex-1">
        <section id="home" className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-acai-dark pt-12 pb-16">
          {/* Fundo Roxo Puro com Degradês Sutis */}
          <div className="absolute inset-0 z-0 bg-acai-dark">
            <div className="absolute inset-0 bg-gradient-to-br from-acai-vibrant/30 via-transparent to-acai-dark" />
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-acai-vibrant/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-acai-lime/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-acai-lime text-acai-dark font-black tracking-widest uppercase text-[10px] md:text-sm px-6 py-2 rounded-full mb-8 shadow-lg shadow-acai-lime/20"
            >
              🚀 ENERGIA PURA NO SEU COPO! 💜
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-9xl font-serif font-black text-white mb-8 leading-tight max-w-5xl italic tracking-tighter"
            >
              O melhor açaí <br />
              da <span className="text-acai-vibrant drop-shadow-[0_0_30px_rgba(147,51,234,0.6)]">região!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 font-medium mb-12 max-w-2xl leading-relaxed"
            >
              Sem frescura, só sabor. Monte seu copo do seu jeito com os recheios mais frescos e o melhor açaí artesanal.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollToSection('pedido')}
              className="group relative flex items-center justify-center gap-4 px-14 py-6 text-2xl font-black border-4 border-acai-vibrant hover:bg-white hover:text-acai-vibrant transition-all shadow-[0_20px_60px_rgba(147,51,234,0.5)] rounded-full bg-acai-vibrant text-white"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping group-hover:hidden" />
              <ShoppingBag size={28} className="group-hover:rotate-12 transition-transform" />
              FAZER MEU PEDIDO
            </motion.button>
          </div>
        </section>


        {/* ORDER SECTION - O CONSTRUTOR DE AÇAÍ */}
        <section id="pedido" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-black text-acai-dark italic tracking-tighter">
              Monte seu <span className="text-acai-vibrant">Pedido</span>
            </h2>
            <div className="w-24 h-2 bg-acai-lime mx-auto mt-6 rounded-full" />
          </div>
          <AcaiBuilder />
        </section>


        {/* CONTACT SECTION */}
        <section id="contato" className="py-24 bg-acai-dark relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-acai-vibrant opacity-10 blur-[120px]" />

          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 items-center relative z-10">
            {/* Thumbnail Equipe */}
            <div className="relative group">
              <div className="absolute inset-0 bg-acai-lime rounded-3xl rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform" />
              <img src="/hero-acai-wide.jpg" alt="Equipe" className="relative rounded-3xl shadow-2xl border-4 border-white object-cover aspect-square w-full filter brightness-110" />
            </div>

            <div className="space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-serif font-black text-white italic tracking-tighter leading-tight">
                Passa no nosso <br />
                <span className="text-acai-lime">Instagram!</span>
              </h2>
              <a
                href={`https://instagram.com/${data.contact.instagram.replace('@', '')}`}
                target="_blank"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-xl shadow-purple-500/20"
              >
                <Instagram size={28} /> {data.contact.instagram}
              </a>
            </div>

            {/* Glass Contact Card */}
            <div className="bg-white/5 backdrop-blur-xl p-10 space-y-8 border-2 border-white/10 shadow-2xl rounded-[40px]">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2 tracking-widest uppercase text-xs">
                <span className="w-2 h-2 rounded-full bg-acai-lime" /> Contato Direto
              </h3>
              <a href={`https://wa.me/${data.contact.whatsapp}`} className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform"><Phone size={28} /></div>
                <div><p className="text-xs text-acai-lime font-black uppercase tracking-widest mb-1">WhatsApp</p><p className="text-xl font-black text-white">{data.contact.phone}</p></div>
              </a>
              <a href={data.store.location_url} target="_blank" className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-acai-vibrant text-white flex items-center justify-center shadow-lg shadow-acai-vibrant/20 group-hover:scale-110 transition-transform"><MapPin size={28} /></div>
                <div><p className="text-xs text-acai-lime font-black uppercase tracking-widest mb-1">Endereço</p><p className="text-lg font-bold text-gray-300 leading-tight">{data.store.address}</p></div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-acai-dark text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-[32px] p-4 shadow-2xl mb-8 -rotate-3 border-4 border-acai-lime">
            <img src="/logo-acai2.jpg" alt="Logo" className="w-full h-full object-contain rounded-xl" />
          </div>
          <p className="text-acai-lime/60 max-w-xs mx-auto mb-12 italic font-serif text-lg tracking-tight">Levando energia e sabor para você.</p>
          <div className="w-full h-px bg-white/5 mb-12" />
          <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">CANTINHO DO AÇAÍ @ 2026</div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigateToPedido={() => scrollToSection('pedido')} whatsappNumber={data.contact.whatsapp} />
    </div>
  )
}
