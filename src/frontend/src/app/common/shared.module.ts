import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getBrPaginatorIntl } from './intl/br.intl';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        HttpClientModule,
        MatPaginatorModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },
    ]
})
export class SharedModule { }