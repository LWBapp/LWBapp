
import React, { useEffect, useState } from "react";
import { getSoulmaps, removeSoulmap, clearSoulmaps, SoulmapEntry } from "@/utils/soulmapStorage";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const SoulmapJournal = () => {
  const [entries, setEntries] = useState<SoulmapEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEntries(getSoulmaps());
  }, []);

  const handleRemove = (id: string) => {
    removeSoulmap(id);
    setEntries(getSoulmaps());
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all journal entries?")) {
      clearSoulmaps();
      setEntries([]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ocean-light via-blush-light to-honey-light flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-ocean-dark mb-6 text-center">
          My Soulmap Journal
        </h1>
        {entries.length === 0 ? (
          <div className="bg-white/90 rounded-xl shadow p-6 text-center text-gray-600">
            No soulmaps saved yet. Take a quiz to add your soulmap!
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-3">
              <Button
                variant="destructive"
                onClick={handleClearAll}
                className="flex gap-2 items-center"
                size="sm"
              >
                <Trash2 size={16} /> Clear All
              </Button>
            </div>
            <ul className="space-y-5">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="bg-white/90 rounded-xl border border-muted shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-lg">{entry.title || "Soul Country Quiz"}</div>
                    <div className="text-xs text-gray-500">{entry.date ? new Date(entry.date).toLocaleDateString() : ""}</div>
                    <div className="mt-1 text-gray-700 line-clamp-2">
                      <strong>{entry.country}:</strong>{" "}
                      {entry.description.slice(0, 80)}{entry.description.length > 80 ? "..." : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Button
                      variant="outline"
                      className="rounded-full text-ocean-dark border-ocean-dark font-semibold"
                      size="sm"
                      onClick={() =>
                        navigate("/result", { state: { ...entry, fromJournal: true } })
                      }
                    >
                      View Full Result
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      size="icon"
                      aria-label="Remove Entry"
                      onClick={() => handleRemove(entry.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SoulmapJournal;
