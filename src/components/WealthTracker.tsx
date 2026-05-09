"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, DollarSign, PieChart, ArrowUpRight } from "lucide-react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  note: string;
};

const categories = ["Investment", "Leisure", "Essentials", "Business", "Health", "Other"];

export default function WealthTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Essentials");
  const [note, setNote] = useState("");
  const [currency, setCurrency] = useState("USD");

  const formatCurrency = (val: number) => {
    try {
      return new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
      }).format(val);
    } catch (e) {
      return `$${val.toLocaleString()}`;
    }
  };

  const loadCurrency = () => {
    const saved = localStorage.getItem("nexus_currency") || "USD";
    setCurrency(saved);
  };

  useEffect(() => {
    loadCurrency();
    window.addEventListener("nexus_profile_updated", loadCurrency);
    return () => window.removeEventListener("nexus_profile_updated", loadCurrency);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("nexus_wealth");
    if (saved) setTransactions(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("nexus_wealth", JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const addTransaction = () => {
    if (!amount || isNaN(Number(amount))) return;
    
    const newTx: Transaction = {
      id: Date.now().toString(),
      type,
      amount: Number(amount),
      category,
      note,
      date: new Date().toISOString().split('T')[0]
    };
    
    setTransactions([newTx, ...transactions]);
    setAmount("");
    setNote("");
    setIsAdding(false);
  };

  const deleteTx = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  if (!isLoaded) return <div className="animate-pulse h-screen bg-[#050505]" />;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-light text-white tracking-tight mb-2">Financial Matrix</h1>
        <p className="text-[#a1a1aa] text-sm">Track your capital flow and resource allocation.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 bg-emerald-500/5 border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={18} />
            </div>
            <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Total Influx</span>
          </div>
          <div className="text-4xl font-light text-white font-['Outfit']">{formatCurrency(totalIncome)}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 bg-rose-500/5 border-rose-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <TrendingDown size={18} />
            </div>
            <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Total Outflow</span>
          </div>
          <div className="text-4xl font-light text-white font-['Outfit']">{formatCurrency(totalExpense)}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
              <Wallet size={18} />
            </div>
            <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Net Surplus</span>
          </div>
          <div className={`text-4xl font-light font-['Outfit'] ${netBalance >= 0 ? 'text-white' : 'text-rose-400'}`}>
            {formatCurrency(netBalance)}
          </div>
        </motion.div>
      </div>

      {/* Path to Million / Wealth Goal */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-8 bg-[#0a0a0a] border border-[#ffffff10] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[300px] h-full bg-emerald-500/5 blur-[100px] -z-10" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              Neural Accumulation Goal
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-widest">Milestone: 1M</span>
            </h3>
            <p className="text-xs text-[#a1a1aa] mt-1">Measuring distance to your first 1,000,000 in surplus capital.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light text-white font-['Outfit'] tabular-nums">
              {Math.max(0, (netBalance / 1000000) * 100).toFixed(2)}%
            </div>
            <div className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-[0.2em]">Completion</div>
          </div>
        </div>
        
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative mb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, (netBalance / 1000000) * 100))}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.1em]">
          <span>0</span>
          <span className="text-white">500K</span>
          <span>1M+</span>
        </div>
      </motion.div>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-medium text-white flex items-center gap-2">
          Ledger <span className="text-xs text-[#a1a1aa] font-normal">({transactions.length} entries)</span>
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <Plus size={18} /> Log Entry
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-8 bg-[#0a0a0a] border border-[#ffffff20] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Flow Type</label>
                <div className="flex bg-[#111] p-1 rounded-xl border border-[#ffffff10]">
                  <button 
                    onClick={() => setType("expense")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === "expense" ? 'bg-rose-500 text-white' : 'text-[#a1a1aa]'}`}
                  >
                    Expense
                  </button>
                  <button 
                    onClick={() => setType("income")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === "income" ? 'bg-emerald-500 text-white' : 'text-[#a1a1aa]'}`}
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Amount</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#111] border border-[#ffffff10] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Category</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-[#111] border border-[#ffffff10] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase tracking-widest mb-2">Note</label>
                <input 
                  type="text" 
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="What was this for?"
                  className="w-full bg-[#111] border border-[#ffffff10] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={addTransaction}
                className="px-10 py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Seal Transaction
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel p-0 bg-[#0a0a0a] border border-[#ffffff10] overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#ffffff10] text-[10px] font-black tracking-[0.2em] text-[#a1a1aa] uppercase bg-[#0d0d0d]">
          <div className="col-span-2">Date</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-4">Note</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-1"></div>
        </div>

        <div className="flex flex-col">
          <AnimatePresence initial={false}>
            {transactions.length === 0 ? (
              <div className="p-12 text-center text-[#a1a1aa] flex flex-col items-center gap-4">
                <DollarSign size={40} className="opacity-10" />
                <p className="text-sm">No transactions detected. The matrix is silent.</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <motion.div 
                  layout
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="grid grid-cols-12 gap-4 p-4 items-center border-b border-[#ffffff0a] hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="col-span-2 text-xs text-[#a1a1aa] font-mono">{tx.date}</div>
                  <div className="col-span-3">
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-white font-medium">
                      {tx.category}
                    </span>
                  </div>
                  <div className="col-span-4 text-sm text-[#e4e4e7] truncate">{tx.note || "-"}</div>
                  <div className={`col-span-2 text-right font-['Outfit'] tabular-nums font-medium ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button 
                      onClick={() => deleteTx(tx.id)}
                      className="p-2 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
