import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  CatalogProduct,
  ProductLine,
  getProductLine,
  resolveComposedProducts
} from '../../data/product-lines';

@Component({
  selector: 'app-product-line',
  imports: [RouterLink],
  templateUrl: './product-line.component.html',
  styleUrl: './product-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLineComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' }
  );

  readonly product = computed(() => getProductLine(this.slug()));

  composedParts(line: ProductLine, item: CatalogProduct): readonly CatalogProduct[] {
    return resolveComposedProducts(line, item);
  }
}
