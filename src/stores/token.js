import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create()(
  persist(
    (set) => ({
      token: "",
      setToken: (t) => set({ token: t }),
    }),
    { name: "token-storage" }
  )
);
export default useTokenStore;
