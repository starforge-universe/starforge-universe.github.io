import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  inject
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SiteNavComponent } from './site-nav/site-nav.component';

export interface Star {
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const PARALLAX_FACTOR = 0.28;
/** Extra space below the sticky nav so fragment titles stay fully visible. */
const NAV_SCROLL_GAP_PX = 20;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly viewportScroller = inject(ViewportScroller);

  readonly stars: Star[] = this.generateStars();
  scrollY = 0;
  readonly parallaxFactor = PARALLAX_FACTOR;

  constructor() {
    // Angular's anchor scroller ignores CSS scroll-margin; offset by sticky nav height.
    this.viewportScroller.setOffset(() => [0, this.navScrollOffset()]);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const y = window.scrollY ?? document.documentElement.scrollTop;
    if (y !== this.scrollY) {
      this.scrollY = y;
      this.cdr.markForCheck();
    }
  }

  private navScrollOffset(): number {
    const bar = document.querySelector('.site-nav__bar');
    const height = bar?.getBoundingClientRect().height ?? 72;
    return Math.ceil(height) + NAV_SCROLL_GAP_PX;
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
