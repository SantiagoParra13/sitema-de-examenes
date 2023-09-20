import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css'],
})
export class AddPreguntaComponent implements OnInit {
  preguntaForm: any;
  examenId: any;
  titulo: any;

  opcionesRespuesta: any[] = []; // Propiedad para las opciones del dropdown
  valoresOpciones: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private messageService: MessageService,
    private router:Router
  ) {
    this.preguntaForm = this.fb.group({
      examen: {},
      contenido: ['', Validators.required],
      opcion1: ['', Validators.required],
      opcion2: ['', Validators.required],
      opcion3: ['', Validators.required],
      opcion4: ['', Validators.required],
      respuesta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtén los parámetros de la ruta solo si están definidos
    const routeParams = this.route.snapshot.params;

    if (
      routeParams.hasOwnProperty('examenId') &&
      routeParams.hasOwnProperty('titulo')
    ) {
      this.examenId = routeParams['examenId'];
      this.titulo = routeParams['titulo'];

      // Asegúrate de que 'examen' sea un objeto antes de asignar 'examenId'
      if (!this.preguntaForm.get('examen')) {
        this.preguntaForm.addControl('examen', this.fb.group({}));
      }

      // Asigna 'this.examenId' al objeto 'pregunta' en la propiedad 'examen['examenId']'
      // Esto parece estar relacionado con la configuración de la pregunta y su asociación con un examen
      this.preguntaForm.get('examen').patchValue({ examenId: this.examenId });
    } else {
      // Maneja el caso en el que los parámetros no están definidos
      console.log(
        'Los parámetros examenId y titulo no están definidos en la ruta.'
      );
    }

    // Escuchar cambios en los campos de entrada y actualizar las etiquetas de las opciones del dropdown
    this.preguntaForm.valueChanges.subscribe((formValue: any) => {
      // Actualizar las etiquetas de las opciones del dropdown
      this.opcionesRespuesta = [
        { label: formValue.opcion1, value: formValue.opcion1 },
        { label: formValue.opcion2, value: formValue.opcion2 },
        { label: formValue.opcion3, value: formValue.opcion3 },
        { label: formValue.opcion4, value: formValue.opcion4 },
      ];

      // Actualizar los valores de las opciones
      this.valoresOpciones = [
        formValue.opcion1,
        formValue.opcion2,
        formValue.opcion3,
        formValue.opcion4,
      ];
    });
  }

  guardarPregunta() {
    const preguntaFormValue = this.preguntaForm.value;

    // Validar que los campos requeridos estén llenos
    if (
      !preguntaFormValue.contenido ||
      !preguntaFormValue.opcion1 ||
      !preguntaFormValue.opcion2 ||
      !preguntaFormValue.opcion3 ||
      !preguntaFormValue.opcion4 ||
      !preguntaFormValue.respuesta
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos.',
      });
      return;
    }

    // Si todos los campos están llenos, guardar la pregunta
    this.preguntaService.guardarPregunta(preguntaFormValue).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pregunta Guardada',
          detail: 'Pregunta Guardada con Éxito.',
        });
        this.preguntaForm.reset();
        console.log('ver-preguntas/'+ this.examenId+'/'+this.titulo)
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar Pregunta: ' + error.message, // Puedes mostrar un mensaje de error específico si lo deseas
        });
        console.log(error);
      }
    );
  }
}
