import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    // Intercepta todas las solicitudes HTTP y agrega el token de autenticación en el encabezado de autorización.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.loginService.getToken(); // Obtiene el token de autenticación del servicio de autenticación.
        if (token != null) {
            // Clona la solicitud original y agrega el token de autenticación al encabezado de autorización.
            authReq = authReq.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        // Pasa la solicitud modificada al siguiente manejador en la cadena de interceptores.
        return next.handle(authReq);
    }
}

// Proveedor del interceptor para que Angular lo utilice.
export const AuthInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true // Indica que puede haber múltiples interceptores HTTP.
    }
]
