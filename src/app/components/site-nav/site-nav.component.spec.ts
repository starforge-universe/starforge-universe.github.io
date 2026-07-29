import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SiteNavComponent } from './site-nav.component';
import { PRODUCT_LINES } from '../../data/product-lines';

describe('SiteNavComponent', () => {
  let fixture: ComponentFixture<SiteNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteNavComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteNavComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render brand and product links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site-nav__name')?.textContent?.trim()).toBe(
      'Starforge Universe'
    );
    expect(compiled.querySelectorAll('.site-nav__links a').length).toBe(PRODUCT_LINES.length);
  });

  it('should show Coming soon for project templating mega menu', () => {
    fixture.componentInstance.openMenu('project-templating');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site-nav__mega-soon')?.textContent?.trim()).toBe(
      'Coming soon'
    );
  });

  it('should show LiquiSketch link for utilities mega menu', () => {
    fixture.componentInstance.openMenu('utilities');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('LiquiSketch');
    const link = compiled.querySelector('.site-nav__mega-link') as HTMLAnchorElement | null;
    expect(link?.getAttribute('href')).toContain('/lines/utilities');
    expect(link?.getAttribute('href')).toContain('liquisketch');
  });
});
