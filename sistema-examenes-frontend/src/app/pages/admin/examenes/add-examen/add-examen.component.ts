import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ExamenService } from 'src/app/services/examen/examen.service';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css'],
})
export class AddExamenComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private examenService:ExamenService,
    private messageService: MessageService,
    private router:Router
  ) {}



  categorias: any[] = [];

  examenForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    puntosMaximos: ['', Validators.required],
    numeroDePreguntas: ['', Validators.required],
    activo: new FormControl<boolean>(false),
    categoria: ({
      categoriaId: ['']
    })
  });

  

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (res) => {
        this.categorias = res;
        console.log(this.categorias)
      },
      (error) => console.log(error)
    );
  }

  guardarCuestionario(){
    this.examenService.agregarExamen(this.examenForm.value).subscribe(res =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Examen Guardado Con Exito' });
      console.log(this.examenForm.value)
      this.examenForm.reset();
      setTimeout(() => {
        this.router.navigate(['/admin/examenes']);
      }, 2000); // 2000 milisegundos = 2 segundos
      },(error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Guardar Examen' });
      console.log(this.examenForm.value)

      }
    )
    }
    
  }

