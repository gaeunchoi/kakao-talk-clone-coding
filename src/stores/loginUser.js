import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
    }),
    { name: "loginUser-storage" }
  )
);

export default useLoginUserStore;
