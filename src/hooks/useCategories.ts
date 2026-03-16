'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Category } from '@/types'

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCategories() {
            const supabase = createClient()
            const { data } = await supabase
                .from('categories')
                .select('*')
                .order('name')

            if (data) setCategories(data)
            setLoading(false)
        }
        fetchCategories()
    }, [])

    return { categories, loading }
}
