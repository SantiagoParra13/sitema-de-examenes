import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: any[] = [];
  isLoggedIn: boolean = false; // Variable para almacenar el estado de autenticación
  items: any[] = []; // Arreglo para los elementos del menú

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // Verificar la autenticación al cargar la página
    this.isLoggedIn = this.loginService.isLoggedIn();

    // Obtener el usuario actual si está autenticado
    if (this.isLoggedIn) {
      this.loginService.getCurrentUser().subscribe((res) => {
        this.user = [res]; // Almacenar la información del usuario
        this.updateItems(); // Actualizar los elementos del menú
      });
    } else {
      this.updateItems(); // Si no está autenticado, actualizar los elementos del menú
    }
  }

  // Función para actualizar los elementos del menú
  updateItems() {
    this.items = [
      {
        label: 'Bienvenido al portal de exámenes',
        icon: 'pi pi-book',
        routerLink: '/',
      },
      {
        label: this.isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión',
        icon: 'pi pi-user',
        command: () => {
          if (this.isLoggedIn) {
            this.cerrarSesion(); // Llamar a la función para cerrar sesión
          } else {
            window.location.href = '/login'; // Redirigir a la página de inicio de sesión
          }
        },
        styleClass: 'min-w-max',
      },
      {
        label: this.isLoggedIn ? this.user[0].nombre : '', // Mostrar el nombre del usuario si está autenticado
        routerLink: '/admin/profile',
        styleClass: 'menu-item',
      },
      {
        label: 'Registrarse',
        icon: 'pi pi-user-plus ',
        routerLink: '/signup',
        styleClass: 'menu-item',
      },
    ];
  }

  // Función para cerrar sesión
  cerrarSesion() {
    // Realizar las acciones de cierre de sesión, como eliminar el token de autenticación
    this.loginService.logout();

    // Redirigir a la página de inicio de sesión o recargar la página si es necesario
    window.location.href = '/login';
  }
}
