import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestsInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = new HttpHeaders({
    "Id": "******",
    "Key": "******"
  })
  const cloneRequest = req.clone({headers})
  return next(cloneRequest);
};
