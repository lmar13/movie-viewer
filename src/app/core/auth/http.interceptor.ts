import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer FAKE_TOKEN_123`,
    },
  });
  return next(cloned);
};
