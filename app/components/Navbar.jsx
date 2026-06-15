"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Menu, LayoutDashboard, Wallet, LogOut, CheckSquare, Sparkles } from "lucide-react";

export function Navbar() {
  const handleLogout = () => {
    toast.success("Berhasil logout! Tapi boong, ini kan demo 😜");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container mx-auto max-w-6xl flex h-16 items-center px-4 justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            KosConnect
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
          <Link href="/#fitur" className="hover:text-white transition-colors">Fitur</Link>
          <Link href="/#manfaat" className="hover:text-white transition-colors">Manfaat</Link>
          <Link href="/#harga" className="hover:text-white transition-colors">Harga</Link>
        </nav>

        {/* User / Actions */}
        <div className="flex items-center gap-4">
          
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center outline-none focus:ring-2 focus:ring-red-500/30 rounded-full transition-all">
                <Avatar size="default">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar Budi" />
                  <AvatarFallback className="bg-red-500/10 text-red-500 font-bold">BS</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-white/5 text-zinc-300 w-56 align-end">
              <DropdownMenuLabel className="font-semibold text-zinc-100 flex flex-col">
                <span>Budi Santoso</span>
                <span className="text-[10px] text-zinc-500 font-normal">Kamar A-12 • Maba Hemat</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <Link href="/task-manager">
                <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer gap-2">
                  <CheckSquare className="w-4 h-4 text-zinc-400" /> Task Manager
                </DropdownMenuItem>
              </Link>
              <Link href="/expense-tracker">
                <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer gap-2">
                  <Wallet className="w-4 h-4 text-zinc-400" /> Expense Tracker
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="focus:bg-red-500/10 focus:text-red-500 cursor-pointer text-red-400 gap-2"
              >
                <LogOut className="w-4 h-4" /> Keluar Akun
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Actions (Desktop Only) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/task-manager">
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-zinc-900">
                Tugas
              </Button>
            </Link>
            <Link href="/expense-tracker">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                Keuangan
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Trigger (Hamburger) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-white">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 border-white/5 text-zinc-100 p-6">
              <SheetHeader className="pb-6 border-b border-white/5">
                <SheetTitle className="text-xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent text-left">
                  KosConnect
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6">
                <nav className="flex flex-col gap-4 text-lg font-medium text-zinc-400">
                  <SheetClose asChild>
                    <Link href="/#fitur" className="hover:text-white transition-colors">Fitur</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#manfaat" className="hover:text-white transition-colors">Manfaat</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#harga" className="hover:text-white transition-colors">Harga</Link>
                  </SheetClose>
                </nav>

                <DropdownMenuSeparator className="bg-white/5" />

                <div className="flex flex-col gap-3">
                  <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Aplikasi Saya</p>
                  <SheetClose asChild>
                    <Link href="/task-manager" className="flex items-center gap-3 p-3 bg-zinc-950 border border-white/5 rounded-xl hover:bg-zinc-800 transition-colors">
                      <CheckSquare className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">Task Manager</p>
                        <p className="text-[10px] text-zinc-500">Kelola tugas deadlinemu</p>
                      </div>
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link href="/expense-tracker" className="flex items-center gap-3 p-3 bg-zinc-950 border border-white/5 rounded-xl hover:bg-zinc-800 transition-colors">
                      <Wallet className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">Expense Tracker</p>
                        <p className="text-[10px] text-zinc-500">Pantau duit tanggal tua</p>
                      </div>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
