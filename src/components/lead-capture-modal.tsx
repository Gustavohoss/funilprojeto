'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import Image from 'next/image';

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void; // Keep for now, but new logic is internal
};

const basePrice = 19.90;
const bump1Price = 14.90;
const bump2Price = 12.90;

export function LeadCaptureModal({ isOpen, onClose, onSubmit }: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBump1Checked, setIsBump1Checked] = useState(false);
  const [isBump2Checked, setIsBump2Checked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [priceUpdated, setPriceUpdated] = useState(false);
  const [view, setView] = useState<'form' | 'qr'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let total = basePrice;
    if (isBump1Checked) total += bump1Price;
    if (isBump2Checked) total += bump2Price;
    setTotalPrice(total);

    if (isOpen) { // Only trigger flash effect if modal is open
      setPriceUpdated(true);
      const timer = setTimeout(() => setPriceUpdated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isBump1Checked, isBump2Checked, isOpen]);
  
  const handlePayClick = () => {
    if (!name || !email) {
      setError("ERRO: Preencha todos os dados para liberar o acesso.");
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('ERRO: E-mail inválido.');
        setTimeout(() => setError(''), 3000);
        return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setView('qr');
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    // Reset state after a delay to allow for closing animation
    setTimeout(() => {
      setView('form');
      setIsBump1Checked(false);
      setIsBump2Checked(false);
      setName('');
      setEmail('');
      setIsLoading(false);
    }, 500);
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="font-mono bg-[#0a0a0a] border-primary shadow-[0_0_30px_hsl(var(--primary)/0.15)] p-0 max-w-lg rounded-lg overflow-hidden sm:rounded-lg">
        <div className="terminal-header bg-black p-4 border-b border-primary flex justify-between items-center text-xs font-bold text-primary">
            <span className="blinking-cursor">{'>'} PROTOCOLO DE PAGAMENTO_</span>
            <span>🔒 SSL: ATIVADO</span>
        </div>

        <div className="modal-body p-6">
            {view === 'qr' ? (
                 <>
                    <div className="price-display text-center mb-6 pb-5 border-b border-dashed border-border">
                        <div className="price-label text-slate-500 text-xs line-through">{formatPrice(97.00)}</div>
                        <div className={`current-price text-5xl text-white font-bold my-1`}>
                            {formatPrice(totalPrice)}
                        </div>
                        <div className="price-sub text-white text-sm uppercase tracking-wider">
                           AGUARDANDO PAGAMENTO...
                        </div>
                    </div>
                    <div className="qr-section mt-5 text-center bg-white p-5 rounded-lg animate-fade-in">
                        <p className="text-black font-bold font-sans mb-2.5">ESCANEIE PARA PAGAR:</p>
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" width={180} height={180} alt="QR Code para pagamento" className="mx-auto" />
                        <p className="text-slate-700 text-xs mt-2.5 font-sans">Ou copie o código abaixo:</p>
                        <textarea 
                            className="copy-pix w-full bg-slate-100 border border-slate-300 p-2 text-xs mt-2.5 text-slate-800 break-all rounded-sm" 
                            readOnly 
                            defaultValue="00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000"
                        />
                        <button 
                            onClick={() => navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000')}
                            className="mt-2.5 p-2.5 bg-black text-white border-none rounded-sm cursor-pointer w-full hover:bg-slate-800"
                        >
                            COPIAR CÓDIGO PIX
                        </button>
                    </div>
                 </>
            ) : (
                <>
                    <div className="price-display text-center mb-6 pb-5 border-b border-dashed border-border">
                        <div className="price-label text-slate-500 text-xs line-through">Valor Original: R$ 97,00</div>
                        <div className={`current-price text-5xl text-white font-bold my-1 transition-colors duration-300 ${priceUpdated ? 'text-primary' : ''}`}>
                            {formatPrice(totalPrice)}
                        </div>
                        <div className="price-sub text-primary text-[11px] uppercase tracking-wider">
                            ⚡ ACESSO IMEDIATO LIBERADO
                        </div>
                    </div>

                    <ul className="access-list list-none mb-6 bg-primary/5 p-4 rounded-md border border-white/10 text-sm">
                        <li className="text-slate-300 mb-2 flex items-center"><span className="text-primary mr-2.5 font-bold">[✓]</span> IA Geradora de Sites (SaaS Secreto)</li>
                        <li className="text-slate-300 mb-2 flex items-center"><span className="text-primary mr-2.5 font-bold">[✓]</span> Manual do Caçador de Clientes</li>
                        <li className="text-slate-300 flex items-center"><span className="text-primary mr-2.5 font-bold">[✓]</span> Script de Vendas (Copia e Cola)</li>
                    </ul>

                    <form id="checkout-form">
                        <div className="mb-4">
                            <label className="block text-muted-foreground text-[11px] mb-1.5 uppercase">Nome Completo</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input w-full p-3.5 bg-[#111] border border-border text-primary rounded-sm text-base focus:border-primary focus:bg-black focus:ring-0 focus:shadow-[0_0_8px_hsl(var(--primary)/0.2)]" placeholder="Digite seu nome..." required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-muted-foreground text-[11px] mb-1.5 uppercase">Seu Melhor E-mail</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input w-full p-3.5 bg-[#111] border border-border text-primary rounded-sm text-base focus:border-primary focus:bg-black focus:ring-0 focus:shadow-[0_0_8px_hsl(var(--primary)/0.2)]" placeholder="Onde receber o acesso..." required />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                        <div className="my-6 flex flex-col gap-4">
                            <label className={`bump-box flex gap-3 items-start p-4 bg-white/5 border-2 border-dashed rounded-md cursor-pointer transition-all duration-300 relative ${isBump1Checked ? 'border-primary bg-primary/5' : 'border-border'}`} >
                                <div className="absolute -top-2.5 right-2.5 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">MAIS VENDIDO</div>
                                <input type="checkbox" checked={isBump1Checked} onChange={e => setIsBump1Checked(e.target.checked)} className="appearance-none w-5 h-5 min-w-[20px] border-2 border-slate-600 rounded bg-black cursor-pointer flex items-center justify-center mt-0.5 checked:bg-primary checked:border-primary" />
                                <div className="bump-content">
                                    <h4 className="text-sm text-white mb-1 uppercase">Sim! Quero Clientes Premium <span className="text-primary normal-case">(+{formatPrice(bump1Price)})</span></h4>
                                    <p className="text-xs text-slate-400 leading-snug">Adicione o <strong>Script "Baleia Azul"</strong> para fechar contratos de R$ 2.000+ com Advogados e Médicos.</p>
                                </div>
                            </label>

                            <label className={`bump-box flex gap-3 items-start p-4 bg-white/5 border-2 border-dashed rounded-md cursor-pointer transition-all duration-300 relative ${isBump2Checked ? 'border-primary bg-primary/5' : 'border-border'}`}>
                                <input type="checkbox" checked={isBump2Checked} onChange={e => setIsBump2Checked(e.target.checked)} className="appearance-none w-5 h-5 min-w-[20px] border-2 border-slate-600 rounded bg-black cursor-pointer flex items-center justify-center mt-0.5 checked:bg-primary checked:border-primary" />
                                <div className="bump-content">
                                    <h4 className="text-sm text-white mb-1 uppercase">Sim! Quero Acesso Vitalício <span className="text-primary normal-case">(+{formatPrice(bump2Price)})</span></h4>
                                    <p className="text-xs text-slate-400 leading-snug">Garanta atualizações eternas da IA e nunca perca seu acesso, mesmo se o preço subir.</p>
                                </div>
                            </label>
                        </div>
                        
                        <button type="button" onClick={handlePayClick} disabled={isLoading} className="w-full p-4 bg-primary text-black text-base font-extrabold uppercase rounded-md cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)] disabled:opacity-70 disabled:cursor-not-allowed">
                           {isLoading ? 'PROCESSANDO...' : 'GERAR PIX AGORA ❖'}
                        </button>
                    </form>
                </>
            )}

            <div className="mt-5 text-center text-[10px] text-slate-600 flex justify-center gap-4">
                <span>🛡️ GARANTIA 7 DIAS</span>
                <span>🔒 DADOS CRIPTOGRAFADOS</span>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
