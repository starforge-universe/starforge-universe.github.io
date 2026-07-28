import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home.component';
import { PRODUCT_LINES } from '../../data/product-lines';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render brand and product lines from the catalog', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero__brand')?.textContent?.trim()).toBe('Starforge Universe');
    expect(compiled.querySelectorAll('.lines__item').length).toBe(PRODUCT_LINES.length);
    expect(compiled.textContent).toContain('Starforge project templating');
    expect(compiled.textContent).toContain('All Seeing Eye');
  });
});
