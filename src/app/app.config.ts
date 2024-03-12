import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

import { ErrorInterceptor, JwtInterceptor, fakeBackendProvider } from './core/helpers';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

     fakeBackendProvider
  ]
};
