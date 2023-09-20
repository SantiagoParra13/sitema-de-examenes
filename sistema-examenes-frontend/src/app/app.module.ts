import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes Propios
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/categorias/view-categories/view-categories.component';
import { AddCategorieComponent } from './pages/admin/categorias/add-categorie/add-categorie.component';
import { ViewExamenComponent } from './pages/admin/examenes/view-examen/view-examen.component';
import { AddExamenComponent } from './pages/admin/examenes/add-examen/add-examen.component';
import { UpdateExamComponent } from './pages/admin/examenes/update-exam/update-exam.component';
import { ViewExamenPreguntasComponent } from './pages/admin/preguntas/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/preguntas/add-pregunta/add-pregunta.component';
import { UpdatePreguntaComponent } from './pages/admin/preguntas/update-pregunta/update-pregunta.component';
import { SidebarComponent as UserSidebar } from './pages/user/sidebar/sidebar.component';

// Componentes de PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AuthInterceptorProviders } from './services/auth.interceptors';
import { LoadExamComponent } from './pages/user/load-exam/load-exam.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { StartExamenComponent } from './pages/user/start-examen/start-examen.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { KnobModule } from 'primeng/knob';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategorieComponent,
    ViewExamenComponent,
    AddExamenComponent,
    UpdateExamComponent,
    ViewExamenPreguntasComponent,
    AddPreguntaComponent,
    UpdatePreguntaComponent,
    UserSidebar,
    LoadExamComponent,
    InstruccionesComponent,
    StartExamenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    SidebarModule,
    TableModule,
    CardModule,
    MenuModule,
    FieldsetModule,
    DividerModule,
    InputTextareaModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    ConfirmDialogModule,
    AccordionModule,
    TabViewModule,
    RadioButtonModule,
    PaginatorModule,
    KnobModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    ProgressBarModule
  ],
  providers: [MessageService, ConfirmationService, AuthInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
