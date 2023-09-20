import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users: any[] = [];

  constructor(private service:LoginService, private router:Router){}

  
  ngOnInit() {
    // Verifica si el usuario está autenticado antes de llamar al servicio
    if (this.service.isLoggedIn()) {
      this.service.getCurrentUser().subscribe(res => {
        this.users = [res];
      });
    } else {
      this.router.navigate(['login'])
    }
  }
}
