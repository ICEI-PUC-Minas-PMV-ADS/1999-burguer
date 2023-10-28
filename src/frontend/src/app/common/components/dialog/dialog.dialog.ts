import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import * as $ from 'jquery';

import { MatButton } from '@angular/material/button';
import { DialogInputFormat } from '../../services/dialog.service';
import forEach from 'lodash-es/forEach';


/**
 * This component renders the contacts submodule.
 *
 * On the left is the list of contacts.
 * On the right is the ui-view viewport where contact details appear.
 */
@Component({
    templateUrl: './dialog.dialog.html',
    styleUrls: ['./dialog.dialog.scss']
})
export class DialogComponent implements OnInit {

    title: string;
    message: string;
    type: DialogType;
    btnCancelText: string = "Cancelar";
    btnOkText: string = "Ok";
    placeholder: string = "";
    hideCloseButton: boolean = false;
    inputFormat: DialogInputFormat;
    focusConfirmar: boolean;

    inputControl: FormControl;

    enumDialogType = DialogType;

    @ViewChild('butConfimar') butConfimar: MatButton;
    @ViewChild('butCancelar') butCancelar: MatButton;
    @HostBinding('class') classList: string = '';

    arrNavBotoes: string[] = ['butCancelar', 'butConfirmar'];

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.cancel()
    }

    ngOnInit(): void {
        forEach(this.data, (value, key) => {
            this[key] = value;
        });
        if (this.type == DialogType.Input) {
            this.inputControl = new FormControl('', [
                Validators.required
            ]);
        } else {
            this.dialogRef.afterOpened().subscribe(() => {
                setTimeout(() => {
                    this.butConfimar.focus();
                }, 100);
            });
        }
    }

    getClass(): any {
        switch (this.type) {
            case DialogType.Input:
            case DialogType.Alert:
            case DialogType.Confirm:
                return;
            case DialogType.Error:
                this.classList = "error";
        }
    }

    ok() {
        if (this.type == DialogType.Input) {
            if (this.inputControl.valid) {
                this.dialogRef.close(this.inputControl.value);
            }
        } else {
            this.dialogRef.close(true);
        }
    }

    cancel() {
        this.dialogRef.close(false);
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        if (this.type != DialogType.Confirm) return;
        let target = $(event.target);
        let targetId: string = target.attr('id') || target.prop('tagName').toLowerCase();
        if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
            if (targetId == "butCancelar") {
                this.butConfimar.focus();
            } else {
                this.butCancelar.focus();
            }
        }
    }

}

export enum DialogType {
    Alert,
    Error,
    Confirm,
    Input,
    Question
}