import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/registerUser/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private fb:FormBuilder, private serviceApi:UserService,private messageService: MessageService, private router:Router){}

  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required], 
    telefono: ['', Validators.required]
  });


  registrarUsuario() {
    this.serviceApi.añadirUsuario(this.userForm.value).subscribe(
      (res) => {
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario Registrado Con Exito' });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); 
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Registrar Usuario' });
      }
    );
  }
  

}
