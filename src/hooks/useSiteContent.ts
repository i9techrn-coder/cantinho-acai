'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useSiteContent(section: string) {
    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            const supabase = createClient()
            const { data } = await supabase
                .from('site_content')
                .select('content')
                .eq('section', section)
                .single()

            if (data) setContent(data.content)
            setLoading(false)
        }
        fetchContent()
    }, [section])

    return { content, loading }
}
