import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PRODUCT_LINES } from '../../data/product-lines';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-site-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteNavComponent {
  readonly themeService = inject(ThemeService);
  readonly productLines = PRODUCT_LINES;
}
