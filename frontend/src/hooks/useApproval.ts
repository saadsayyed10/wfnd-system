import { create } from "zustand";

interface ApprovalState {
  approval: boolean | null;
  userType: string | null;

  setApproval: (approval: boolean) => void;
  setUserType: (userType: string) => void;

  reset: () => void;
}

export const useApproval = create<ApprovalState>((set) => ({
  approval: null,
  userType: null,

  setApproval: (approval) => {
    set({ approval });
  },

  setUserType: (userType) => {
    set({ userType });
  },

  reset: () => {
    set({ approval: null, userType: null });
  },
}));
