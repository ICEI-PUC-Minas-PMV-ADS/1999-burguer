import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { DialogComponent, DialogType } from '../components/dialog/dialog.dialog';
import get from 'lodash-es/get';
import { PerguntaDialogComponent } from '../components/dialog-pergunta/dialog-pergunta.dialog';

//Para um serviço ser injetável tem que colocar esse decorator
@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private filaDialogs: Array<MatDialogRef<any>> = new Array<MatDialogRef<any>>();

    public static ultimoDialog: MatDialogRef<any>;
    public static dialogAberto: boolean = false;

    //Exemplo de injeção de servicos
    constructor(
        private _dialog: MatDialog,
        private snackbar: MatSnackBar
    ) {

        this._dialog.afterAllClosed.subscribe(() => {
            DialogService.dialogAberto = false;
            DialogService.ultimoDialog = null;
        });

        this._dialog.afterOpened.subscribe((dialog: MatDialogRef<any>) => {
            this.filaDialogs.push(dialog);
            DialogService.ultimoDialog = dialog;
            dialog.afterClosed().subscribe(() => {
                this.filaDialogs.pop();
                DialogService.ultimoDialog = this.filaDialogs[this.filaDialogs.length - 1];
            });
            DialogService.dialogAberto = true;
        });

    }

    public showToast(msg, action?, position = 'right', duration = 3000) {
        this.snackbar.open(msg, action, {
            horizontalPosition: position as MatSnackBarHorizontalPosition,
            duration: duration
        });
    }

    protected default(options: DialogParams, dialogConfig: MatDialogConfig = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            dialogConfig.data = options;
            dialogConfig.minWidth = dialogConfig.minWidth = "300px";
            dialogConfig.disableClose = true;
            dialogConfig.panelClass = 'dialog-default';
            let dialogRef = this._dialog.open(DialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }, reject);
        });
    }

    public alert(message: string, title: string = "Atenção", dialogConfig: DialogParams = {}): Promise<any> {
        dialogConfig.title = title;
        dialogConfig.message = message;
        dialogConfig.type = DialogType.Alert;
        return this.default(dialogConfig).then(() => {
            return Promise.resolve(true);
        }).catch((err) => {
            if (err) return Promise.reject(err);
            return Promise.resolve(false);
        });
    }

    public confirm(message: string, title: string = "Confirmar", focusConfirmar: boolean = false, dialogConfig: DialogParams = {}): Promise<any> {
        dialogConfig.title = title;
        dialogConfig.message = message;
        dialogConfig.focusConfirmar = focusConfirmar;
        dialogConfig.type = DialogType.Confirm;
        return this.default(dialogConfig);
    }

    public error(message: any, title: string = "Erro", dialogConfig: DialogParams = {}): Promise<any> {
        if (typeof message == "object") {
            message = get(message, 'error.message', null) || get(message, 'message', message) || get(message, 'error.error', null) || get(message, 'error', null);
        }
        if (typeof message == "object") {
            message = "Por favor verifique sua conexão com a internet!";
        }
        dialogConfig.title = title;
        dialogConfig.message = message;
        dialogConfig.type = DialogType.Error;
        return this.default(dialogConfig);
    }

    public question(message: string, title?: string, buttonCancel?: string, buttonOk?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let dialogRef = this._dialog.open(PerguntaDialogComponent, {
                panelClass: 'dialog-default',
                disableClose: false,
                minWidth: "300px",
                data: {
                    message,
                    title,
                    buttonCancel,
                    buttonOk
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result == 'true') {
                    resolve(true);
                } else if (result == 'false') {
                    resolve(false);
                } else {
                    reject();
                }
            }, reject);
        });
    }
}

export interface DialogParams {
    title?: string;
    message?: string;
    type?: DialogType;
    btnCancelText?: string;
    btnOkText?: string;
    hideCloseButton?: boolean;
    placeholder?: string;
    inputFormat?: DialogInputFormat;
    focusConfirmar?: boolean;
}

export enum DialogInputFormat {
    Text = "text",
    Number = "number"
}