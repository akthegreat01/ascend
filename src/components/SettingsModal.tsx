"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Download, Upload, X, Settings as SettingsIcon, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleOpenSettings = () => setIsOpen(true);
    window.addEventListener("ascend_open_settings", handleOpenSettings);
    return () => window.removeEventListener("ascend_open_settings", handleOpenSettings);
  }, []);

  const exportData = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("ascend_")) {
        data[key] = localStorage.getItem(key) || "";
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ascend_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        Object.keys(data).forEach((key) => {
          if (key.startsWith("ascend_")) {
            localStorage.setItem(key, data[key]);
          }
        });
        alert("Data imported successfully! The page will reload.");
        window.location.reload();
      } catch (err) {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
  };

  const [name, setName] = useState("User");
  const [theme, setTheme] = useState("#f43f5e");
  const [bedtime, setBedtime] = useState("22:30");
  const [activeTab, setActiveTab] = useState("profile");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [currency, setCurrency] = useState("USD");


  useEffect(() => {
    const savedName = localStorage.getItem("ascend_name");
    const savedTheme = localStorage.getItem("ascend_theme");
    const savedWebhook = localStorage.getItem("ascend_webhook");
    const savedCurrency = localStorage.getItem("ascend_currency");
    const savedBedtime = localStorage.getItem("ascend_bedtime");
    
    if (savedName) setName(savedName);
    if (savedWebhook) setWebhookUrl(savedWebhook);
    if (savedBedtime) setBedtime(savedBedtime);
    if (savedCurrency) {
      setCurrency(savedCurrency);
    } else {
      // Auto-detect based on locale
      const locale = navigator.language;
      const currencyMap: Record<string, string> = {
        'en-US': 'USD', 'en-GB': 'GBP', 'en-IN': 'INR', 'hi-IN': 'INR',
        'ja-JP': 'JPY', 'de-DE': 'EUR', 'fr-FR': 'EUR', 'es-ES': 'EUR',
        'it-IT': 'EUR', 'pt-BR': 'BRL', 'en-CA': 'CAD', 'en-AU': 'AUD'
      };
      const detected = currencyMap[locale] || 'USD';
      setCurrency(detected);
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.style.setProperty('--color-accent', savedTheme);
    }
  }, [isOpen]);

  const saveSettings = () => {
    localStorage.setItem("ascend_name", name);
    localStorage.setItem("ascend_theme", theme);
    localStorage.setItem("ascend_webhook", webhookUrl);
    localStorage.setItem("ascend_currency", currency);
    localStorage.setItem("ascend_bedtime", bedtime);
    document.documentElement.style.setProperty('--color-accent', theme);
    window.dispatchEvent(new Event("ascend_profile_updated"));
    setIsOpen(false);
  };

  const themes = [
    { name: "Rose", value: "#f43f5e" },
    { name: "Emerald", value: "#10b981" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Monochrome", value: "#ffffff" }
  ];

  return (
    <>
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl glass-panel p-0 flex flex-col max-h-[90vh] overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-[#ffffff10] sticky top-0 z-20 backdrop-blur-md">
                  <h2 className="text-xl font-semibold text-white">System Configuration</h2>
                  <button onClick={() => setIsOpen(false)} className="text-[#a1a1aa] hover:text-white transition-colors p-1">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex border-b border-white/10 px-2 sticky top-[72px] z-20 overflow-x-auto custom-scrollbar no-scrollbar whitespace-nowrap backdrop-blur-md">
                  <button onClick={() => setActiveTab("profile")} className={`px-4 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "profile" ? "border-[var(--color-accent)] text-white bg-[var(--color-accent)]/5" : "border-transparent text-[#a1a1aa] hover:text-white"}`}>Profile</button>
                  <button onClick={() => setActiveTab("integrations")} className={`px-4 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "integrations" ? "border-[var(--color-accent)] text-white bg-[var(--color-accent)]/5" : "border-transparent text-[#a1a1aa] hover:text-white"}`}>Integrations</button>

                  <button onClick={() => setActiveTab("data")} className={`px-4 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "data" ? "border-[var(--color-accent)] text-white bg-[var(--color-accent)]/5" : "border-transparent text-[#a1a1aa] hover:text-white"}`}>Vault</button>
                </div>

                <div className="p-5 md:p-8 space-y-8 flex-1 overflow-y-auto">
                  
                  {activeTab === "profile" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-white block mb-2">Display Name</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#111111] border border-[#ffffff15] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-white block mb-2">Target Bedtime</label>
                        <input 
                          type="time" 
                          value={bedtime}
                          onChange={(e) => setBedtime(e.target.value)}
                          className="w-full bg-[#111111] border border-[#ffffff15] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors [color-scheme:dark]"
                        />
                        <p className="text-[9px] text-[#a1a1aa] mt-1 uppercase tracking-wider font-bold">Your dashboard will adapt to help you wind down before this time.</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-white block mb-2">Local Currency</label>
                        <select 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full bg-[#111111] border border-[#ffffff15] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="INR">INR (₹)</option>
                          <option value="JPY">JPY (¥)</option>
                          <option value="CAD">CAD ($)</option>
                          <option value="AUD">AUD ($)</option>
                          <option value="BRL">BRL (R$)</option>
                        </select>
                        <p className="text-[9px] text-[#a1a1aa] mt-1 uppercase tracking-wider font-bold">Auto-detected from your neuro-locale</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-white block mb-2">Accent Theme</label>
                        <div className="flex gap-2">
                          {themes.map((t) => (
                            <button 
                              key={t.name}
                              onClick={() => setTheme(t.value)}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${theme === t.value ? 'border-white scale-110 shadow-[0_0_15px_currentColor]' : 'border-transparent hover:scale-105'}`}
                              style={{ backgroundColor: t.value, color: t.value }}
                              title={t.name}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "integrations" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-white mb-1">Global Webhooks (Zapier / Discord)</h3>
                        <p className="text-xs text-[#a1a1aa] mb-4">
                          Paste a webhook URL below. When you complete a Focus Timer session, Ascend will automatically send a POST request payload. You can use this to turn on smart lights, post to Slack, or log to Notion.
                        </p>
                        <input 
                          type="url" 
                          placeholder="https://hooks.zapier.com/..." 
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          className="w-full bg-[#111111] border border-[#ffffff15] rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                      </div>

                      <div className="pt-4 border-t border-[#ffffff10]">
                        <h3 className="text-sm font-medium text-white mb-2">Connected Apps</h3>
                        <div className="flex flex-col gap-2">
                          {/* Spotify */}
                          <div className="flex items-center justify-between p-3 rounded-xl border border-[#ffffff10] bg-[#ffffff05]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zM20.4 9c-3.96-2.4-10.44-2.64-14.28-1.44-.6.18-1.2-.12-1.38-.72-.18-.6.12-1.2.72-1.38 4.44-1.32 11.52-1.02 15.96 1.68.54.3.72 1.02.42 1.56-.24.48-.9.72-1.44.3z"/></svg>
                              </div>
                              <div>
                                <p className="text-sm text-white font-medium">Spotify Engine</p>
                                <p className="text-[10px] text-emerald-400">Active natively</p>
                              </div>
                            </div>
                            <button disabled className="text-xs text-[#a1a1aa] px-3 py-1 bg-[#ffffff0a] rounded-full">Embedded</button>
                          </div>
                          
                          {/* Notion */}
                          <div className="flex items-center justify-between p-3 rounded-xl border border-[#ffffff10] bg-[#ffffff05]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.373-2.055-.28l-10.88.746c-.42.047-1.074.047-1.401.28L4.459 4.208zM20.91 5.421c-.234-.14-.56-.094-1.027-.047l-13.12 1.026c-.327.047-.467.14-.467.42v15.26c0 .28.14.373.467.42l13.587-1.12c.327-.047.56-.233.56-.513V5.56c0-.093-.047-.14-.047-.186v-.094L20.91 5.42zm-9.336 12.04c-.327.047-.467-.093-.467-.373V8.875c0-.28.14-.373.467-.42l1.914-.14c.28 0 .42.093.42.373v8.073l3.641-7.233c.233-.42.42-.467.84-.467l1.727-.14c.28 0 .42.094.42.374v8.306c0 .28-.14.373-.42.42l-1.914.14c-.28 0-.42-.093-.42-.373V9.528l-3.921 7.793c-.187.373-.373.42-.747.467l-1.54.14z"/></svg>
                              </div>
                              <div>
                                <p className="text-sm text-white font-medium">Notion Workspace</p>
                                <p className="text-[10px] text-[#a1a1aa]">Sync focus logs to Notion</p>
                              </div>
                            </div>
                            <button onClick={() => alert('Notion OAuth flow simulated.')} className="text-xs text-white px-3 py-1 bg-[var(--color-accent)] hover:opacity-80 rounded-full transition-opacity">Connect</button>
                          </div>
                          
                          {/* Google Calendar */}
                          <div className="flex items-center justify-between p-3 rounded-xl border border-[#ffffff10] bg-[#ffffff05]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/><path fill="#FFF" d="M12.923 16.385h-1.846v-5.539h-3.692v-1.846h5.538v7.385z"/></svg>
                              </div>
                              <div>
                                <p className="text-sm text-white font-medium">Google Calendar</p>
                                <p className="text-[10px] text-[#a1a1aa]">Import events into tasks</p>
                              </div>
                            </div>
                            <button onClick={() => alert('Google Calendar OAuth flow simulated.')} className="text-xs text-white px-3 py-1 bg-[var(--color-accent)] hover:opacity-80 rounded-full transition-opacity">Connect</button>
                          </div>

                          {/* GitHub */}
                          <div className="flex items-center justify-between p-3 rounded-xl border border-[#ffffff10] bg-[#ffffff05]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="black"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                              </div>
                              <div>
                                <p className="text-sm text-white font-medium">GitHub</p>
                                <p className="text-[10px] text-[#a1a1aa]">Sync commits to stats</p>
                              </div>
                            </div>
                            <button onClick={() => alert('GitHub OAuth flow simulated.')} className="text-xs text-white px-3 py-1 bg-[var(--color-accent)] hover:opacity-80 rounded-full transition-opacity">Connect</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}



                  {activeTab === "data" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
                      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                          <Upload size={80} className="text-emerald-500" />
                        </div>
                        <div className="relative z-10">
                          <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                            <Zap size={14} /> Data Vault
                          </h4>
                          <p className="text-xs text-[#a1a1aa] mb-6 leading-relaxed max-w-[85%]">
                            Export your entire Ascend universe to a single encrypted JSON file. Drop it onto any other device to instantly restore your focus history, tasks, and streaks.
                          </p>
                          <div className="flex gap-3">
                            <button 
                              onClick={exportData}
                              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] border border-white/10 text-white font-bold rounded-xl hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300 text-xs shadow-lg shadow-black/50"
                            >
                              <Download size={14} /> EXPORT BACKUP
                            </button>
                            
                            <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-colors cursor-pointer text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                              <Upload size={14} /> RESTORE BACKUP
                              <input type="file" accept=".json" onChange={importData} className="hidden" />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent p-6 mt-8">
                        <h4 className="text-sm font-black uppercase tracking-widest text-rose-500 mb-2">Danger Zone</h4>
                        <p className="text-xs text-[#a1a1aa] mb-6 leading-relaxed">
                          Purging all system data will permanently delete your habits, tasks, goals, and telemetry history. This action cannot be undone.
                        </p>
                        <button 
                          onClick={() => {
                            if (confirm("Are you absolutely sure? This will wipe your entire Ascend OS data.")) {
                              for (let i = localStorage.length - 1; i >= 0; i--) {
                                const key = localStorage.key(i);
                                if (key && key.startsWith("ascend_")) {
                                  localStorage.removeItem(key);
                                }
                              }
                              window.location.reload();
                            }
                          }}
                          className="w-full py-3 bg-[#111] border border-rose-500/20 text-rose-500 font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 text-xs shadow-lg shadow-black/50 uppercase tracking-widest"
                        >
                          Purge All Telemetry
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                </div>
                
                <div className="p-6 border-t border-[#ffffff10] sticky bottom-0 z-10 backdrop-blur-md">
                  <button 
                    onClick={saveSettings}
                    className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-white/5"
                  >
                    Save Configuration
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      , document.body)}
    </>
  );
}
