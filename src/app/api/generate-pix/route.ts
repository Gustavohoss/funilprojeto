import { NextResponse } from 'next/server';

// This function handles preflight requests for CORS
export async function OPTIONS(req: Request) {
    const response = new NextResponse(null);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return response;
}

export async function POST(req: Request) {
    try {
        const { amount, customerName, customerEmail, customerPhone, customerDoc } = await req.json();

        // Configurações do Gateway
        const API_TOKEN = 'sk_a689a20c480aee9372486cfc6ed7c349ecd7951ce3129f0236adff9a31ee42c7';
        const PRODUCT_HASH = 'prod_837135e3d0772e4f';
        const BASE_URL = 'https://multi.paradisepags.com/api/v1/transaction.php';

        // Dados Falsos (placeholders) se não vierem do front
        const fakePhone = "119" + Math.floor(Math.random() * 100000000);
        const fakeDoc = "00000000000";

        const payload = {
            amount: parseInt(amount), // Valor em centavos
            description: "Acesso VIP Hot",
            productHash: PRODUCT_HASH,
            customer: {
                name: customerName || "Cliente VIP",
                email: customerEmail || "vendas@vip.com",
                document: customerDoc ? String(customerDoc).replace(/\D/g, '') : fakeDoc,
                phone: customerPhone ? String(customerPhone).replace(/\D/g, '') : fakePhone
            }
        };

        const apiResponse = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-Key': API_TOKEN
            },
            body: JSON.stringify(payload)
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            throw new Error(data.message || 'Erro no gateway de pagamento');
        }

        const response = NextResponse.json(data);
        // Headers de CORS para a resposta real
        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('Access-Control-Allow-Origin', '*');
        return response;

    } catch (error: any) {
        console.error(error);
        const errorResponse = NextResponse.json({ error: error.message }, { status: 500 });
        errorResponse.headers.set('Access-Control-Allow-Credentials', 'true');
        errorResponse.headers.set('Access-Control-Allow-Origin', '*');
        return errorResponse;
    }
}
