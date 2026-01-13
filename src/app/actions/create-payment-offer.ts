'use server';

import { z } from 'zod';

const CreatePaymentOfferOutputSchema = z.object({
  checkoutUrl: z.string().url(),
});

type CreatePaymentOfferOutput = z.infer<typeof CreatePaymentOfferOutputSchema>;

const CAKTO_API_URL = 'https://api.cakto.com.br/public_api';

async function getAuthToken(): Promise<string> {
  const clientId = process.env.CAKTO_CLIENT_ID;
  const clientSecret = process.env.CAKTO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Cakto client ID or secret not configured.');
  }

  const response = await fetch(`${CAKTO_API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': clientId,
      'X-Client-Secret': clientSecret,
    },
  });

  if (!response.ok) {
    console.error('Failed to authenticate with Cakto:', await response.text());
    throw new Error('Failed to authenticate with Cakto API.');
  }

  const { token } = await response.json();
  return token;
}

export async function createPaymentOffer(): Promise<CreatePaymentOfferOutput> {
  try {
    const token = await getAuthToken();
    const productId = process.env.CAKTO_PRODUCT_ID;

    if (!productId) {
      throw new Error('Cakto product ID not configured.');
    }
    
    const offerPayload = {
      product_id: productId,
      // Você pode adicionar mais detalhes aqui se necessário, como nome e email do cliente
      // "customer": {
      //   "name": "Nome do Cliente",
      //   "email": "cliente@email.com"
      // }
    };

    const offerResponse = await fetch(`${CAKTO_API_URL}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(offerPayload),
    });

    if (!offerResponse.ok) {
        console.error('Failed to create Cakto offer:', await offerResponse.text());
        throw new Error('Failed to create payment offer.');
    }

    const { id: offerId } = await offerResponse.json();

    const checkoutUrl = `https://pay.cakto.com.br/${offerId}`;

    return { checkoutUrl };

  } catch (error) {
    console.error('Error in createPaymentOffer:', error);
    // Retornar um objeto de erro padronizado em caso de falha
    throw new Error('An unexpected error occurred while creating the payment offer.');
  }
}
