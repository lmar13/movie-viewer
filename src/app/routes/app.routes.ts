import { Routes } from '@angular/router';
import { DetailsComponent } from '../components/details/details.component';
import { ListContainerComponent } from '../pages/list/list-container.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListContainerComponent, children: [{ path: ':movieId', component: DetailsComponent }] },
];
