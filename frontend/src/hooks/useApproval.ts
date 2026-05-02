import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApprovalState {
  approval: boolean | null;
  userType: string | null;

  setApproval: (approval: boolean) => void;
  setUserType: (userType: string) => void;

  reset: () => void;
}

export const useApproval = create<ApprovalState>()(
  persist(
    (set) => ({
      approval: null,
      userType: null,

      setApproval: (approval) => set({ approval }),

      setUserType: (userType) => set({ userType }),

      reset: () => set({ approval: null, userType: null }),
    }),
    {
      name: "approval-storage",
    },
  ),
);
