import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen/examen.service';
import { ConfirmationService, MessageService,ConfirmEventType  } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-examen',
  templateUrl: './view-examen.component.html',
  styleUrls: ['./view-examen.component.css'],
})
export class ViewExamenComponent implements OnInit {

  examenes: any[] = [];

  constructor(
    private examenService: ExamenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (res) => {
        this.examenes = res;
        console.log(this.examenes);
      },
      (error) => console.log(error)
    );
  }



eliminarExamen(examenId:any) {
  this.confirmationService.confirm({
    message: 'Quieres eliminar este examen?',
    header: 'Confirmar Eliminacion',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.examenService.eliminarExamen(examenId).subscribe(res =>{
                  this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId)
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha  Eliminado El Examen  Correctamente' });
                 },
                 (error) => {
                  console.error(error);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al Eliminar Examen' });
                })
                },
    reject: (type: ConfirmEventType) => { // Usa ConfirmEventType como una enumeración
      switch (type) {
        case ConfirmEventType.CANCEL:
          this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminacion de Examen Cancelada' });
          break;
      }
    }
  });
}


}



