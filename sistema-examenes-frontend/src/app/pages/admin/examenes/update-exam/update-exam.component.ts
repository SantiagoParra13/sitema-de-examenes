import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ExamenService } from 'src/app/services/examen/examen.service';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css'],
})
export class UpdateExamComponent implements OnInit {
  examenId = 0;
  examenData: any;
  categoriasData: any;
  examenForm: any;

  constructor(
    private route: ActivatedRoute,
    private servicioExamen: ExamenService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.servicioExamen.obtenerExamen(this.examenId).subscribe(
      (res) => {
        this.examenData = res;
        console.log(this.examenData);
      },
      (error) => console.log(error)
    );

    this.categoriaService.listarCategorias().subscribe(
      (res: any) => {
        this.categoriasData = res;
        console.log(this.categoriasData);
      },
      (error) => console.log(error + 'cargar categorias')
    );
  }

  actulaizarDatos(){
    this.servicioExamen.actualizarExamen(this.examenId,this.examenData).subscribe(res =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Examen Actualizado Con exito' });
      setTimeout(() => {
        this.router.navigate(['/admin/examenes']);
      }, 500);
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Actualizar el examen' });
    })
  }
}







