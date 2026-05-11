"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Plus, ExternalLink, Trash2, Tag, Link2, Video, BookOpen, FileText } from "lucide-react";

interface ReadingItem {
  id: string;
  title: string;
  url: string;
  type: "article" | "video" | "book" | "other";
  tags: string[];
  completed: boolean;
  addedAt: string;
}

const typeIcons: Record<string, any> = {
  article: FileText,
  video: Video,
  book: BookOpen,
  other: Link2,
};

const typeColors: Record<string, string> = {
  article: "#60a5fa",
  video: "#ef4444",
  book: "#a78bfa",
  other: "#6b7280",
};

export default function ReadingList() {
  const [items, setItems] = useState<ReadingItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState<ReadingItem["type"]>("article");
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_reading_list");
    if (saved) setItems(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  const save = (updated: ReadingItem[]) => {
    setItems(updated);
    localStorage.setItem("ascend_reading_list", JSON.stringify(updated));
  };

  const addItem = () => {
    if (!newTitle.trim()) return;
    const item: ReadingItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      url: newUrl.trim(),
      type: newType,
      tags: [],
      completed: false,
      addedAt: new Date().toISOString().split("T")[0],
    };
    save([item, ...items]);
    setNewTitle("");
    setNewUrl("");
    setIsAdding(false);
  };

  const toggleComplete = (id: string) => {
    save(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const deleteItem = (id: string) => {
    save(items.filter(i => i.id !== id));
  };

  const filtered = items.filter(i => {
    if (filter === "pending") return !i.completed;
    if (filter === "done") return i.completed;
    return true;
  });

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight mb-1">Reading List</h1>
          <p className="text-sm text-[#a1a1aa]">Save articles, videos, and books to consume later.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-xs font-semibold hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Plus size={14} /> Add Item
        </button>
      </header>

      {/* Add Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6 bg-[#0a0a0a] border border-[#ffffff10] overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Title..."
                className="w-full bg-transparent border border-[#ffffff08] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]"
                autoFocus
              />
              <input
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder="URL (optional)..."
                className="w-full bg-transparent border border-[#ffffff08] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[#ffffff20] placeholder-[#ffffff20]"
              />
              <div className="flex items-center gap-2">
                {(["article", "video", "book", "other"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setNewType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                      newType === t
                        ? "bg-white/10 border-white/20 text-white"
                        : "border-[#ffffff08] text-[#a1a1aa] hover:border-[#ffffff20]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={addItem}
                disabled={!newTitle.trim()}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  newTitle.trim()
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                Save to List
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "pending", "done"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize ${
              filter === f
                ? "bg-white text-black border-white"
                : "border-[#ffffff10] text-[#a1a1aa] hover:text-white hover:border-[#ffffff20]"
            }`}
          >
            {f} {f === "all" ? `(${items.length})` : f === "pending" ? `(${items.filter(i => !i.completed).length})` : `(${items.filter(i => i.completed).length})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="glass-panel p-12 bg-[#0a0a0a] border border-[#ffffff10] text-center">
            <Bookmark size={32} className="text-[#ffffff15] mx-auto mb-3" />
            <p className="text-sm text-[#a1a1aa]">No items yet. Start building your reading list.</p>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const TypeIcon = typeIcons[item.type] || Link2;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${
                  item.completed
                    ? "bg-[#0a0a0a] border-[#ffffff06] opacity-50"
                    : "bg-[#0a0a0a] border-[#ffffff10] hover:border-[#ffffff20]"
                }`}
              >
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    item.completed
                      ? "bg-emerald-400 border-emerald-400"
                      : "border-[#ffffff20] hover:border-emerald-400"
                  }`}
                >
                  {item.completed && <span className="text-[10px] text-black font-bold">✓</span>}
                </button>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${typeColors[item.type]}15` }}>
                  <TypeIcon size={14} style={{ color: typeColors[item.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium ${item.completed ? "line-through text-[#a1a1aa]" : "text-white"}`}>{item.title}</span>
                  <span className="text-[10px] text-[#a1a1aa] ml-2 font-mono">{item.addedAt}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#a1a1aa] hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
