import { Routes } from '@angular/router';
import { isloggedGuard } from './guards/islogged.guard';
import { notloggedGuard } from './guards/notlogged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent,
      ),
    canActivate: [notloggedGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    canActivate: [isloggedGuard],
  },
  {
    path: 'booking',
    loadComponent: () =>
      import('./components/book/book.component').then(
        (mod) => mod.BookComponent,
      ),
    canActivate: [notloggedGuard],
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./components/registration/registration.component').then(
        (mod) => mod.RegistrationComponent,
      ),
    canActivate: [isloggedGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    canActivate: [isloggedGuard],
  },
];
