import { Routes } from '@angular/router'
import { isloggedGuard } from './guards/islogged.guard'
import { notloggedGuard } from './guards/notlogged.guard'

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
    path: 'registration',
    loadComponent: () =>
      import('./components/registration/registration.component').then(
        (mod) => mod.RegistrationComponent,
      ),
    canActivate: [isloggedGuard],
  },
]
