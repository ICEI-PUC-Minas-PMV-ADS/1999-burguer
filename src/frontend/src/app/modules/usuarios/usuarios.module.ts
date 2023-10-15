import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';



@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    EditUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UsuariosModule { }
