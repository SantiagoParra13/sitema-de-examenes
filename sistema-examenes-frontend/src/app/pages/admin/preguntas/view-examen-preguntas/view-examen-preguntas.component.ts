import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ExamenService } from 'src/app/services/examen/examen.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css'],
})
export class ViewExamenPreguntasComponent implements OnInit {
  examenId: any;
  titulo: any;
  preguntas: any = [];

  constructor(
    private route: ActivatedRoute,
    private preguntasService: PreguntaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private examenService:ExamenService
  ) {}

  ngOnInit(): void {
    // Obtén los parámetros de la ruta solo si están definidos
    const routeParams = this.route.snapshot.params;

    if (routeParams.hasOwnProperty('examenId') && routeParams.hasOwnProperty('titulo')) {
      this.examenId = routeParams['examenId'];
      this.titulo = routeParams['titulo'];
      this.listarPreguntas();
    } else {
      // Maneja el caso en el que los parámetros no están definidos
      console.log('Los parámetros examenId y titulo no están definidos en la ruta.');
    }
  }

  eliminarPregunta(preguntaId: any) {
    this.confirmationService.confirm({
      message: 'Quieres eliminar esta pregunta?',
      header: 'Confirmar Eliminacion',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.preguntasService.eliminarPregunta(preguntaId).subscribe(
          (res) => {
            this.preguntas = this.preguntas.filter((pregunta:any) => pregunta.preguntaId != preguntaId)
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Se ha  Eliminado La Pregunta  Correctamente',
            });
           
          },
          (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al Eliminar Pregunta',
            });
          }
        );
      },
      reject: (type: ConfirmEventType) => {
        // Usa ConfirmEventType como una enumeración
        switch (type) {
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelado',
              detail: 'Eliminacion de Pregunta Cancelada',
            });
            break;
        }
      },
    });
  }
  listarPreguntas(){
    
    this.preguntasService.listarPreguntasDelExamen(this.examenId).subscribe(
      (res) => {
        console.log(res);
        this.preguntas = res;
      },
      (error) => console.log(error)
    );
  }


}
