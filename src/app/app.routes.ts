import { Routes } from '@angular/router';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: DisplayUsersComponent, title: 'Users' },
  { path: 'users/:id', component: UserDetailsComponent, title: 'User details' },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
