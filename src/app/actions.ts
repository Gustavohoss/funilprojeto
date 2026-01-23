'use server';

const API_TOKEN = 'sk_a689a20c480aee9372486cfc6ed7c349ecd7951ce3129f0236adff9a31ee42c7';
const PRODUCT_HASH = 'prod_10a75d7d4bf8f12a';
const PRODUCT_TITLE = 'Cria Sites Com IA';
const BASE_AMOUNT_CENTS = 1990;

// --- Interfaces ---

interface CreatePaymentInput {
    name: string;
    email: string;
    bumpHashes: string[];
}

export interface PaymentResponse {
    hash?: string;
    pix?: {
        pix_qr_code?: string;
        expiration_date?: string;
    };
    amount_paid?: number; // This might not be returned, but we need the total amount.
    error?: string;
}

export interface PaymentStatusResponse {
    payment_status?: string;
    upsell_url?: string;
    error?: string;
}


// --- Server Actions ---

export async function createPayment(input: CreatePaymentInput): Promise<PaymentResponse> {
    const { name, email, bumpHashes } = input;
    const apiUrl = 'https://multi.paradisepags.com/api/v1/transaction.php';
    const reference = 'CKO-' + new Date().getTime() + '-' + Math.floor(Math.random() * 100000);

    const payload = {
        amount: BASE_AMOUNT_CENTS,
        description: PRODUCT_TITLE,
        reference: reference,
        productHash: PRODUCT_HASH,
        orderbump: bumpHashes,
        customer: { 
            name, 
            email, 
            document: '42879052882', // Placeholder from user's script
            phone: '11987654321'    // Placeholder
        },
        checkoutUrl: 'https://app.com', // Placeholder, seems required by the context of the php script
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-Key': API_TOKEN
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        // Helper to extract a detailed error message from the gateway response
        const getErrorMessage = (res: any) => {
             return res?.errors ? Object.values(res.errors).flat().join(' ') : (res.message || res.error || 'Ocorreu um erro desconhecido.');
        }

        if (!response.ok) {
            return { error: getErrorMessage(result) };
        }
        
        // Also check for PIX data on a successful response, as the API might return 200 OK with an error message inside.
        if (!result.pix?.pix_qr_code) {
             return { error: getErrorMessage(result) || 'Falha ao gerar o PIX. Tente novamente.' };
        }

        return result;

    } catch (error: any) {
        console.error('Payment Gateway API Error:', error);
        return { error: error.message || 'Falha na comunicação com o gateway de pagamento.' };
    }
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
