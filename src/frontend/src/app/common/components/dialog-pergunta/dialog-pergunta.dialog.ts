import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './dialog-pergunta.dialog.html',
    styleUrls: ['./dialog-pergunta.dialog.scss']
})
export class PerguntaDialogComponent {

    title: string;
    message: string;

    buttonCancel: string;
    buttonOk: string;

    constructor(
        public dialogRef: MatDialogRef<PerguntaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.title = data.title || 'Atenção!';
        this.message = data.message || '';

        this.buttonCancel = data.buttonCancel || 'Não';
        this.buttonOk = data.buttonOk || 'Sim';
    }

    cancel() {
        this.dialogRef.close(null);
    }

    ok(res: string) {
        this.dialogRef.close(res);
    }
}