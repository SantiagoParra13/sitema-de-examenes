import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categorias: any;
  items:any;
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe((res) => {
      this.categorias = res;

      this.items = [
        { label: 'Inicio', icon: 'pi pi-home', routerLink: '/user-dashboard/0' },
        {
          label: 'Examenes',
          icon: 'pi pi-book',
          items: this.categorias.map((categoria:any) => ({
            label: categoria.titulo,
            routerLink: `/user-dashboard/${categoria.categoriaId}`, // Ajusta la ruta según tus necesidades
          })),
        },
        // ... otros elementos del menú
      ];
    });
  }
}
