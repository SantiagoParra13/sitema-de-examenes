import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private loginService: LoginService,
    private router:Router
  ) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  async login() {
    console.log('click' + this.loginForm.value);
    if (this.loginForm.invalid) {
      // Validación fallida, mostrar un toast de error
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos correctamente.',
      });
      return;
    }

    try {
      const res = await this.loginService.generarToke(this.loginForm.value).toPromise();
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Inicio de sesión exitoso.',
      });
      console.log(res);
      // Establecer el token en el local storage
      this.loginService.loginUser(res.token);
      // Obtener el usuario en la sesión
      const user: any = await this.loginService.getCurrentUser().toPromise();
      this.loginService.setUser(user);
      console.log(user);
      const userRole = this.loginService.getUserRole();
      if (userRole === 'ADMIN') {
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000); // 2000 milisegundos = 2 segundos
        this.loginService.loginStatusSubject.next(true);
      } else if (userRole === 'NORMAL') {
        setTimeout(() => {
          this.router.navigate(['/user-dashboard/0']);
        }, 2000); 
        this.loginService.loginStatusSubject.next(true);
      } else {
        this.loginService.logout();
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      console.error('Error de inicio de sesión:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Inicio de sesión fallido. Verifique sus credenciales.',
      });
    }
  }
}
