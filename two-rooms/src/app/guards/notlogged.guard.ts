import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const notloggedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)

  return localStorage.getItem('logged') ? true : router.navigate(['/login'])
}
