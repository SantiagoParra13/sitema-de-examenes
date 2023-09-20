import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categorias: any = [];

  constructor(private listarCategoria: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategoria.listarCategorias().subscribe(
      (res) => {
        this.categorias = res;
      },
      (error) => console.log(error)
    );
  }
}
