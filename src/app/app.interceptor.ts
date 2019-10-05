// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/service/authentication.service';
import { TokenManager } from './shared/services/token-manager.service';
import { ToasterService } from './shared/services/toaster.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthenticationService,
    private tokenManager: TokenManager,
    private toaster: ToasterService
  ) {  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //debugger;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenManager.fetchToken()}`
      }
    });
    return next.handle(request);
  }
}