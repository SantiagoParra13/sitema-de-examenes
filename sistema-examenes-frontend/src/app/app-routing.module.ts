import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guards/admin/admin.guard';
import { NormalGuard } from './services/guards/user/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/categorias/view-categories/view-categories.component';
import { AddCategorieComponent } from './pages/admin/categorias/add-categorie/add-categorie.component';
import { ViewExamenComponent } from './pages/admin/examenes/view-examen/view-examen.component';
import { AddExamenComponent } from './pages/admin/examenes/add-examen/add-examen.component';
import { UpdateExamComponent } from './pages/admin/examenes/update-exam/update-exam.component';
import { ViewExamenPreguntasComponent } from './pages/admin/preguntas/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/preguntas/add-pregunta/add-pregunta.component';
import { UpdatePreguntaComponent } from './pages/admin/preguntas/update-pregunta/update-pregunta.component';
import { LoadExamComponent } from './pages/user/load-exam/load-exam.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { StartExamenComponent } from './pages/user/start-examen/start-examen.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {path: 'user-dashboard',component: UserDashboardComponent,  canActivate: [NormalGuard],children: [
      {path:':catId', component:LoadExamComponent },
      {path:'instrucciones/:examenId', component:InstruccionesComponent },
  ]},
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', component: WelcomeComponent },
      { path: 'categories', component: ViewCategoriesComponent },
      { path: 'add-categorie', component: AddCategorieComponent },
      { path: 'examenes', component: ViewExamenComponent },
      { path: 'add-examen', component: AddExamenComponent },
      { path: 'examen/:examenId', component: UpdateExamComponent },
      {path: 'ver-preguntas/:examenId/:titulo',component: ViewExamenPreguntasComponent,},
      {path: 'add-pregunta/:examenId/:titulo',component: AddPreguntaComponent,},
      { path: 'pregunta/:preguntaId', component: UpdatePreguntaComponent },
    ],
  },
  {path:'start/:examenId', component:StartExamenComponent, canActivate:[NormalGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
