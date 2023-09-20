import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen/examen.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css'],
})
export class InstruccionesComponent implements OnInit {
  examenId: any;
  examen: any = new Object();
  activeIndex: number | undefined;

  constructor(
    private examenService: ExamenService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).subscribe(
      (res) => {
        console.log(res);
        this.examen = res;
      },
      (error) => console.log(error)
    );
  }

  empezarExamen() {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas iniciar el examen?',
      header: 'Inicar Examen',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Comenzando Examen',
        });
        this.router.navigate(['/start/' + this.examenId]);
      },
      reject: (type: any) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'YIncio de Examen cancelado',
        });
      },
    });
  }
}
