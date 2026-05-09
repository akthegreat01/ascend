"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, DollarSign } from "lucide-react";

interface Expense {
  id: string;
  label: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

export default function ExpenseWidget() {
  const [entries, setEntries] = useState<Expense[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexus_expenses");
    if (saved) setEntries(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  const save = (updated: Expense[]) => {
    setEntries(updated);
    localStorage.setItem("nexus_expenses", JSON.stringify(updated));
  };

  const addEntry = () => {
    if (!label.trim() || !amount) return;
    const entry: Expense = {
      id: Date.now().toString(),
      label: label.trim(),
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split("T")[0],
    };
    save([entry, ...entries]);
    setLabel("");
    setAmount("");
    setIsAdding(false);
  };

  if (!isLoaded) return null;

  // This month's entries
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthEntries = entries.filter(e => e.date.startsWith(thisMonth));
  const totalIncome = monthEntries.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const totalExpense = monthEntries.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 bg-[#0a0a0a] border border-[#ffffff10] group hover:border-emerald-500/20 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet size={16} className="text-emerald-400" />
          <h3 className="text-xs font-bold text-[#a1a1aa] uppercase tracking-widest">Quick Expenses</h3>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-[#111] border border-[#ffffff06]">
        <div>
          <span className="text-[10px] text-[#a1a1aa] uppercase tracking-widest block mb-0.5">This Month</span>
          <span className={`text-lg font-light font-['Outfit'] tabular-nums ${balance >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {balance >= 0 ? "+" : ""}₹{balance.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-end gap-0.5 text-[10px]">
          <span className="text-emerald-400 flex items-center gap-1"><TrendingUp size={10} /> ₹{totalIncome.toLocaleString()}</span>
          <span className="text-rose-400 flex items-center gap-1"><TrendingDown size={10} /> ₹{totalExpense.toLocaleString()}</span>
        </div>
      </div>

      {isAdding && (
        <div className="flex flex-col gap-2 mb-4">
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="Description..."
            className="w-full bg-transparent border border-[#ffffff08] rounded-lg text-xs text-white px-3 py-2 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
              type="number"
              className="flex-1 bg-transparent border border-[#ffffff08] rounded-lg text-xs text-white px-3 py-2 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]"
            />
            <div className="flex">
              {(["income", "expense"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-2.5 py-2 text-[10px] font-medium border transition-all first:rounded-l-lg last:rounded-r-lg capitalize ${
                    type === t
                      ? t === "income" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-rose-500/20 border-rose-500/30 text-rose-400"
                      : "border-[#ffffff08] text-[#a1a1aa]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={addEntry}
            disabled={!label.trim() || !amount}
            className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${label.trim() && amount ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
          >
            Add Entry
          </button>
        </div>
      )}

      {/* Recent entries */}
      {monthEntries.length > 0 && (
        <div className="space-y-1.5 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
          {monthEntries.slice(0, 8).map(entry => (
            <div key={entry.id} className="flex items-center justify-between p-2 rounded-lg bg-[#111]/50 group/item">
              <span className="text-[11px] text-[#a1a1aa] truncate flex-1">{entry.label}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[11px] font-semibold font-['Outfit'] tabular-nums ${entry.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
                  {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                </span>
                <button
                  onClick={() => save(entries.filter(e => e.id !== entry.id))}
                  className="opacity-0 group-hover/item:opacity-100 p-0.5 rounded hover:bg-red-500/10 text-[#a1a1aa] hover:text-red-400 transition-all"
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
