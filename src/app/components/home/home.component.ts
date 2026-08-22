import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCT_LINES } from '../../data/product-lines';
import { drawHeroSphere } from './hero-sphere.canvas';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D | null;
  private resizeObserver?: ResizeObserver;
  private animationFrame?: number;
  private startTime = 0;
  private reduceMotion = false;
  private canvasLogicalSize = 1;

  readonly productLines = PRODUCT_LINES;

  ngAfterViewInit(): void {
    this.initRevealObserver();
    this.initSphereCanvas();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private initRevealObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    const nodes = this.host.nativeElement.querySelectorAll('[data-reveal]');
    nodes.forEach((node: Element) => this.observer?.observe(node));
  }

  private initSphereCanvas(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.canvas = this.host.nativeElement.querySelector(
      '.hero__sphere-canvas'
    ) as HTMLCanvasElement | null ?? undefined;

    if (!this.canvas) {
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      return;
    }

    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.startTime = performance.now();
    this.resizeCanvas();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObserver.observe(this.canvas);
    }

    if (this.reduceMotion) {
      drawHeroSphere(this.ctx, this.canvasLogicalSize, this.canvasLogicalSize, 0);
      return;
    }

    const render = (now: number) => {
      if (!this.canvas || !this.ctx) {
        return;
      }

      const elapsedSeconds = (now - this.startTime) / 1000;
      drawHeroSphere(
        this.ctx,
        this.canvasLogicalSize,
        this.canvasLogicalSize,
        elapsedSeconds
      );
      this.animationFrame = requestAnimationFrame(render);
    };

    this.animationFrame = requestAnimationFrame(render);
  }

  private resizeCanvas(): void {
    if (!this.canvas || !this.ctx) {
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height, 1);
    const dpr = window.devicePixelRatio || 1;

    this.canvasLogicalSize = size;
    this.canvas.width = Math.round(size * dpr);
    this.canvas.height = Math.round(size * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}
