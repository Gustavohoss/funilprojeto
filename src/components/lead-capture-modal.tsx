'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
};

export function LeadCaptureModal({ isOpen, onClose, onSubmit }: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
        onSubmit({ name, email });
        setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-primary/30">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-white font-headline text-2xl text-center">Quase lá!</DialogTitle>
            <DialogDescription className="text-slate-400 text-center">
              Preencha seus dados para garantir sua vaga e acessar a oferta.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-slate-300">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="col-span-3 bg-slate-800 border-slate-700 text-white focus-visible:ring-primary"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.melhor@email.com"
                className="col-span-3 bg-slate-800 border-slate-700 text-white focus-visible:ring-primary"
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center col-span-4">{error}</p>}
          </div>
          <DialogFooter>
            <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 font-bold"
                disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'ACESSAR OFERTA AGORA'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
