import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  listarCategorias():Observable<any>{
    return this.http.get(`${baseUrl}/categoria/`)
  }

  guardarCategoria(categoria :any):Observable<any>{
    return this.http.post(`${baseUrl}/categoria/`,categoria);
  }
}
