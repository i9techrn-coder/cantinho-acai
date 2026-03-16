'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useAllSiteContent() {
    const [content, setContent] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            const supabase = createClient()
            const { data } = await supabase
                .from('site_content')
                .select('*')

            if (data) setContent(data)
            setLoading(false)
        }
        fetchContent()
    }, [])

    return { content, loading }
}
