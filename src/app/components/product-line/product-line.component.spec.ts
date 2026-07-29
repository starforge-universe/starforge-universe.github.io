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

  it('should render Project Templating hierarchy with DevOps Template children', async () => {
    const fixture = await setup('project-templating');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('DevOps Template');
    expect(compiled.textContent).toContain('Spring Template');
    expect(compiled.textContent).toContain('Terraform Template');
    expect(compiled.textContent).toContain('Database Template');
    expect(compiled.querySelector('#devops-template')).toBeTruthy();
    expect(compiled.querySelector('#spring-template')).toBeTruthy();
    expect(compiled.querySelector('#python-library-template')).toBeTruthy();
    expect(compiled.querySelector('#spring-function-template')).toBeTruthy();
    expect(compiled.querySelector('#app-tap-template')).toBeTruthy();
    expect(compiled.textContent).toContain('Retired');
    expect(compiled.textContent).toContain('Spring Library Template');
    expect(compiled.querySelector('.detail__composed-label')?.textContent?.trim()).toBe(
      'Composed from'
    );
    expect(compiled.querySelector('.detail__composed')?.textContent).toContain(
      'Terraform Template'
    );
    expect(compiled.querySelector('.detail__composed')?.textContent).toContain(
      'Angular Webapp Template'
    );
    expect(compiled.querySelector('.detail__composed')?.textContent).toContain(
      'Python Function Template'
    );
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
