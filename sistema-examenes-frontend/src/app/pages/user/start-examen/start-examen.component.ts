import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-start-examen',
  templateUrl: './start-examen.component.html',
  styleUrls: ['./start-examen.component.css'],
})
export class StartExamenComponent implements OnInit {
  examenId: any;
  preguntas: any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  esEnviado = false;
  timer: number = 0;
  tiempo: any;

  // Propiedades para la paginación
  first = 0; // Página actual
  rows = 1; // Cantidad de preguntas por página
  preguntasPorPagina: any[] = []; // Preguntas en la página actual

  constructor(
    private locationStrategi: LocationStrategy,
    private route: ActivatedRoute,
    private preguntasService: PreguntaService
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.prevenirRetroceder();
    this.cargarPreguntas();
    this.tiempo = this.timer / 60;
  }

  actualizarPreguntasEnPagina() {
    const startIndex = this.first * this.rows;
    this.preguntasPorPagina = this.preguntas.slice(
      startIndex,
      startIndex + this.rows
    );
  }

  tiempoPorcentaje(): number {
    // Calcula el porcentaje de tiempo restante
    return (this.timer / (this.preguntas.length * 2 * 60)) * 100;
  }
  

  // Función para manejar el cambio de página
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.actualizarPreguntasEnPagina();
  }

  cargarPreguntas() {
    this.preguntasService
      .listarPreguntasDelExamenParaLaPrueba(this.examenId)
      .subscribe(
        (res) => {
          console.log(res);
          this.preguntas = res;
          this.timer = this.preguntas.length * 2 * 60;
          this.preguntas.forEach((pregunta: any) => {
            pregunta['respuestaDada'] = '';
          });
          console.log(this.preguntas);
          this.actualizarPreguntasEnPagina();
          this.iniciarTemporizador();
        },
        (error) => console.log(error)
      );
  }
  iniciarTemporizador() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.enviarCuestionario();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  prevenirRetroceder() {
    history.pushState(null, null!, location.href);
    this.locationStrategi.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  isLastPage(): boolean {
    const currentPageIndex = this.first / this.rows;
    const totalPages = Math.ceil(this.preguntas.length / this.rows);
    return currentPageIndex === totalPages - 1;
  }

  enviarCuestionario() {
    this.preguntasService.evaluarExamen(this.preguntas).subscribe(
      (res: any) => {
        console.log(res);
        this.puntosConseguidos = res.puntosMaximos;
        this.respuestasCorrectas = res.respuestasCorrectas;
        this.intentos = res.intentos;
        this.esEnviado = true;
      },
      (error) => console.log(error)
    );

    /* this.esEnviado = true;
    this.preguntas.forEach((pregunta: any) => {
      if (pregunta.respuestaDada == pregunta.respuesta) {
        this.respuestasCorrectas++;
        let puntos = Math.round(
          this.preguntas[0].examen.puntosMaximos / this.preguntas.length
        );
        this.puntosConseguidos += puntos;
      }

      if (pregunta.respuestaDada.trim() != '') {
        this.intentos++;
      }
    });
    console.log('Respuestas Correctas ' + this.respuestasCorrectas);
    console.log('Puntos Conseguidos ' + this.puntosConseguidos);
    console.log('intentos' + this.intentos);
    console.log(this.preguntas);
    */
  }

  obtnerHoraFormateada() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} seg `;
  }

  imprimirResultados() {
    window.print();
  }
}
