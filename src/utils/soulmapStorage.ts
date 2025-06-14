
export type SoulmapEntry = {
  id: string; // unique, e.g. timestamp or uuid
  title: string;
  country: string;
  description: string;
  date: string; // ISO string
  journalEntry?: string;
};

const STORAGE_KEY = "soulmaps";

export function getSoulmaps(): SoulmapEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as SoulmapEntry[];
  } catch {
    return [];
  }
}

export function saveSoulmap(entry: SoulmapEntry) {
  const all = getSoulmaps();
  all.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function removeSoulmap(id: string) {
  const all = getSoulmaps().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearSoulmaps() {
  localStorage.removeItem(STORAGE_KEY);
}
