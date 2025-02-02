import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render elements`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent)
      .toContain(`404 - Page Not Found`);
    expect(compiled.querySelector('p').textContent)
      .toContain(`The page you are looking for does not exist.`);
  });

});
