export const BAKERY_NAME = 'Cakes Gabi Confeitaria'
export const BAKERY_CITY = 'Natal, RN'
export const WHATSAPP_NUMBER = '5584994899327'
export const INSTAGRAM_HANDLE = '@cakesgabiconfeitaria'

export const ORDER_STATUS_LABELS: Record<string, string> = {
    recebido: 'Pedido Recebido',
    preparo: 'Em Preparo',
    entrega: 'Saiu para Entrega',
    entregue: 'Entregue',
    cancelado: 'Cancelado',
}

export const PAYMENT_METHODS = [
    { id: 'pix', label: 'PIX', icon: 'QrCode' },
    { id: 'card', label: 'Cartão', icon: 'CreditCard' },
    { id: 'cash', label: 'Dinheiro', icon: 'Banknote' },
]
