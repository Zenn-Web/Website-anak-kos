"use client";

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Flame, Zap, HelpCircle, GraduationCap } from "lucide-react";

export function SurvivalGuide() {
  const tips = [
    {
      title: "Masak Nasi via Dispenser",
      desc: "Rice cooker rusak pas tanggal tua? Masukkan beras ke mangkok antipanas, tuang air dispenser mendidih, tutup rapat dengan mangkok lain. Tunggu 40 menit. Nasi agak kenyal, tapi aman dikonsumsi.",
      difficulty: "Sedang",
      badgeColor: "secondary",
      icon: <Coffee className="w-8 h-8 text-yellow-500 mb-2" />
    },
    {
      title: "Satu Sabun Multi-Fungsi",
      desc: "Beli sabun bayi cair ukuran besar. Bisa dipakai mandi, cuci muka, shampooan, sampai cuci piring darurat. Hemat budget bulanan hingga 75% tanpa bikin kulit kering.",
      difficulty: "Mudah",
      badgeColor: "outline",
      icon: <Zap className="w-8 h-8 text-blue-500 mb-2" />
    },
    {
      title: "Misi Makan Gratisan Kuliah",
      desc: "Pantau papan pengumuman sidang skripsi atau wisuda. Datang dengan pakaian rapi di akhir acara, ucapkan selamat dengan tulus ke senior, lalu melipir santai ke meja konsumsi prasmanan.",
      difficulty: "Sedang",
      badgeColor: "secondary",
      icon: <GraduationCap className="w-8 h-8 text-emerald-500 mb-2" />
    },
    {
      title: "Strategi Aromaterapi Nyamuk",
      desc: "Nyamuk kosan brutal tapi cairan pengusir abis? Tetesin minyak kayu putih ke tisu, tempel di kipas angin yang menyala. Kamar wangi minyak telon bayi, nyamuk pusing langsung pingsan.",
      difficulty: "Mudah",
      badgeColor: "outline",
      icon: <HelpCircle className="w-8 h-8 text-cyan-500 mb-2" />
    },
    {
      title: "Mode Hiburan Super Hemat",
      desc: "Numpang wifi di sekre UKM atau perpus kampus dari pagi sampai malam untuk download drakor dan anime satu season penuh. Nonton di kamar kos pakai mode offline biar irit kuota hp.",
      difficulty: "Mudah",
      badgeColor: "outline",
      icon: <Zap className="w-8 h-8 text-indigo-500 mb-2" />
    }
  ];

  return (
    <section className="py-20 bg-zinc-950 overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-red-500/10 border-red-500/30 text-red-500 px-3 py-1 mb-4 rounded-full text-xs">
            💡 Panduan Survival
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Survival Guide Anak Kos
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
            Kumpulan tips absurd tapi terbukti efektif untuk bertahan hidup saat dompet mulai menipis di akhir bulan.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto px-10 relative">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {tips.map((tip, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="bg-zinc-900/40 border-white/5 h-[280px] flex flex-col justify-between hover:border-zinc-800 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        {tip.icon}
                        <Badge variant={tip.badgeColor} className="text-[10px] tracking-wide">
                          Kesulitan: {tip.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-bold text-zinc-100 mt-2">
                        {tip.title}
                      </CardTitle>
                      <CardDescription className="text-zinc-400 text-xs leading-relaxed mt-1 line-clamp-5">
                        {tip.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Buttons positioned absolutely */}
            <CarouselPrevious className="border-white/10 bg-zinc-900 hover:bg-zinc-800 text-white left-[-45px]" />
            <CarouselNext className="border-white/10 bg-zinc-900 hover:bg-zinc-800 text-white right-[-45px]" />
          </Carousel>
        </div>

      </div>
    </section>
  );
}
