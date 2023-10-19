import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/common/shared.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SessaoService } from './sessao.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
];

@NgModule({
    declarations: [
        LoginComponent,
        CadastroComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        SessaoService
    ]
})
export class SessaoModule { }
