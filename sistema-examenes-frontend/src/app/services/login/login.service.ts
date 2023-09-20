import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../helper'; // Asumo que 'baseUrl' es una variable definida en un archivo 'helper'.
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Indica que este servicio estará disponible en toda la aplicación.
})
export class LoginService {
  loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // Realiza una solicitud HTTP para generar un token de autenticación basado en 'loginData'.
  generarToke(loginData: any): Observable<any> {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Almacena el token de autenticación en el Local Storage del navegador.
  loginUser(token: any) {
    localStorage.setItem('token', token);
  }

  // Comprueba si el usuario ha iniciado sesión al verificar la existencia del token en el Local Storage.
  isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == null || tokenStr == '') {
      return false; // No se encontró un token en el Local Storage, el usuario no ha iniciado sesión.
    }
    return true; // Se encontró un token en el Local Storage, el usuario ha iniciado sesión.
  }

  // Cierra la sesión del usuario eliminando el token y los datos del usuario del Local Storage.
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true; // Indica que la operación de cierre de sesión fue exitosa.
  }

  // Obtiene el token de autenticación almacenado en el Local Storage.
  getToken() {
    return localStorage.getItem('token');
  }

  // Almacena los datos del usuario en formato JSON en el Local Storage.
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtiene los datos del usuario almacenados en el Local Storage y los devuelve como objeto JSON.
  getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      const user = JSON.parse(userStr);
      return user || {}; // Devuelve un objeto vacío si 'user' es null o undefined.
    } else {
      this.logout();
      return {}; // Devuelve un objeto vacío si no se encuentra información del usuario.
    }
  }

  // Obtiene el rol del usuario a partir de los datos almacenados en el Local Storage.
  getUserRole() {
    let user = this.getUser();
    if (user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    } else {
      console.log('no tiene authoridades asignadas');
    }
  }

  // Realiza una solicitud HTTP para obtener información del usuario actual.
  getCurrentUser() {
    return this.http.get(`${baseUrl}/actual-usuario`);
  }



}
