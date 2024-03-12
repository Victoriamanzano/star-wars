import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/core/environments/environment';
import { AccountService } from '@app/core/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userValue;
        const loggedIn = user?.token;
        const urlApi = request.url.startsWith(environment.apiUrl);
        if (loggedIn && urlApi) {
            request = request.clone({setHeaders: { Authorization: `Bearer ${user.token}`}});
        }

        return next.handle(request);
    }
}
