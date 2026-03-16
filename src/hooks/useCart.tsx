'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type AcaiCartItem = {
    id: string
    name: string // ex: "Açaí 500ml"
    price: number
    quantity: number
    saborBase?: string
    frutas?: string[]
    adicionais?: string[]
    coberturas?: string[]
}

type CartContextType = {
    items: AcaiCartItem[]
    addItem: (item: Omit<AcaiCartItem, 'id' | 'quantity'>) => void
    updateQuantity: (id: string, quantity: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<AcaiCartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cantinho-acai-cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to load cart', e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save cart to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cantinho-acai-cart', JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addItem = (itemInfo: Omit<AcaiCartItem, 'id' | 'quantity'>) => {
        const newItem: AcaiCartItem = {
            ...itemInfo,
            id: Math.random().toString(36).substring(2, 9), // Simple ID generator
            quantity: 1
        }
        setItems(prev => [...prev, newItem])
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
