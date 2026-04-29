import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export function useActiveLink(path: string) {
  const { pathname } = useLocation();
  return pathname === path;
}
