import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppErrorHandler } from '../handlerror/app-error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private appErrhandle: AppErrorHandler) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.appErrhandle.handleError(err);
          }
        }
      })
    );
  }
}
