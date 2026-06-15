"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  Trash2, Plus, ArrowLeft, Calendar as CalendarIcon, Check,
  AlertTriangle, Filter, CheckCircle2, Circle, Clock, Tag, Flame
} from "lucide-react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Kuliah");
  const [priority, setPriority] = useState("Penting");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isLoaded, setIsLoaded] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Judul tugas jangan dikosongin ya!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      category,
      priority,
      dueDate: selectedDate ? selectedDate.toISOString() : null,
      completed: false,
    };

    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);

    // Reset form
    setTitle("");
    setDesc("");
    setCategory("Kuliah");
    setPriority("Penting");
    setSelectedDate(new Date());
    setShowCalendar(false);

    toast.success("Tugas baru berhasil ditambahkan! Semangat ngerjainnya 💪");
  };

  const toggleTask = (id) => {
    const newTasks = tasks.map((t) => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) {
          toast.success("Mantap! Satu beban hidup berhasil diselesaikan 🎉");
        }
        return { ...t, completed: nextState };
      }
      return t;
    });
    saveTasks(newTasks);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!taskToDelete) return;
    const newTasks = tasks.filter((t) => t.id !== taskToDelete.id);
    saveTasks(newTasks);
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
    toast.success("Tugas berhasil dihapus dari daftar. Beban berkurang!");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && !task.completed) ||
      (statusFilter === "completed" && task.completed);

    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Gawat Darurat":
        return "border-l-rose-500 bg-rose-500/5";
      case "Penting":
        return "border-l-yellow-500 bg-yellow-500/5";
      case "Santai":
      default:
        return "border-l-emerald-500 bg-emerald-500/5";
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "Gawat Darurat":
        return "destructive";
      case "Penting":
        return "secondary";
      case "Santai":
      default:
        return "outline";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Kapan-kapan";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat catatan tugas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid-pattern text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-2">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
            </Link>
            <h1 className="text-3xl font-black bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              KosTasks 📝
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Catat tugas kuliah, piket kosan, dan belanjaan bulanan sebelum numpuk.
            </p>
          </div>

          <div className="flex gap-3 bg-zinc-900 border border-white/5 rounded-2xl p-4 self-start sm:self-auto">
            <div className="text-center px-4 border-r border-white/5">
              <span className="block text-2xl font-bold text-red-500">
                {tasks.filter(t => !t.completed).length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Aktif</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-2xl font-bold text-emerald-500">
                {tasks.filter(t => t.completed).length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Selesai</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-md sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-red-500" />
                  Tambah Tugas Baru
                </CardTitle>
                <CardDescription className="text-zinc-400 text-xs">
                  Biar gak kelupaan trus dicoret dari KK kosan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={addTask} className="space-y-4">
                  {/* Judul */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Nama Tugas / Agenda</label>
                    <Input
                      placeholder="Contoh: Laporan praktikum fisika"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-zinc-950 border-white/5 text-zinc-100 focus-visible:ring-red-500/20"
                      required
                    />
                  </div>

                  {/* Kategori */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Kategori</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full bg-zinc-950 border-white/5 text-zinc-300">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/5 text-zinc-300">
                        <SelectItem value="Kuliah">📚 Kuliah</SelectItem>
                        <SelectItem value="Urusan Kos">🏠 Urusan Kos</SelectItem>
                        <SelectItem value="Belanja">🛒 Belanjaan</SelectItem>
                        <SelectItem value="Keuangan">💵 Keuangan</SelectItem>
                        <SelectItem value="Lainnya">🌱 Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prioritas */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Tingkat Urgensi</label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className="w-full bg-zinc-950 border-white/5 text-zinc-300">
                        <SelectValue placeholder="Pilih Urgensi" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/5 text-zinc-300">
                        <SelectItem value="Gawat Darurat">🚨 Gawat Darurat (Deadliner)</SelectItem>
                        <SelectItem value="Penting">⚡ Penting (Bagus dicicil)</SelectItem>
                        <SelectItem value="Santai">🌴 Santai Aja (Bisa nanti)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tanggal */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 block">Tenggat Waktu</label>
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

                  {/* Deskripsi */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300">Catatan / Detail Tambahan</label>
                    <Textarea
                      placeholder="Misal: Kelompok 5, dikumpulin di portal e-learning max jam 23.59"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="bg-zinc-950 border-white/5 text-zinc-100 focus-visible:ring-red-500/20 resize-none min-h-[80px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg shadow-red-500/10 transition-all">
                    Tambah ke List
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-2 space-y-6">

            {/* Filters Card */}
            <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-md">
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="w-full md:flex-1">
                    <Input
                      placeholder="Cari tugas di sini..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-zinc-950 border-white/5 text-zinc-100 focus-visible:ring-red-500/20 w-full"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="w-full md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full bg-zinc-950 border-white/5 text-zinc-300">
                        <SelectValue placeholder="Semua Kategori" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/5 text-zinc-300">
                        <SelectItem value="all">📁 Semua Kategori</SelectItem>
                        <SelectItem value="Kuliah">📚 Kuliah</SelectItem>
                        <SelectItem value="Urusan Kos">🏠 Urusan Kos</SelectItem>
                        <SelectItem value="Belanja">🛒 Belanjaan</SelectItem>
                        <SelectItem value="Keuangan">💵 Keuangan</SelectItem>
                        <SelectItem value="Lainnya">🌱 Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-white/5" />

                {/* Status Tabs */}
                <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
                  <TabsList className="bg-zinc-950 border border-white/5 p-1 w-full grid grid-cols-3">
                    <TabsTrigger value="all" className="data-active:bg-zinc-800 text-xs">
                      Semua ({tasks.length})
                    </TabsTrigger>
                    <TabsTrigger value="active" className="data-active:bg-zinc-800 text-xs">
                      Aktif ({tasks.filter(t => !t.completed).length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-active:bg-zinc-800 text-xs">
                      Selesai ({tasks.filter(t => t.completed).length})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Tasks Render */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-zinc-900/20 border border-dashed border-white/5 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-400 font-semibold">Tugas Kosong!</p>
                  <p className="text-zinc-600 text-xs mt-1">Gak ada tugas yang cocok. Saatnya rebahan dengan tenang 🛌</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`border-y border-r border-l-4 border-white/5 transition-all hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black/20 ${getPriorityColor(task.priority)}`}
                  >
                    <CardContent className="p-5 flex items-start gap-4">
                      {/* Checkbox Icon */}
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-1 focus:outline-none shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
                        ) : (
                          <Circle className="w-6 h-6 text-zinc-600 hover:text-zinc-400 transition-colors" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Badges */}
                          <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-[10px] py-0.5 px-2 font-semibold tracking-wide">
                            {task.priority === "Gawat Darurat" && <Flame className="w-3 h-3 mr-1 inline" />}
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] py-0.5 px-2 border-white/10 bg-white/5 text-zinc-300">
                            {task.category === "Kuliah" && "📚 "}
                            {task.category === "Urusan Kos" && "🏠 "}
                            {task.category === "Belanja" && "🛒 "}
                            {task.category === "Keuangan" && "💵 "}
                            {task.category === "Lainnya" && "🌱 "}
                            {task.category}
                          </Badge>

                          {/* Due Date Indicator */}
                          {task.dueDate && (
                            <div className="flex items-center gap-1 text-[11px] text-zinc-400 ml-auto">
                              <Clock className="w-3.5 h-3.5 text-zinc-500" />
                              Tenggat: <span className={new Date(task.dueDate) < new Date() && !task.completed ? "text-red-500 font-semibold" : ""}>{formatDate(task.dueDate)}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className={`text-base font-bold text-zinc-100 truncate ${task.completed ? "line-through text-zinc-500" : ""}`}>
                          {task.title}
                        </h3>

                        {/* Description */}
                        {task.desc && (
                          <p className={`text-sm text-zinc-400 leading-relaxed line-clamp-2 ${task.completed ? "line-through text-zinc-600" : ""}`}>
                            {task.desc}
                          </p>
                        )}
                      </div>

                      {/* Delete Action */}
                      <Tooltip>
                        <TooltipTrigger render={
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDeleteClick(task)}
                            className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 shrink-0 self-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        } />
                        <TooltipContent className="bg-zinc-800 text-zinc-200 border-white/5">
                          Hapus tugas
                        </TooltipContent>
                      </Tooltip>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-white/5 text-zinc-100 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Hapus Tugas?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Tugas &ldquo;{taskToDelete?.title}&rdquo; bakal dihapus permanen. Yakin udah gak penting lagi?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300">
              Gak Jadi
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
