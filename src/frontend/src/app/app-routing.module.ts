import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages

import {LoginComponent} from './modules/usuarios/pages/login/login.component'

const routes: Routes = [
  {path: "", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
