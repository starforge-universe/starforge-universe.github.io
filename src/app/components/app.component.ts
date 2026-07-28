import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteNavComponent } from './site-nav/site-nav.component';
import { ThemeService } from '../services/theme.service';

export interface Star {
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const PARALLAX_FACTOR = 0.28;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  /** Eagerly construct theme so document attribute stays in sync. */
  protected readonly themeService = inject(ThemeService);

  readonly stars: Star[] = this.generateStars();
  scrollY = 0;
  readonly parallaxFactor = PARALLAX_FACTOR;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const y = window.scrollY ?? document.documentElement.scrollTop;
    if (y !== this.scrollY) {
      this.scrollY = y;
      this.cdr.markForCheck();
    }
  }

  private generateStars(): Star[] {
    const count = 64;
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 4,
        size: 1 + Math.random() * 1.6,
        opacity: 0.15 + Math.random() * 0.45
      });
    }
    return stars;
  }
}
