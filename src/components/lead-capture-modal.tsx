'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import QRCode from "react-qr-code";
import { createPayment, checkPaymentStatus, type PaymentResponse } from '@/app/actions';
import { CheckCircle } from 'lucide-react';

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
};

const basePrice = 19.90;
const bump1Price = 14.90;
const bump2Price = 12.90;

const BUMP1_HASH = "BUMP_PREMIUM_SCRIPT";
const BUMP2_HASH = "BUMP_LIFETIME_ACCESS";


export function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBump1Checked, setIsBump1Checked] = useState(false);
  const [isBump2Checked, setIsBump2Checked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [priceUpdated, setPriceUpdated] = useState(false);
  const [view, setView] = useState<'form' | 'qr' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);

  const paymentCheckInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let total = basePrice;
    if (isBump1Checked) total += bump1Price;
    if (isBump2Checked) total += bump2Price;
    setTotalPrice(total);

    if (isOpen) {
      setPriceUpdated(true);
      const timer = setTimeout(() => setPriceUpdated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isBump1Checked, isBump2Checked, isOpen]);

  const handlePayClick = async () => {
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

    const bumpHashes: string[] = [];
    if (isBump1Checked) bumpHashes.push(BUMP1_HASH);
    if (isBump2Checked) bumpHashes.push(BUMP2_HASH);

    const result = await createPayment({ name, email, bumpHashes });
    
    setIsLoading(false);

    if (result.error) {
        setError(result.error);
        setTimeout(() => setError(''), 5000);
    } else {
        setPaymentData(result);
        setView('qr');
    }
  };

  const startPaymentChecker = (hash: string) => {
    if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
    }
    paymentCheckInterval.current = setInterval(async () => {
        const statusResult = await checkPaymentStatus(hash);
        if (statusResult.payment_status === 'paid') {
            if (paymentCheckInterval.current) clearInterval(paymentCheckInterval.current);
            setView('success');
        }
    }, 3000); // Check every 3 seconds
  }

  useEffect(() => {
    if (view === 'qr' && paymentData?.hash) {
      startPaymentChecker(paymentData.hash);
    }
    
    return () => { // Cleanup on unmount or view change
      if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, paymentData]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView('form');
      setIsBump1Checked(false);
      setIsBump2Checked(false);
      setName('');
      setEmail('');
      setIsLoading(false);
      setPaymentData(null);
      setError('');
      if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
      }
    }, 500);
  };

  const copyPixCode = () => {
    if (paymentData?.pix?.pix_qr_code) {
        navigator.clipboard.writeText(paymentData.pix.pix_qr_code);
        // Maybe add a small "copied" feedback
    }
  }

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="font-mono bg-[#0a0a0a] border-primary shadow-[0_0_30px_hsl(var(--primary)/0.15)] p-0 max-w-lg rounded-lg overflow-hidden sm:rounded-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>Protocolo de Pagamento</DialogTitle>
        </DialogHeader>
        <div className="terminal-header bg-black p-4 border-b border-primary flex justify-between items-center text-xs font-bold text-primary">
            <span className="blinking-cursor">{'>'} PROTOCOLO DE PAGAMENTO_</span>
            <span>🔒 SSL: ATIVADO</span>
        </div>

        <div className="modal-body p-4 sm:p-6">
            {view === 'success' && (
                <div className="flex flex-col items-center justify-center text-center gap-4 animate-fade-in py-8">
                    <CheckCircle className="w-20 h-20 text-primary animate-pulse-subtle" />
                    <h2 className="text-2xl font-bold text-white mt-4">Pagamento Aprovado!</h2>
                    <p className="text-slate-300">Seu acesso foi enviado para o seu e-mail. Bem-vindo a bordo!</p>
                    <button onClick={handleClose} className="mt-6 w-full p-3 bg-primary text-black text-base font-extrabold uppercase rounded-md cursor-pointer">
                        FECHAR
                    </button>
                </div>
            )}
            {view === 'qr' && paymentData && (
                 <>
                    <div className="price-display text-center mb-4 sm:mb-6 pb-4 sm:pb-5 border-b border-dashed border-border">
                        <div className="price-label text-slate-500 text-xs line-through">{formatPrice(97.00)}</div>
                        <div className={`current-price text-4xl sm:text-5xl text-white font-bold my-1`}>
                            {formatPrice(totalPrice)}
                        </div>
                        <div className="price-sub text-white text-xs sm:text-sm uppercase tracking-wider">
                           AGUARDANDO PAGAMENTO...
                        </div>
                    </div>
                    <div className="qr-section mt-5 text-center bg-white p-4 sm:p-5 rounded-lg animate-fade-in" style={{display: 'block'}}>
                        <p className="text-black font-bold font-sans mb-2.5">ESCANEIE PARA PAGAR:</p>
                        <div className='p-2 bg-white inline-block max-w-[180px] w-full'>
                           <QRCode value={paymentData.pix?.pix_qr_code || ''} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                        </div>
                        <p className="text-slate-700 text-xs mt-2.5 font-sans">Ou copie o código abaixo:</p>
                        <textarea 
                            className="copy-pix w-full bg-slate-100 border border-slate-300 p-2 text-xs mt-2.5 text-slate-800 break-all rounded-sm" 
                            readOnly 
                            value={paymentData.pix?.pix_qr_code || ''}
                        />
                        <button 
                            onClick={copyPixCode}
                            className="mt-2.5 p-2.5 bg-black text-white border-none rounded-sm cursor-pointer w-full hover:bg-slate-800"
                        >
                            COPIAR CÓDIGO PIX
                        </button>
                    </div>
                 </>
            )}
            {view === 'form' && (
                <>
                    <div className="price-display text-center mb-4 sm:mb-6 pb-4 sm:pb-5 border-b border-dashed border-border">
                        <div className="price-label text-slate-500 text-xs line-through">De R$ 97,00 por</div>
                        <div className={`current-price text-4xl sm:text-5xl text-white font-bold my-1 transition-colors duration-300 ${priceUpdated ? 'text-primary' : ''}`}>
                            {formatPrice(totalPrice)}
                        </div>
                        <div className="price-sub text-primary text-[10px] sm:text-[11px] uppercase tracking-wider">
                            ⚡ ACESSO IMEDIATO
                        </div>
                    </div>

                    <ul className="access-list list-none mb-6 bg-primary/5 p-3 sm:p-4 rounded-md border border-white/10 text-xs sm:text-sm">
                        <li className="text-slate-300 mb-2 flex items-center"><span className="text-primary mr-2.5 font-bold">[✓]</span> IA Criadora de Sites (SaaS)</li>
                        <li className="text-slate-300 flex items-center"><span className="text-primary mr-2.5 font-bold">[✓]</span> Manual do Caçador + Scripts</li>
                    </ul>

                    <form id="checkout-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="block text-muted-foreground text-[10px] sm:text-[11px] mb-1.5 uppercase">Nome Completo</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input w-full p-3 sm:p-3.5 bg-[#111] border border-border text-white rounded-sm text-base focus:border-primary focus:bg-black focus:ring-0 focus:shadow-[0_0_8px_hsl(var(--primary)/0.2)]" placeholder="Seu nome..." required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-muted-foreground text-[10px] sm:text-[11px] mb-1.5 uppercase">E-mail Principal</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input w-full p-3 sm:p-3.5 bg-[#111] border border-border text-white rounded-sm text-base focus:border-primary focus:bg-black focus:ring-0 focus:shadow-[0_0_8px_hsl(var(--primary)/0.2)]" placeholder="Seu e-mail..." required />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                        <div className="my-4 sm:my-6 flex flex-col gap-3">
                            <label className={`bump-box flex gap-2.5 items-center p-3 bg-white/5 border-2 border-dashed rounded-md cursor-pointer transition-all duration-300 relative ${isBump1Checked ? 'border-primary bg-primary/5' : 'border-border'}`} >
                                <div className="absolute -top-2.5 right-2.5 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">MAIS VENDIDO</div>
                                <input type="checkbox" checked={isBump1Checked} onChange={e => setIsBump1Checked(e.target.checked)} className="appearance-none w-5 h-5 min-w-[20px] border-2 border-slate-600 rounded bg-black cursor-pointer flex items-center justify-center checked:bg-primary checked:border-primary" />
                                <div className="bump-content">
                                    <h4 className="text-xs sm:text-sm text-white mb-1 uppercase">Script Clientes Ricos <span className="text-primary normal-case block sm:inline">(+{formatPrice(bump1Price)})</span></h4>
                                    <p className="text-xs text-slate-400 leading-snug">Feche contratos de R$ 2k+ com Advogados e Médicos.</p>
                                </div>
                            </label>

                            <label className={`bump-box flex gap-2.5 items-center p-3 bg-white/5 border-2 border-dashed rounded-md cursor-pointer transition-all duration-300 relative ${isBump2Checked ? 'border-primary bg-primary/5' : 'border-border'}`}>
                                <input type="checkbox" checked={isBump2Checked} onChange={e => setIsBump2Checked(e.target.checked)} className="appearance-none w-5 h-5 min-w-[20px] border-2 border-slate-600 rounded bg-black cursor-pointer flex items-center justify-center checked:bg-primary checked:border-primary" />
                                <div className="bump-content">
                                    <h4 className="text-xs sm:text-sm text-white mb-1 uppercase">Acesso Vitalício <span className="text-primary normal-case block sm:inline">(+{formatPrice(bump2Price)})</span></h4>
                                    <p className="text-xs text-slate-400 leading-snug">Nunca perca seu acesso e receba atualizações grátis.</p>
                                </div>
                            </label>
                        </div>
                        
                        <button type="button" onClick={handlePayClick} disabled={isLoading} className="w-full p-4 bg-primary text-black text-base font-extrabold uppercase rounded-md cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)] disabled:opacity-70 disabled:cursor-not-allowed">
                           {isLoading ? 'GERANDO...' : 'GERAR PIX AGORA ❖'}
                        </button>
                    </form>
                </>
            )}

            <div className="mt-5 text-center text-[10px] text-slate-600 flex justify-center gap-4">
                <span>🛡️ GARANTIA 7 DIAS</span>
                <span>🔒 CRIPTOGRAFADO</span>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
