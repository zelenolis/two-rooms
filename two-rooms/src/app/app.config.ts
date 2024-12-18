import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideAnimations } from "@angular/platform-browser/animations"
import { provideStore } from "@ngrx/store"

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { requestsInterceptor } from './interceptors/requests.interceptor'
import { bookReducer } from './store/reducer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideStore({ books: bookReducer }),
    provideHttpClient(withInterceptors([requestsInterceptor])),
  ],
}
