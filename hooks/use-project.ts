import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ProjectState {
  title: string
  description: string
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setProject: (project: Partial<ProjectState>) => void
  reset: () => void
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      title: "",
      description: "",
      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      setProject: (project) => set((state) => ({ ...state, ...project })),
      reset: () => set({ title: "", description: "" }),
    }),
    {
      name: "project-storage", // localStorage key
      storage: createJSONStorage(() => localStorage), // explicitly use localStorage
    },
  ),
)

export default useProjectStore
