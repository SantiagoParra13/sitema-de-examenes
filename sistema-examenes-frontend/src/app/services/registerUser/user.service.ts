import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../helper';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http:HttpClient) { }

  añadirUsuario(user:any):Observable<any>{
    return this.http.post(`${baseUrl}/usuarios/`,user);
  }
}
