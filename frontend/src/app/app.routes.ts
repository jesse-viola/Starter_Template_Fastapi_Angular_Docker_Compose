import { Routes } from '@angular/router';
import { FavoritesComponent } from './features/favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: '/favorites', pathMatch: 'full' },
  { path: 'favorites', component: FavoritesComponent },
  // Add more routes here as needed
  // { path: 'products', component: ProductsComponent },
  // { path: 'about', component: AboutComponent },
];
