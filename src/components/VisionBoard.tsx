"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, Trash2 } from "lucide-react";

type VisionImage = {
  id: string;
  url: string;
  caption: string;
};

export default function VisionBoard() {
  const [images, setImages] = useState<VisionImage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ascend_vision");
    if (saved) {
      setImages(JSON.parse(saved));
    } else {
      setImages([
        { id: "1", url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800", caption: "Elite Fitness" },
        { id: "2", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800", caption: "Minimalist Workspace" },
        { id: "3", url: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800", caption: "Travel & Freedom" },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ascend_vision", JSON.stringify(images));
    }
  }, [images, isLoaded]);

  const addImage = () => {
    if (!newUrl.trim()) return;
    const newImage: VisionImage = {
      id: Date.now().toString(),
      url: newUrl,
      caption: newCaption
    };
    setImages([newImage, ...images]);
    setNewUrl("");
    setNewCaption("");
    setIsAdding(false);
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(i => i.id !== id));
  };

  if (!isLoaded) return <div className="animate-pulse h-[600px] w-full" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Plus size={16} /> Add Vision
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6 bg-[#0a0a0a] overflow-hidden border border-[#ffffff20]"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="url" 
                placeholder="Image URL (e.g. https://images.unsplash.com/...)" 
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                className="flex-1 bg-[#111] border border-[#ffffff10] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <input 
                type="text" 
                placeholder="Caption (e.g. Dream Workspace)" 
                value={newCaption}
                onChange={e => setNewCaption(e.target.value)}
                className="w-full md:w-64 bg-[#111] border border-[#ffffff10] rounded-xl text-sm text-white px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button 
                onClick={addImage}
                className="px-6 py-3 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm whitespace-nowrap flex items-center justify-center gap-2"
              >
                <ImageIcon size={16} /> Manifest
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div 
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-[#ffffff10]"
          >
            <img src={img.url} alt={img.caption} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-white font-medium text-lg mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {img.caption}
              </p>
              <button 
                onClick={() => deleteImage(img.id)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="glass-panel p-12 bg-[#0a0a0a] text-center text-[#a1a1aa] flex flex-col items-center justify-center border border-[#ffffff10] border-dashed">
          <ImageIcon size={32} className="mb-4 opacity-50" />
          <p>Your vision board is empty.</p>
          <p className="text-xs mt-2 opacity-50">Upload images that represent your ultimate reality.</p>
        </div>
      )}
    </div>
  );
}
