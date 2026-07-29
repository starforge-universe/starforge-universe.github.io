import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProductLineComponent } from './product-line.component';

describe('ProductLineComponent', () => {
  async function setup(slug: string): Promise<ComponentFixture<ProductLineComponent>> {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ProductLineComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ slug })),
            snapshot: { paramMap: convertToParamMap({ slug }) }
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductLineComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', async () => {
    const fixture = await setup('project-templating');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the selected product line', async () => {
    const fixture = await setup('project-templating');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.detail__title')?.textContent).toContain(
      'Starforge project templating'
    );
    expect(compiled.querySelector('.detail__back')).toBeTruthy();
  });

  it('should render nested Utilities products including LiquiSketch', async () => {
    const fixture = await setup('utilities');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.detail__title')?.textContent).toContain('Utilities');
    expect(compiled.textContent).toContain('LiquiSketch');
    expect(compiled.textContent).toContain('Liquibase in, diagrams out');
    const link = compiled.querySelector('.detail__product-link') as HTMLAnchorElement | null;
    expect(link?.getAttribute('href')).toBe('https://github.com/starforge-universe/liquisketch');
  });
});
