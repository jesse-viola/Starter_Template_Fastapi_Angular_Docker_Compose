import { Routes } from '@angular/router';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { HomepageComponent } from './features/home/homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'favorites', component: FavoritesComponent },
  // Add more routes here as needed
  // { path: 'products', component: ProductsComponent },
  // { path: 'about', component: AboutComponent },
];
