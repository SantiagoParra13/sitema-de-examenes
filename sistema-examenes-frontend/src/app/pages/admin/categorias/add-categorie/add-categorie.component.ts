import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private serviceCategoria:CategoriaService,
    private router:Router
  ) {}

  categoriaForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  guardarCategoria(){
    this.serviceCategoria.guardarCategoria(this.categoriaForm.value).subscribe(  (res) => {
      console.log(res);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha Agregado La Categoria Correctamente' });
      this.router.navigate(['/admin/categories'])

    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Guardar Categoria' });
    }
  );
  }

}
