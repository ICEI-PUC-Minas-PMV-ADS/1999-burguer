import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/common/shared.module';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';
import { UsuarioService } from './usuarios.service';

const routes: Routes = [
    { path: 'editarUsuario', component: EditUsuarioComponent },
];

@NgModule({
    declarations: [
        EditUsuarioComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        UsuarioService
    ]
})
export class UsuariosModule { }
