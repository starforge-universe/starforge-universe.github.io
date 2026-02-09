import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Star {
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

/** Parallax factor: background moves this fraction of scroll distance (0.3 = 30% speed = depth). */
const PARALLAX_FACTOR = 0.35;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private cdr = inject(ChangeDetectorRef);

  readonly stars: Star[] = this.generateStars();
  /** Scroll offset for parallax: background translates by -scrollY * factor */
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
    const count = 100;
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 1.5 + Math.random() * 2.5,
        size: 1 + Math.random() * 2
      });
    }
    return stars;
  }
}