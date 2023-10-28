import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/common/shared.module';
import { LoginComponent } from './login/login.component';
import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha/esqueci-minha-senha.component';
import { SessaoService } from './sessao.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'esqueci-minha-senha', component: EsqueciMinhaSenhaComponent },
];

@NgModule({
    declarations: [
        LoginComponent,
        EsqueciMinhaSenhaComponent,
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
