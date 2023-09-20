import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  constructor(private http: HttpClient) {}

  listarCuestionarios(): Observable<any> {
    return this.http.get(`${baseUrl}/examen/`);
  }

  agregarExamen(examen: any): Observable<any> {
    return this.http.post(`${baseUrl}/examen/`, examen);
  }

  eliminarExamen(examenId: any): Observable<any> {
    return this.http.delete(`${baseUrl}/examen/${examenId}`);
  }

  obtenerExamen(examenId: any): Observable<any> {
    return this.http.get(`${baseUrl}/examen/${examenId}`);
  }

  actualizarExamen(examenId: any, examen: any): Observable<any> {
    return this.http.put(`${baseUrl}/examen/${examenId}`, examen);
  }
  listarExamenesDeUnaCategoria(categoriaId: any) {
    return this.http.get(`${baseUrl}/examen/categoria/${categoriaId}`);
  }

  obtenerExamenesActivos() {
    return this.http.get(`${baseUrl}/examen/activo/`);
  }

  obtenerExamenesActivosDeUnaCategoria(categoriaId: any) {
    return this.http.get(`${baseUrl}/examen/categoria/activo/${categoriaId}`);
  }
}
