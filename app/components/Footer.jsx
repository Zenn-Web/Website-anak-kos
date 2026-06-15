import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-4 text-xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            KosConnect
          </Link>
          <p className="text-sm max-w-xs leading-relaxed">
            Dibuat dengan air mata dan kopi saset oleh mahasiswa semester akhir yang butuh hiburan.
          </p>
        </div>
        
        <div>
          <h3 className="text-zinc-100 font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
            <li><Link href="/task-manager" className="hover:text-white transition-colors">Task Manager</Link></li>
            <li><Link href="/expense-tracker" className="hover:text-white transition-colors">Expense Tracker</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-zinc-100 font-semibold mb-4">Sosmed Kami</h3>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Github className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs">
        <p>&copy; {new Date().getFullYear()} KosConnect. Hak cipta dilindungi dosen.</p>
        <p className="mt-2 md:mt-0">Semoga cepat lulus! 🎓</p>
      </div>
    </footer>
  );
}
