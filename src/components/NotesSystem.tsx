"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Tag, FileText, Trash2, Maximize2, Minimize2, Save, Sparkles } from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
};

export default function NotesSystem() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isFullView, setIsFullView] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ascend_notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
      setNotes([
        { id: "1", title: "Project Ascend Architecture", content: "Main goals: Cinematic UI, performance-first, local-first data architecture.", tags: ["ascend", "work"], updatedAt: new Date().toISOString() },
        { id: "2", title: "Mental Models", content: "1. First Principles Thinking\n2. Occam's Razor\n3. Second-Order Effects", tags: ["learning"], updatedAt: new Date().toISOString() },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Thought",
      content: "",
      tags: [],
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  const selectedNote = notes.find(n => n.id === selectedNoteId);
  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isLoaded) return <div className="animate-pulse h-screen bg-[#050505]" />;

  return (
    <div className={`flex gap-6 h-[calc(100vh-12rem)] relative ${isFullView ? 'fixed inset-0 z-[100] bg-[#050505] p-8 m-0 h-screen' : ''}`}>
      
      {/* Sidebar: List */}
      {!isFullView && (
        <div className="w-80 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium text-white flex items-center gap-2">
              Neural Notes <span className="text-xs text-[#a1a1aa] font-normal">{notes.length}</span>
            </h2>
            <button 
              onClick={addNote}
              className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" size={14} />
            <input 
              type="text" 
              placeholder="Search thoughts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#ffffff10] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {filteredNotes.map(note => (
              <motion.div
                key={note.id}
                layout
                onClick={() => setSelectedNoteId(note.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedNoteId === note.id ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30' : 'bg-[#0a0a0a] border-[#ffffff0a] hover:border-[#ffffff20]'}`}
              >
                <h3 className={`text-sm font-medium mb-1 truncate ${selectedNoteId === note.id ? 'text-white' : 'text-[#e4e4e7]'}`}>
                  {note.title || "Untitled Thought"}
                </h3>
                <p className="text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed mb-3">
                  {note.content || "Empty content..."}
                </p>
                <div className="flex flex-wrap gap-1">
                  {note.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-[#a1a1aa] rounded-md border border-white/5 uppercase font-bold tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Main Editor */}
      <div className={`flex-1 flex flex-col glass-panel bg-[#0a0a0a] border-[#ffffff10] overflow-hidden ${isFullView ? 'rounded-[2rem]' : 'rounded-2xl'}`}>
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between p-6 border-b border-[#ffffff0a]">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={selectedNote.title}
                  onChange={e => updateNote(selectedNote.id, { title: e.target.value })}
                  placeholder="Note Title"
                  className="w-full bg-transparent text-2xl font-light text-white outline-none placeholder-[#ffffff20]"
                />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFullView(!isFullView)}
                  className="p-2 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  title="Toggle Full View"
                >
                  {isFullView ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button 
                  onClick={() => deleteNote(selectedNote.id)}
                  className="p-2 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                  title="Delete Note"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-8 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-[var(--color-accent)]" />
                <input 
                  type="text" 
                  placeholder="Add tags (comma separated)..."
                  value={selectedNote.tags.join(", ")}
                  onChange={e => updateNote(selectedNote.id, { tags: e.target.value.split(",").map(t => t.trim()).filter(t => t !== "") })}
                  className="bg-transparent text-xs text-[#a1a1aa] outline-none placeholder-[#a1a1aa]/30 flex-1"
                />
              </div>
              
              <textarea 
                value={selectedNote.content}
                onChange={e => updateNote(selectedNote.id, { content: e.target.value })}
                placeholder="Start channeling your thoughts..."
                className="flex-1 bg-transparent text-lg text-[#e4e4e7] leading-relaxed resize-none outline-none placeholder-[#ffffff10] custom-scrollbar"
              />
            </div>

            <div className="p-6 border-t border-[#ffffff0a] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-[#a1a1aa] uppercase font-bold tracking-widest">Saved to Neural Cloud</span>
              </div>
              <div className="text-[10px] text-[#a1a1aa] uppercase font-bold tracking-widest">
                Last modified: {new Date(selectedNote.updatedAt).toLocaleTimeString()}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#a1a1aa] p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
              <FileText size={32} className="opacity-20" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Thought Selected</h3>
            <p className="text-sm max-w-xs leading-relaxed opacity-50 mb-8">
              Select a thought from the list or initialize a new neural node to begin capturing.
            </p>
            <button 
              onClick={addNote}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Plus size={18} /> New Thought
            </button>
          </div>
        )}
      </div>

      {/* Floating AI Insight Panel (Mock) */}
      {!isFullView && selectedNote && selectedNote.content.length > 20 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 glass-panel p-6 bg-gradient-to-b from-indigo-500/10 to-transparent border-indigo-500/20 self-start"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-indigo-400" />
            <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Neural Link</h3>
          </div>
          <p className="text-[11px] text-[#a1a1aa] leading-relaxed mb-4">
            Context analysis suggests this thought is related to <span className="text-white">Productivity</span> and <span className="text-white">Architecture</span>.
          </p>
          <button className="w-full py-2 bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-300 uppercase tracking-widest rounded-lg hover:bg-indigo-500/20 transition-all">
            Find Related Notes
          </button>
        </motion.div>
      )}
    </div>
  );
}
