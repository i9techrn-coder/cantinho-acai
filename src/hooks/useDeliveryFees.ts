'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DeliveryFee } from '@/types'

export function useDeliveryFees() {
    const [fees, setFees] = useState<DeliveryFee[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFees() {
            const supabase = createClient()
            const { data } = await supabase.from('delivery_fees').select('*').order('neighborhood')

            if (data && data.length > 0) {
                setFees(data)
            } else {
                // Fallback for demonstration
                setFees([
                    { id: '1', neighborhood: 'Ponta Negra', fee: 10.00, created_at: '' },
                    { id: '2', neighborhood: 'Capim Macio', fee: 8.00, created_at: '' },
                    { id: '3', neighborhood: 'Tirol', fee: 12.00, created_at: '' },
                    { id: '4', neighborhood: 'Petrópolis', fee: 15.00, created_at: '' },
                    { id: '5', neighborhood: 'Lagoa Nova', fee: 9.00, created_at: '' },
                ])
            }
            setLoading(false)
        }
        fetchFees()
    }, [])

    return { fees, loading }
}
