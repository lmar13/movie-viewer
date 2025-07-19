import { Routes } from '@angular/router';
import { DetailsComponent } from '../components/details/details.component';
import { ListComponent } from '../pages/list/list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent, children: [{ path: ':movieId', component: DetailsComponent }] },
];
