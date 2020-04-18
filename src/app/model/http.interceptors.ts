import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RefreshTokenInterceptor } from '../core/token-interceptor.service';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
];