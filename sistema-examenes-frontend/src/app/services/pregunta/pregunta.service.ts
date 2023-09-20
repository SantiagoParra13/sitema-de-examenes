import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../helper';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  constructor(private http: HttpClient) {}

  listarPreguntasDelExamen(examenId: any) {
    return this.http.get(`${baseUrl}/pregunta/examen/todos/${examenId}`);
  }

  guardarPregunta(pregunta: any) {
    return this.http.post(`${baseUrl}/pregunta/`, pregunta);
  }

  eliminarPregunta(preguntaId: any) {
    return this.http.delete(`${baseUrl}/pregunta/${preguntaId}`);
  }

  actualizarPregunta(pregunta: any) {
    return this.http.put(`${baseUrl}/pregunta/`, pregunta);
  }

  obtnerPregunta(preguntaId: any) {
    return this.http.get(`${baseUrl}/pregunta/${preguntaId}`);
  }

  listarPreguntasDelExamenParaLaPrueba(examenId: any) {
    return this.http.get(`${baseUrl}/pregunta/examen/todos/${examenId}`);
  }

  evaluarExamen(preguntas: any) {
    return this.http.post(`${baseUrl}/pregunta/evaluar-examen`, preguntas);
  }
}
