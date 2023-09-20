import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-update-pregunta',
  templateUrl: './update-pregunta.component.html',
  styleUrls: ['./update-pregunta.component.css'],
})
export class UpdatePreguntaComponent implements OnInit {
  preguntaId: any;
  pregunta: any;
  examen: any;

  opcionesRespuesta: any = [];

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.preguntaId = this.route.snapshot.params['preguntaId'];
    this.preguntaService.obtnerPregunta(this.preguntaId).subscribe(
      (data: any) => {
        this.pregunta = data;

        //asigno valores al dropdown
        this.opcionesRespuesta = [
          { label: this.pregunta.opcion1, value: this.pregunta.opcion1 },
          { label: this.pregunta.opcion2, value: this.pregunta.opcion2 },
          { label: this.pregunta.opcion3, value: this.pregunta.opcion3 },
          { label: this.pregunta.opcion4, value: this.pregunta.opcion4 },
        ];
        console.log(this.pregunta);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualiarDatosPregunta() {
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe(
      (res) => {
        console.log(this.pregunta);
        this.messageService.add({
          severity: 'success',
          summary: 'Pregunta Actualizado',
          detail: 'La Pregunta ha sido actualizada con exito.',
        });
        this.router.navigate([
          '/admin/ver-preguntas/' +
            this.pregunta.examen.examenId +
            '/' +
            this.pregunta.examen.titulo,
        ]);
      },
      (error) => {
        console.log(this.pregunta);
        this.messageService.add({
          severity: 'error',
          summary: 'Error Actualizar Pregunta',
          detail: 'Ha ocurrido un error al actualizar la pregunta',
        });
        console.log(error);
      }
    );
  }
}
