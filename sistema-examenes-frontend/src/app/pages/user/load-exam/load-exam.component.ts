import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen/examen.service';

@Component({
  selector: 'app-load-exam',
  templateUrl: './load-exam.component.html',
  styleUrls: ['./load-exam.component.css'],
})
export class LoadExamComponent implements OnInit {
  catId: any;
  examenes: any;

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log('Cargando los examenes');
        this.examenService.obtenerExamenesActivos().subscribe(
          (res) => {
            this.examenes = res;
            console.log(this.examenes);
          },
          (error) => console.log(error)
        );
      } else {
        console.log('Cargando un examen en especifico');
        this.examenService.obtenerExamenesActivosDeUnaCategoria(this.catId).subscribe(
          (res) => {
            this.examenes = res;
            console.log(this.examenes);
          },
          (error) => console.log(error)
        );
      }
    });
  }
}
