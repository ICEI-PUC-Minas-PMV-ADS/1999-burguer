import { NgModule } from '@angular/core';

import { CoreModule } from './common/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthLayoutComponent } from './common/layouts/auth/auth-layout.component';
import { NoAuthLayoutComponent } from './common/layouts/no-auth/no-auth-layout.component';
import { DialogsModule } from './common/dialogs.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        NoAuthLayoutComponent,
        HeaderComponent,
    ],
    imports: [
        CoreModule,
        DialogsModule,
        NgxSpinnerModule,
        AppRoutingModule,
    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
