import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'sf-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>(this.resolveInitial());

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* ignore quota / private mode */
      }
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
  }

  private resolveInitial(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      /* ignore */
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }
}
