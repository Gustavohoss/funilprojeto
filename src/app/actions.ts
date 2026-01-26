'use server';

const API_TOKEN = 'sk_a689a20c480aee9372486cfc6ed7c349ecd7951ce3129f0236adff9a31ee42c7';

export interface PaymentStatusResponse {
    payment_status?: string;
    upsell_url?: string;
    error?: string;
}


export async function checkPaymentStatus(hash: string): Promise<PaymentStatusResponse> {
    const apiUrl = `https://multi.paradisepags.com/api/v1/check_status.php?hash=${hash}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'X-API-Key': API_TOKEN }
        });

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            const errorMessage = result.message || 'Erro ao verificar status do pagamento.';
            return { error: errorMessage };
        }
        return await response.json();
    } catch (error: any) {
        console.error('Status Check API Error:', error);
        return { error: error.message || 'Falha ao verificar status do pagamento.' };
    }
}
