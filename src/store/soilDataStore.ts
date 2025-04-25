import { create } from 'zustand';

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
  temperature: number;
}

interface SoilDataStore {
  soilData: SoilData | null;
  setSoilData: (data: SoilData) => void;
}

export const useSoilDataStore = create<SoilDataStore>((set) => ({
  soilData: null,
  setSoilData: (data) => set({ soilData: data }),
}));