'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const router = useRouter()

    useEffect(() => {
        // Redireciona para o login por padrão
        router.push('/login')
    }, [router])

    return (
        <div className="h-screen bg-acai-dark flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-acai-lime"></div>
        </div>
    )
}
