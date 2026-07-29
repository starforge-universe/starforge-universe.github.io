import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  PRODUCT_LINES,
  ProductLine,
  ProductNavMenuItem,
  getNavMenuItems,
  getProductLine
} from '../../data/product-lines';
import { ThemeService } from '../../services/theme.service';

const MEGA_CLOSE_MS = 320;

@Component({
  selector: 'app-site-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteNavComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly themeService = inject(ThemeService);
  readonly productLines = PRODUCT_LINES;
  /** Which line’s menu content is rendered (kept briefly while closing). */
  readonly panelSlug = signal<string | null>(null);
  /** Drives the roll-down open/closed animation. */
  readonly megaOpen = signal(false);
  /** Nested templates shown in the right-hand flyout (hover parent). */
  readonly flyoutItem = signal<ProductNavMenuItem | null>(null);

  readonly activeLine = computed(() => {
    const slug = this.panelSlug();
    return slug ? getProductLine(slug) : undefined;
  });

  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private clearPanelTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.closeMenu(true));
  }

  menuItemsFor(line: ProductLine) {
    return getNavMenuItems(line);
  }

  isTriggerOpen(slug: string): boolean {
    return this.megaOpen() && this.panelSlug() === slug;
  }

  openMenu(slug: string): void {
    this.cancelClose();
    if (this.panelSlug() !== slug) {
      this.flyoutItem.set(null);
    }
    this.panelSlug.set(slug);
    this.megaOpen.set(true);
  }

  openFlyout(item: ProductNavMenuItem): void {
    this.cancelClose();
    if (item.children?.length || item.composedOf?.length) {
      this.flyoutItem.set(item);
    } else {
      this.flyoutItem.set(null);
    }
  }

  flyoutEntries(item: ProductNavMenuItem): readonly ProductNavMenuItem[] {
    return item.composedOf?.length ? item.composedOf : (item.children ?? []);
  }

  flyoutLabel(item: ProductNavMenuItem): string {
    return item.composedOf?.length ? 'Composed from' : item.label;
  }

  hasFlyout(item: ProductNavMenuItem): boolean {
    return !!(item.children?.length || item.composedOf?.length);
  }

  clearFlyout(): void {
    this.flyoutItem.set(null);
  }

  closeMenu(immediate = false): void {
    this.cancelClose();
    this.megaOpen.set(false);
    this.flyoutItem.set(null);

    if (immediate) {
      this.panelSlug.set(null);
      return;
    }

    this.clearPanelTimer = setTimeout(() => {
      if (!this.megaOpen()) {
        this.panelSlug.set(null);
      }
      this.clearPanelTimer = null;
    }, MEGA_CLOSE_MS);
  }

  scheduleClose(): void {
    this.cancelClose();
    this.closeTimer = setTimeout(() => this.closeMenu(), 140);
  }

  cancelClose(): void {
    if (this.closeTimer !== null) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    if (this.clearPanelTimer !== null) {
      clearTimeout(this.clearPanelTimer);
      this.clearPanelTimer = null;
    }
  }

  onTriggerClick(event: MouseEvent, slug: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    // Touch / coarse pointers: first tap opens the pane; follow the link on a later tap.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    if (!this.isTriggerOpen(slug)) {
      event.preventDefault();
      this.openMenu(slug);
    } else {
      this.closeMenu(true);
    }
  }
}
