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

  it('should show DevOps Template hierarchy for project templating mega menu', () => {
    fixture.componentInstance.openMenu('project-templating');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('DevOps Template');
    expect(compiled.textContent).toContain('Spring Template');
    expect(compiled.textContent).toContain('Angular Webapp Template');
    expect(compiled.querySelector('.site-nav__mega-soon')).toBeNull();
  });

  it('should show Spring nested templates in a right flyout on hover', () => {
    const component = fixture.componentInstance;
    component.openMenu('project-templating');
    fixture.detectChanges();

    const springBranch = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('.site-nav__mega-branch.has-nested')[0] as HTMLElement | null;
    expect(springBranch?.textContent).toContain('Spring Template');

    springBranch?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site-nav__mega-flyout')).toBeTruthy();
    expect(compiled.textContent).toContain('Spring Library Template');
    expect(compiled.textContent).toContain('Spring Service Template');
    expect(compiled.textContent).toContain('Spring Application Template');
    expect(compiled.textContent).toContain('Spring Function Template');
    expect(compiled.querySelector('.site-nav__mega-flyout-link.is-retired')).toBeTruthy();
  });

  it('should show Python Library Template when Library Template is hovered', () => {
    const component = fixture.componentInstance;
    component.openMenu('project-templating');
    fixture.detectChanges();

    const branches = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('.site-nav__mega-branch.has-nested');
    const libraryBranch = Array.from(branches).find((el) =>
      el.textContent?.includes('Library Template')
    ) as HTMLElement | undefined;
    expect(libraryBranch).toBeTruthy();

    libraryBranch?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Python Library Template');
  });

  it('should show Composed from flyout when App TAP Template is hovered', () => {
    const component = fixture.componentInstance;
    component.openMenu('project-templating');
    fixture.detectChanges();

    const branches = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('.site-nav__mega-branch.has-nested');
    const appTapBranch = Array.from(branches).find((el) =>
      el.textContent?.includes('App TAP Template')
    ) as HTMLElement | undefined;
    expect(appTapBranch).toBeTruthy();

    appTapBranch?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site-nav__mega-flyout-label')?.textContent?.trim()).toBe(
      'Composed from'
    );
    expect(compiled.textContent).toContain('Terraform Template');
    expect(compiled.textContent).toContain('Angular Webapp Template');
    expect(compiled.textContent).toContain('Python Function Template');
  });

  it('should show Coming soon for All Seeing Eye mega menu', () => {
    fixture.componentInstance.openMenu('all-seeing-eye');
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
