"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Chart, registerables } from "chart.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  ArrowLeft, Calendar as CalendarIcon, Info, Trash2,
  TrendingUp, TrendingDown, Wallet, AlertTriangle, Plus, PlusCircle
} from "lucide-react";

Chart.register(...registerables);

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Makanan");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expense-transactions")) || [];
    setTransactions(saved);

    // Simulate loading for Skeleton demo
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Save to LocalStorage
  const saveTransactions = (newTx) => {
    setTransactions(newTx);
    localStorage.setItem("expense-transactions", JSON.stringify(newTx));
  };

  const balance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  // Re-draw chart on data change
  useEffect(() => {
    if (!isLoaded || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const data = (income === 0 && expense === 0)
      ? {
        labels: ["Belum Ada Data"],
        datasets: [{
          data: [1],
          backgroundColor: ["rgba(255, 255, 255, 0.05)"],
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1
        }]
      }
      : {
        labels: ["Pemasukan", "Pengeluaran"],
        datasets: [{
          data: [income, expense],
          backgroundColor: ["#10b981", "#f43f5e"],
          borderColor: "#09090b",
          borderWidth: 2
        }]
      };

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#a1a1aa",
              font: { family: "Plus Jakarta Sans", size: 11, weight: "500" },
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: "#18181b",
            titleColor: "#ffffff",
            bodyColor: "#a1a1aa",
            borderColor: "rgba(255,255,255,0.08)",
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                if (context.label === "Belum Ada Data") return "Belum ada transaksi";
                return ` ${context.label}: Rp ${context.raw.toLocaleString("id-ID")}`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions, isLoaded, income, expense]);

  const handleAmountChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "");
    if (!clean) {
      setAmount("");
      return;
    }
    setAmount(Number(clean).toLocaleString("id-ID"));
  };

  const submitTransaction = (e) => {
    e.preventDefault();
    const tTitle = title.trim();
    const rawAmount = parseInt(amount.replace(/\./g, ""));

    if (!tTitle) {
      toast.error("Nama transaksi wajib diisi ya!");
      return;
    }

    if (!rawAmount || isNaN(rawAmount) || rawAmount <= 0) {
      toast.error("Nominal transaksi harus lebih dari Rp 0!");
      return;
    }

    if (rawAmount > 1000000000) {
      toast.error("Miliarder ya? Nominalnya kegedean buat anak kos!");
      return;
    }

    const newTx = {
      id: crypto.randomUUID(),
      title: tTitle,
      amount: rawAmount,
      type,
      category,
      date: selectedDate ? selectedDate.toISOString() : new Date().toISOString()
    };

    saveTransactions([...transactions, newTx]);
    setTitle("");
    setAmount("");
    setSelectedDate(new Date());
    setShowCalendar(false);

    if (type === "income") {
      toast.success("Pemasukan dicatat! Waktunya foya-foya (tapi boong) 💸");
    } else {
      toast.success("Pengeluaran dicatat! Dompet mulai bergetar 💸");
    }
  };

  const handleDeleteClick = (tx) => {
    setTransactionToDelete(tx);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!transactionToDelete) return;
    saveTransactions(transactions.filter(t => t.id !== transactionToDelete.id));
    setIsDeleteDialogOpen(false);
    setTransactionToDelete(null);
    toast.success("Catatan transaksi berhasil dihapus!");
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (statusFilter === "income") return t.type === "income";
    if (statusFilter === "expense") return t.type === "expense";
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="bg-zinc-950 bg-grid-pattern min-h-screen text-zinc-100 p-4 sm:p-8 md:p-12 flex flex-col items-center font-sans">
      <div className="w-full max-w-6xl flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <p className="text-red-500 text-xs font-bold tracking-widest uppercase">Keuangan Anak Kos</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            KosMoney Tracker 💰
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Lacak setiap rupiah yang masuk dan keluar. Cegah mie instan akhir bulan dengan perencanaan yang matang.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
            <CardHeader className="pb-2">
              <CardDescription className="text-zinc-400 flex items-center gap-1 text-xs">
                Sisa Saldo
                <Tooltip>
                  <TooltipTrigger render={
                    <button className="text-zinc-500 hover:text-zinc-300"><Info className="w-3.5 h-3.5" /></button>
                  } />
                  <TooltipContent className="bg-zinc-800 text-zinc-200 border-white/5">
                    Pemasukan dikurangi Pengeluaran
                  </TooltipContent>
                </Tooltip>
              </CardDescription>
              <CardTitle className="text-3xl font-black text-white flex items-center gap-2">
                <Wallet className="w-6 h-6 text-yellow-500" />
                Rp {isLoaded ? balance.toLocaleString("id-ID") : <Skeleton className="h-8 w-36 bg-zinc-800 inline-block" />}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-zinc-400 text-xs">Total Pemasukan</CardDescription>
              <CardTitle className="text-2xl font-black text-emerald-500 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Rp {isLoaded ? income.toLocaleString("id-ID") : <Skeleton className="h-6 w-36 bg-zinc-800 inline-block" />}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-zinc-400 text-xs">Total Pengeluaran</CardDescription>
              <CardTitle className="text-2xl font-black text-rose-500 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-rose-500" />
                Rp {isLoaded ? expense.toLocaleString("id-ID") : <Skeleton className="h-6 w-36 bg-zinc-800 inline-block" />}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Panel: Form */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-red-500" /> Catat Transaksi
                </CardTitle>
                <CardDescription className="text-zinc-400 text-xs">
                  Catat biar gak bingung duit ilang ke mana.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitTransaction} className="space-y-4">
                  {/* Judul */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Nama Transaksi</label>
                    <Input
                      placeholder="Misal: Uang bulanan ortu, Beli baso"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-zinc-950 border-white/5 text-zinc-100 focus-visible:ring-red-500/20"
                      required
                    />
                  </div>

                  {/* Nominal */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Nominal (Rp)</label>
                    <Input
                      placeholder="0"
                      value={amount}
                      onChange={handleAmountChange}
                      className="bg-zinc-950 border-white/5 text-zinc-100 focus-visible:ring-red-500/20"
                      required
                    />
                  </div>

                  {/* Tipe */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Jenis Transaksi</label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="w-full bg-zinc-950 border-white/5 text-zinc-300">
                        <SelectValue placeholder="Pilih Jenis" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/5 text-zinc-300">
                        <SelectItem value="expense">💸 Pengeluaran (Uang Keluar)</SelectItem>
                        <SelectItem value="income">💵 Pemasukan (Uang Masuk)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Kategori */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Kategori</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full bg-zinc-950 border-white/5 text-zinc-300">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/5 text-zinc-300">
                        <SelectItem value="Makanan">🍲 Makanan & Minuman</SelectItem>
                        <SelectItem value="Kos">🏠 Kos & Tagihan</SelectItem>
                        <SelectItem value="Kuliah">📚 Kuliah & Print</SelectItem>
                        <SelectItem value="Transportasi">🏍️ Transportasi</SelectItem>
                        <SelectItem value="Hiburan">🎮 Hiburan & Jajan</SelectItem>
                        <SelectItem value="Lainnya">🌱 Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tanggal */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">Tanggal Transaksi</label>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-zinc-950 border-white/5 text-zinc-300 hover:bg-zinc-900"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-red-500" />
                      {selectedDate ? formatDate(selectedDate) : "Pilih Tanggal"}
                    </Button>

                    {showCalendar && (
                      <div className="border border-white/5 bg-zinc-950 rounded-lg p-2 mt-2 shadow-2xl z-50 relative flex justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            if (date) {
                              setSelectedDate(date);
                              setShowCalendar(false);
                            }
                          }}
                          className="bg-transparent text-zinc-200"
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                    Simpan Transaksi
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Analytics Card */}
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-zinc-300">Rasio Keuangan</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[200px]">
                {!isLoaded ? (
                  <Skeleton className="w-[180px] h-[180px] rounded-full bg-zinc-800" />
                ) : (
                  <div className="relative w-full h-full max-h-[170px]">
                    <canvas ref={chartRef}></canvas>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Table List */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/5">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Riwayat Transaksi</CardTitle>
                  <CardDescription className="text-zinc-400 text-xs">
                    Total {transactions.length} transaksi tercatat.
                  </CardDescription>
                </div>

                {/* Filter Tabs */}
                <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
                  <TabsList className="bg-zinc-950 border border-white/5 p-1 grid grid-cols-3 w-full sm:w-[320px]">
                    <TabsTrigger value="all" className="data-active:bg-zinc-800 text-xs">Semua</TabsTrigger>
                    <TabsTrigger value="income" className="data-active:bg-zinc-800 text-xs">Pemasukan</TabsTrigger>
                    <TabsTrigger value="expense" className="data-active:bg-zinc-800 text-xs">Pengeluaran</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="pt-6">
                {!isLoaded ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full bg-zinc-800" />
                    <Skeleton className="h-12 w-full bg-zinc-850" />
                    <Skeleton className="h-12 w-full bg-zinc-850" />
                    <Skeleton className="h-12 w-full bg-zinc-850" />
                  </div>
                ) : filteredTransactions.length === 0 ? (
                  <div className="border border-dashed border-white/10 rounded-xl p-10 text-center text-zinc-500 text-sm">
                    Belum ada catatan transaksi.
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="border-white/5">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-zinc-400 font-semibold w-[120px]">Tanggal</TableHead>
                        <TableHead className="text-zinc-400 font-semibold">Transaksi</TableHead>
                        <TableHead className="text-zinc-400 font-semibold">Kategori</TableHead>
                        <TableHead className="text-zinc-400 font-semibold text-right">Nominal</TableHead>
                        <TableHead className="text-zinc-400 font-semibold w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.slice().reverse().map((t) => (
                        <TableRow key={t.id} className="border-white/5 hover:bg-white/5">
                          {/* Tanggal */}
                          <TableCell className="text-zinc-400 text-xs">
                            {formatDate(t.date)}
                          </TableCell>

                          {/* Transaksi */}
                          <TableCell className="font-bold text-zinc-100">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${t.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                              {t.title}
                            </div>
                          </TableCell>

                          {/* Kategori */}
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10 text-zinc-300 font-medium">
                              {t.category === "Makanan" && "🍲 Makanan"}
                              {t.category === "Kos" && "🏠 Kos"}
                              {t.category === "Kuliah" && "📚 Kuliah"}
                              {t.category === "Transportasi" && "🏍️ Transpor"}
                              {t.category === "Hiburan" && "🎮 Hiburan"}
                              {t.category === "Lainnya" && "🌱 Lainnya"}
                            </Badge>
                          </TableCell>

                          {/* Nominal */}
                          <TableCell className={`text-right font-extrabold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString("id-ID")}
                          </TableCell>

                          {/* Action */}
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger render={
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => handleDeleteClick(t)}
                                  className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              } />
                              <TooltipContent className="bg-zinc-800 text-zinc-200 border-white/5">
                                Hapus catatan
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>

        </div>

      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-white/5 text-zinc-100 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Hapus Transaksi?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Catatan transaksi &ldquo;{transactionToDelete?.title}&rdquo; sebesar Rp {transactionToDelete?.amount.toLocaleString("id-ID")} akan dihapus permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300">
              Batal
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
