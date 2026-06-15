import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="harga" className="py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Pilih Gaya Hidupmu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Harga jujur tanpa embel-embel. Mulai ngirit dari sekarang sebelum mie instan jadi satu-satunya pilihan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Paket Tanggal Tua */}
          <Card className="flex flex-col border-border/50 hover:border-red-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-600 dark:text-zinc-400">Paket Tanggal Tua</CardTitle>
              <CardDescription>Bisa dipake sepuasnya buat kaum mendang-mending.</CardDescription>
              <div className="mt-4 text-4xl font-extrabold">Rp 0<span className="text-lg font-normal text-muted-foreground">/bulan</span></div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> <span className="text-sm">Catat tugas tak terbatas</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> <span className="text-sm">Pantau pengeluaran harian</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> <span className="text-sm">Simpan data lokal (aman dari kuota)</span></li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Mulai Sekarang</Button>
            </CardFooter>
          </Card>

          {/* Paket Tanggal Muda */}
          <Card className="flex flex-col border-red-500 shadow-lg shadow-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
              Paling Laris
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Paket Tanggal Muda</CardTitle>
              <CardDescription>Level sultan pas awal bulan, buat yang suka pamer struk Nasi Padang.</CardDescription>
              <div className="mt-4 text-4xl font-extrabold">Rp 0<span className="text-lg font-normal text-muted-foreground">/bulan</span></div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-red-500" /> <span className="text-sm">Semua fitur Tanggal Tua</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-red-500" /> <span className="text-sm">Mode Pamer Saldo (Segera)</span></li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-red-500" /> <span className="text-sm">Notif "Awas Boros!" (Segera)</span></li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Upgrade (Kalo Mau)</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
