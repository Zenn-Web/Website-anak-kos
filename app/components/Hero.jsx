import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-6 rounded-full border-red-500/30 bg-red-500/10 text-red-500 px-4 py-1 text-xs sm:text-sm">
          🔥 Solusi Paling Ampuh Tanggal Tua
        </Badge>
        
        <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
          Aplikasi Bertahan Hidup <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">Anak Kos</span>
        </h1>
        
        <p className="max-w-2xl text-muted-foreground text-lg sm:text-xl mb-10 leading-relaxed">
          Atur tugas kuliah biar gak dimarahin dosen, dan pantau uang saku biar gak makan mie instan 3x sehari. Semua dalam satu aplikasi yang super ringan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/task-manager" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20">
              Buka Task Manager
            </Button>
          </Link>
          <Link href="/expense-tracker" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full rounded-full border-border/60 shadow-sm">
              Catat Uang Jajan
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </section>
  );
}
