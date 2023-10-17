import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { UsariosService } from './usuarios.service';

const routes: Routes = [

    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'editarUsuario', component: EditUsuarioComponent },

];
@NgModule({
    declarations: [
        LoginComponent,
        CadastroComponent,
        EditUsuarioComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        UsariosService
    ]
})
export class UsuariosModule { }
