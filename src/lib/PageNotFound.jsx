"use client";
import { Link } from '@/lib/router';
import { ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Pagina niet gevonden</p>
        <h1 className="font-display text-6xl lg:text-8xl text-foreground/10 mb-6">404</h1>
        <p className="text-muted-foreground mb-10 max-w-md">
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Terug naar home
        </Link>
      </div>
    </div>
  );
}