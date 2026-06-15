import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

export function BenefitCard() {
  const benefits = [
    {
      title: "Tugas Kelar, Hidup Tenang",
      description: "Berhenti jadi deadliner. Kelola semua tugas kuliahmu dengan mudah, checklist yang sudah selesai, dan nikmati waktu rebahan tanpa beban pikiran.",
      icon: <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-4" />,
      link: "/task-manager",
      linkText: "Atur Jadwal Sekarang"
    },
    {
      title: "Pantau Uang Jajan",
      description: "Catat setiap pengeluaran sekecil apapun (termasuk parkir minimarket). Ketahui ke mana larinya uang kirimanmu sebelum pertengahan bulan.",
      icon: <Wallet className="w-10 h-10 text-rose-500 mb-4" />,
      link: "/expense-tracker",
      linkText: "Lacak Keuanganmu"
    }
  ];

  return (
    <section id="manfaat" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Kenapa Kamu Butuh Ini?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dirancang khusus untuk memecahkan dua masalah terbesar mahasiswa: Lupa ngerjain tugas dan kehabisan duit sebelum waktunya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden bg-background">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <CardHeader>
                {benefit.icon}
                <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                <CardDescription className="text-base mt-2 leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={benefit.link} className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 group-hover:underline">
                  {benefit.linkText}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
