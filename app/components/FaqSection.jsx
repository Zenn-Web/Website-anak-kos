import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Sering Ditanyakan (FAQ)</h2>
          <p className="text-muted-foreground">Kumpulan pertanyaan maba dan senior yang kebingungan.</p>
        </div>

        <Accordion type="single" collapsible className="w-full bg-background border border-border/50 rounded-2xl p-4 shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-semibold">Apakah aplikasi ini benar-benar gratis?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Ya, 100% gratis. Selama kamu masih pakai "Paket Tanggal Tua", kami nggak akan nagih sepeserpun. Lagian kamu kan anak kos, masa kami palak?
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-semibold">Data saya disimpan di mana?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Semua data disimpan di dalam browser-mu sendiri (menggunakan localStorage). Kami nggak nyimpen datamu di server. Jadi kalau kamu ganti device atau hapus cache, datanya hilang ya.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-semibold">Kok fiturnya cuma dikit?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Sengaja. Kalau fiturnya banyak nanti kamu malah pusing dan ujung-ujungnya tetep rebahan nggak ngerjain tugas. Ini aplikasi, bukan skripsi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-semibold">Kapan "Mode Pamer Saldo" rilis?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Sabar ya, developer-nya lagi sibuk revisian skripsi. Nanti kalau dosen pembimbingnya acc, baru kita kerjain fitur pamer saldo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
