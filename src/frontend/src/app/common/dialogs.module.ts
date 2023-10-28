import { NgModule } from '@angular/core';

import { DialogComponent } from './components/dialog/dialog.dialog';
import { PerguntaDialogComponent } from './components/dialog-pergunta/dialog-pergunta.dialog';
import { SharedModule } from './shared.module';
import { DialogService } from './services/dialog.service';

const components = [
    DialogComponent,
    PerguntaDialogComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        components
    ],
    providers: [
        DialogService
    ]
})
export class DialogsModule { }