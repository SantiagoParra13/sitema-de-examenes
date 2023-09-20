import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private login:LoginService){}
  items: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/admin' },
    { label: 'Perfil', icon: 'pi pi-user', routerLink: '/admin/profile' },
    { label: 'Categorias', icon: 'pi pi-list', routerLink: '/admin/categories' },
    { label: 'Agregar Categoria', icon: 'pi pi-plus', routerLink: '/admin/add-categorie' },
    { label: 'Cuestionarios', icon: 'pi pi-book', routerLink: '/admin/examenes' },
    { label: 'Agregar Cuestionario', icon: 'pi pi-plus-circle', routerLink: '/admin/add-examen' },
    { label: 'Salir', icon: 'pi pi-sign-out', command: () => this.salir() }
  ];

  salir(){
    this.login.logout();
    window.location.reload();
  }
}
