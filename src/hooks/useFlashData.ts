'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StoreData, Product, BlogPost } from '@/types'

export function useFlashData() {
    const [data, setData] = useState<StoreData | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch All Content
                const { data: contentData } = await supabase.from('site_content').select('*')

                // Fetch Active Products
                const { data: productsData } = await supabase
                    .from('products')
                    .select('*, categories(name)')
                    .eq('is_active', true)

                // Mock Blog Data for now (as we haven't created a blog table yet)
                const mockBlog: BlogPost[] = [
                    {
                        id: 1,
                        title: "Os Benefícios do Açaí para sua Saúde",
                        description: "Além de delicioso, o açaí é uma fonte incrível de energia e antioxidantes. Descubra por que incluir essa superfruta no seu dia a dia pode transformar sua rotina.",
                        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
                        date: new Date().toISOString()
                    },
                    {
                        id: 2,
                        title: "Como Montar o Copo de Açaí Perfeito",
                        description: "Dicas exclusivas do Cantinho para quem ama variedade! Saiba como equilibrar cremes, frutas e crocantes para uma experiência inesquecível a cada colherada.",
                        image: "https://images.unsplash.com/photo-1623934199716-dc3ef40366b7?auto=format&fit=crop&w=800&q=80",
                        date: new Date(Date.now() - 86400000 * 2).toISOString()
                    },
                    {
                        id: 3,
                        title: "Energia Pura: Açaí Pré-Treino",
                        description: "Vai malhar? O açaí é o combustível ideal. Conheça as melhores combinações com banana e granola para dar aquele gás nos seus exercícios.",
                        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
                        date: new Date(Date.now() - 86400000 * 5).toISOString()
                    },
                    {
                        id: 4,
                        title: "Nossa Barca Gigante: Sucesso nas Festas",
                        description: "Queridinha das reuniões entre amigos, nossa barca de 1kg é a estrela do cardápio. Veja o que nossos clientes estão dizendo sobre essa explosão de sabor.",
                        image: "/pote-acai.png",
                        date: new Date(Date.now() - 86400000 * 8).toISOString()
                    }
                ]

                // Map Content to StoreData structure
                const contentMap: any = {}
                contentData?.forEach(item => {
                    contentMap[item.section] = item.content
                })

                // Mock Açaí Data (based on production site)
                const storeData: StoreData = {
                    about: {
                        history: contentMap.sobre_description || "O Cantinho do Açaí nasceu da paixão por oferecer o melhor sabor da fruta mais amada do Brasil. Nosso compromisso é com a qualidade e a satisfação de cada cliente.",
                        photos: ["/sobre_3.png", "/sobre_4.png"]
                    },
                    store: {
                        address: contentMap.loja_address || "Açaiteria em Natal - RN",
                        location_url: contentMap.loja_location_url || "https://maps.google.com/?q=Natal+-+RN",
                        photos: ["/loja_1.png", "/loja_2.png"]
                    },
                    contact: {
                        whatsapp: "5584987071007",
                        phone: "+55 84 98707-1007",
                        instagram: "@cantinho_do_acai1901"
                    },
                    products: [
                        { id: '1', name: "Barca de Açaí", description: "Serve até 4 pessoas. (aprox.1000g)", price: "50.00", original_price: "65.00", category: "Açaí", image_url: "/pote-acai.png", is_active: true },
                        { id: '2', name: "Kit para Família", description: "Serve até 4 pessoas. (aprox.900g)", price: "40.00", original_price: "52.00", category: "Açaí", image_url: "/pote-acai.png", is_active: true },
                        { id: '3', name: "Marmitex Turbinada", description: "Serve até 3 pessoas. (aprox.800g)", price: "37.00", original_price: "50.00", category: "Açaí", image_url: "/pote-acai.png", is_active: true },
                        { id: '4', name: "Marmitex do Cantinho", description: "Serve até 3 pessoas. (aprox.800g)", price: "30.00", original_price: "35.00", category: "Açaí", image_url: "/pote-acai.png", is_active: true },
                        { id: '5', name: "Copo de Açaí Grande", description: "Serve uma pessoa. (aprox.770g)", price: "30.00", original_price: "35.00", category: "Açaí", image_url: "/pote-acai.png", is_active: true },
                        { id: '6', name: "Copo de Açaí Médio", description: "Serve uma pessoa. (aprox.440g)", price: "17.00", original_price: "23.00", category: "Açaí", image_url: "/pote-acai.png", is_active: true },
                        { id: '7', name: "Tentação", description: "Criação exclusiva Kinder Ninho (aprox.440g)", price: "23.50", original_price: "25.00", category: "Premium", image_url: "/pote-acai.png", is_active: true },
                        { id: '8', name: "Ferrero Rocher", description: "Criação exclusiva Ferrero (aprox.440g)", price: "30.00", original_price: "38.00", category: "Premium", image_url: "/pote-acai.png", is_active: true },
                        { id: '9', name: "Paleta Italiana", description: "Serve uma pessoa. (aprox.105g)", price: "10.00", original_price: "12.00", category: "Paletas", image_url: "/pote-acai.png", is_active: true },
                        { id: '10', name: "Copo da Felicidade Morango", description: "Deliciosa combinação de morangos.", price: "20.00", original_price: "22.00", category: "Copos da Felicidade", image_url: "/pote-acai.png", is_active: true },
                        { id: '11', name: "Geladinho Gourmet", description: "Sabor incrível em versão gelada.", price: "7.00", original_price: "8.00", category: "Geladinho Gourmet", image_url: "/pote-acai.png", is_active: true },
                        { id: '12', name: "Kit Salgados Pequeno", description: "Salgados fritos na hora + Mini Coca.", price: "20.00", original_price: "25.00", category: "Salgados", image_url: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600", is_active: true },
                        { id: '13', name: "Refrigerantes", description: "Variados.", price: "10.00", category: "Bebidas", image_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400", is_active: true }
                    ] as any[],
                    blog: mockBlog
                }

                setData(storeData)
            } catch (error) {
                console.error('Error fetching flash data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, loading }
}
