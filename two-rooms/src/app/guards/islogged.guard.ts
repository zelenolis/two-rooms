import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const isloggedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)

  return localStorage.getItem('logged') ? router.navigate(['']) : true
}
