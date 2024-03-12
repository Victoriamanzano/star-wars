import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const usersKey = 'starwars-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()

export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
         return handleRoute();

    function handleRoute() {
         switch (true) {
          case url.endsWith('/users/authenticate') && method === 'POST':
            return authenticate();
          case url.endsWith('/users/register') && method === 'POST':
            return register();
              default:
               return next.handle(request);
           }
        }

    function authenticate() {
        const { username, password } = body;
        const user = users.find(x => x.username === username && x.password === password);
          if (!user) return error('Authentication error: The username or password is not valid.');
            return correct({...basicDetails(user), token: 'fake-jwt-token'})
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('The selected username "' + user.username + '" is unavailable, as it\'s already taken.')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return correct();
        }

        function correct(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user: any) {
            const { id, username, firstName, lastName } = user;
            return { id, username, firstName, lastName };
        }
    }
}

export const fakeBackendProvider = {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true};
