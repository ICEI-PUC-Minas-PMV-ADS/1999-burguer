import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { LayoutComponent } from './common/layout/layout.component';
import { HeaderComponent } from './common/components/header/header.component';




@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        UsuariosModule,
        ProdutosModule,
        PedidosModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
