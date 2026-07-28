import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductLineComponent } from './components/product-line/product-line.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lines/:slug', component: ProductLineComponent },
  { path: '**', component: PageNotFoundComponent }
];
