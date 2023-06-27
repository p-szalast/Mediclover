import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const footerParagraph: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(footerParagraph.textContent).toContain('Przemysław Szalast, Capgemini Angular School');
  });

  it('should render navigation links', () => {
    const navLinks: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].textContent).toContain('Home');
    expect(navLinks[1].textContent).toContain('New Patient');
  });
});
