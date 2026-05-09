"use client";

import { useState } from "react";
import TodoList from "@/components/TodoList";
import KanbanBoard from "@/components/KanbanBoard";
import { LayoutList, LayoutGrid } from "lucide-react";

export default function TasksPage() {
  const [view, setView] = useState<"list" | "board">("board");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
            Master Task List
          </h1>
          <p className="text-[#a1a1aa] text-sm">
            Manage all your ongoing projects and daily goals.
          </p>
        </div>
        
        <div className="flex items-center gap-1 bg-[#111] p-1 rounded-lg border border-[#ffffff10]">
          <button 
            onClick={() => setView("list")}
            className={`p-2 rounded-md transition-colors ${view === "list" ? "bg-[#ffffff15] text-white" : "text-[#a1a1aa] hover:text-white"}`}
          >
            <LayoutList size={16} />
          </button>
          <button 
            onClick={() => setView("board")}
            className={`p-2 rounded-md transition-colors ${view === "board" ? "bg-[#ffffff15] text-white" : "text-[#a1a1aa] hover:text-white"}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full">
        {view === "list" ? <TodoList /> : <KanbanBoard />}
      </div>
    </div>
  );
}
