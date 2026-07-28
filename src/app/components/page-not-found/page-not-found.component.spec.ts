import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('This path is off the map');
    expect(compiled.querySelector('.not-found__cta')?.textContent).toContain('Return home');
  });
});
