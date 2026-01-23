'use server';

const API_TOKEN = 'sk_a689a20c480aee9372486cfc6ed7c349ecd7951ce3129f0236adff9a31ee42c7';
const PRODUCT_HASH = 'prod_10a75d7d4bf8f12a';
const PRODUCT_TITLE = 'Cria Sites Com IA';
const BASE_AMOUNT_CENTS = 1990;

const BUMP_PRICES_CENTS: Record<string, number> = {
    "bump_clientes_ricos": 1490,
    "bump_vitalicio": 1290,
};

// --- Interfaces ---

interface CreatePaymentInput {
    name: string;
    email: string;
    document: string;
    phone: string;
    bumpHashes: string[];
}

export interface PaymentResponse {
    hash?: string;
    pix?: {
        pix_qr_code?: string;
        expiration_date?: string;
    };
    amount_paid?: number; 
    error?: string;
}

export interface PaymentStatusResponse {
    payment_status?: string;
    upsell_url?: string;
    error?: string;
}


// --- Server Actions ---

export async function createPayment(input: CreatePaymentInput): Promise<PaymentResponse> {
    const { name, email, document, phone, bumpHashes } = input;
    const apiUrl = 'https://multi.paradisepags.com/api/v1/transaction.php';
    const reference = 'CKO-' + new Date().getTime() + '-' + Math.floor(Math.random() * 100000);

    let totalAmount = BASE_AMOUNT_CENTS;
    bumpHashes.forEach(hash => {
        if (BUMP_PRICES_CENTS[hash]) {
            totalAmount += BUMP_PRICES_CENTS[hash];
        }
    });

    const payload = {
        amount: totalAmount,
        description: PRODUCT_TITLE,
        reference: reference,
        productHash: PRODUCT_HASH,
        customer: { 
            name, 
            email, 
            document: document.replace(/\D/g, ''),
            phone: phone.replace(/\D/g, '')
        },
        checkoutUrl: 'https://app.com',
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

        const getErrorMessage = (res: any) => {
             return res?.errors ? Object.values(res.errors).flat().join(' ') : (res.message || res.error || 'Ocorreu um erro desconhecido.');
        }

        if (!response.ok) {
            const responseText = await response.text();
            try {
                const errorJson = JSON.parse(responseText);
                return { error: getErrorMessage(errorJson) };
            } catch (e) {
                return { error: responseText || 'Ocorreu um erro no gateway de pagamento.' };
            }
        }
        
        const result = await response.json();
        
        if (!result.pix?.pix_qr_code) {
             return { error: getErrorMessage(result) || 'Falha ao gerar o PIX. Tente novamente.' };
        }
        
        // Return the full amount paid to be displayed on the modal
        return { ...result, amount_paid: totalAmount };

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
