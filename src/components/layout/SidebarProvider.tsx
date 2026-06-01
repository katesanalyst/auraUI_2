'use client';

import { createContext, useContext, useState } from 'react';

interface SidebarContextValue {
  mini: boolean;
  mobileOpen: boolean;
  toggleMini: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}

export default function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mini, setMini] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        mini,
        mobileOpen,
        toggleMini: () => setMini((p) => !p),
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
