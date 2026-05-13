"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, Trash2, Loader2, AlertCircle, Link as LinkIcon, Sparkles } from "lucide-react";

type VisionImage = {
  id: string;
  url: string;
  caption: string;
};

export default function VisionBoard() {
  const [images, setImages] = useState<VisionImage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newUrl.trim() && (newUrl.startsWith("http") || newUrl.startsWith("data:"))) {
        handlePreview();
      } else {
        setPreviewUrl(null);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [newUrl]);

  const fetchPinterestPin = async (pinId: string) => {
    try {
      // Use AllOrigins as a free CORS proxy to hit Pinterest's public pidgets API
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.pinterest.com/v3/pidgets/pins/info/?pin_ids=${pinId}`)}`);
      const rawData = await response.json();
      const data = JSON.parse(rawData.contents);
      return data?.data?.[0]?.images?.['564x']?.url || data?.data?.[0]?.images?.['736x']?.url;
    } catch (e) {
      console.error("Pinterest extraction failed", e);
      return null;
    }
  }

  const resolveImageUrl = async (url: string) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return null;

    // 1. Direct image check (highest priority)
    const isDirectImage = /\.(jpeg|jpg|gif|png|webp|avif)(\?.*)?$/i.test(trimmedUrl) || 
                         trimmedUrl.includes('images.unsplash.com') ||
                         trimmedUrl.includes('i.pinimg.com') ||
                         trimmedUrl.startsWith('data:image/');
                         
    if (isDirectImage) return trimmedUrl;

    // 2. Pinterest specific handling (Subdomains like in.pinterest.com supported)
    const pinIdMatch = trimmedUrl.match(/(?:pinterest\.[a-z.]+|pin\.it)\/pin\/(\d+)/) || 
                       trimmedUrl.match(/pinterest\.[a-z.]+\/pin\/(\d+)/);
    
    if (pinIdMatch) {
      const pinImg = await fetchPinterestPin(pinIdMatch[1]);
      if (pinImg) return pinImg;
    }

    // 3. Generic resolution via Microlink
    try {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(trimmedUrl)}&palette=true`);
      const data = await response.json();
      
      if (data.status === 'success') {
        // Follow redirect for short links
        const resolvedUrl = data.data.url || trimmedUrl;
        const secondPinMatch = resolvedUrl.match(/pin\/(\d+)/);
        if (secondPinMatch) {
          const pinImg = await fetchPinterestPin(secondPinMatch[1]);
          if (pinImg) return pinImg;
        }

        // Use the primary image found by Microlink
        if (data.data.image?.url) {
          return data.data.image.url;
        }
      }
    } catch (err) {
      console.warn("Resolution failed", err);
    }

    // 4. Final check: if it still doesn't look like an image, don't return it
    return null; 
  };

  const handlePreview = async () => {
    if (!newUrl.trim()) return;
    setIsResolving(true);
    setError(null);
    const resolved = await resolveImageUrl(newUrl);
    if (resolved) {
      setPreviewUrl(resolved);
    } else {
      setPreviewUrl(null);
      if (newUrl.length > 10) {
        setError("Could not find a valid image at this link. Try right-clicking the image and selecting 'Copy Image Address'.");
      }
    }
    setIsResolving(false);
  };

  const addImage = async () => {
    if (!newUrl.trim()) return;
    
    setIsResolving(true);
    setError(null);

    try {
      const finalUrl = previewUrl || await resolveImageUrl(newUrl.trim());
      
      const newImage: VisionImage = {
        id: Date.now().toString(),
        url: finalUrl,
        caption: newCaption || "Manifestation"
      };
      
      setImages([newImage, ...images]);
      setNewUrl("");
      setNewCaption("");
      setPreviewUrl(null);
      setIsAdding(false);
    } catch (err) {
      setError("Unable to manifest this image. Please try a direct link.");
    } finally {
      setIsResolving(false);
    }
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(i => i.id !== id));
  };

  if (!isLoaded) return <div className="animate-pulse h-[600px] w-full" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light text-white tracking-tight">Vision Board</h2>
          <p className="text-xs text-[#a1a1aa] mt-1">Paste any link from Pinterest, Unsplash, or the web.</p>
        </div>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            setError(null);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          {isAdding ? <Plus className="rotate-45" size={16} /> : <Plus size={16} />} 
          {isAdding ? "Cancel" : "Add Vision"}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-panel overflow-hidden border border-[#ffffff15] relative group"
          >
            <div className="p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest flex items-center gap-2">
                    <LinkIcon size={12} /> Source URL
                  </label>
                  <input 
                    type="url" 
                    placeholder="Pinterest pin, Instagram post, or image link..." 
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    disabled={isResolving}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-sm text-white px-5 py-4 focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="w-full md:w-80 space-y-2">
                  <label className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} /> Intent / Caption
                  </label>
                  <input 
                    type="text" 
                    placeholder="What does this represent?" 
                    value={newCaption}
                    onChange={e => setNewCaption(e.target.value)}
                    disabled={isResolving}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-sm text-white px-5 py-4 focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              {/* Preview Section */}
              <AnimatePresence>
                {previewUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-sm mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                  >
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Image Preview</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-rose-500 text-xs bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"
                >
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}

              <div className="flex justify-end">
                <button 
                  onClick={addImage}
                  disabled={isResolving || !newUrl.trim()}
                  className="px-8 py-4 bg-[var(--color-accent)] text-white font-bold rounded-2xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center gap-3 shadow-lg shadow-[var(--color-accent)]/20"
                >
                  {isResolving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Manifesting...
                    </>
                  ) : (
                    <>
                      <ImageIcon size={18} />
                      Add to Board
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Decorative background for the add panel */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[var(--color-accent)]/10 blur-[100px] pointer-events-none rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div 
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="break-inside-avoid relative group rounded-3xl overflow-hidden border border-white/10 bg-black/20 hover:border-white/20 transition-all duration-500"
          >
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              loading="lazy"
              onError={(e) => {
                // If image fails, try a fallback or just hide broken icon
                (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800`;
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <motion.div 
                initial={false}
                className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-[var(--color-accent)] rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">Manifested</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-1 leading-tight">
                  {img.caption}
                </h3>
              </motion.div>
              
              <button 
                onClick={() => deleteImage(img.id)}
                className="absolute top-6 right-6 p-3 bg-black/60 text-white/50 rounded-2xl hover:bg-rose-500 hover:text-white backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 border border-white/10"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="glass-panel p-20 bg-[#0a0a0a]/50 text-center text-[#a1a1aa] flex flex-col items-center justify-center border border-white/10 border-dashed rounded-[40px]">
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
            <ImageIcon size={40} className="opacity-20" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Your Future Awaits</h3>
          <p className="text-sm opacity-50 max-w-xs mx-auto">Add images that resonate with your goals. Pinterest, Instagram, or any web link will work.</p>
          <button 
            onClick={() => setIsAdding(true)}
            className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all text-sm font-medium border border-white/5"
          >
            Begin Manifesting
          </button>
        </div>
      )}
    </div>
  );
}
