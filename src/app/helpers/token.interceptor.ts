import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {AuthService} from "../core/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
      request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      let newRequest: HttpRequest<any> = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("comicshop")}`,
        },
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
