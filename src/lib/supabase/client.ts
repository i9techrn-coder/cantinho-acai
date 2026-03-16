import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    // Fallback silencioso para não quebrar o build do Vercel
    if (!url || !key) {
        return createBrowserClient('', '')
    }

    return createBrowserClient(url, key)
}
