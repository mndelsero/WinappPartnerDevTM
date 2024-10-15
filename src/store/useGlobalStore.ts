import { Business, Product } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface GlobalState {
	setCategories: (categories: number[]) => void;
	categories: number[];
	setBusiness: (business: Business) => void;
	business: Business;
}

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				categories: [],
				setCategories: (categories) => set({ categories }),
				business: {} as Business,
				setBusiness: (business) => set({ business }),
			}),
			{
				name: "global-storage",
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);

export default useGlobalStore;
