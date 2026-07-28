import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProductLineComponent } from './product-line.component';

describe('ProductLineComponent', () => {
  let fixture: ComponentFixture<ProductLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLineComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug: 'project-templating' })),
            snapshot: { paramMap: convertToParamMap({ slug: 'project-templating' }) }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductLineComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the selected product line', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.detail__title')?.textContent).toContain(
      'Starforge project templating'
    );
    expect(compiled.querySelector('.detail__back')).toBeTruthy();
  });
});
