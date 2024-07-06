import create from 'zustand';

interface FilterState {
  filterSelected: boolean;
  toggleFilter: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  filterSelected: false,
  toggleFilter: () => set((state) => ({ filterSelected: !state.filterSelected })),
}));

export default useFilterStore;
