import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getBrPaginatorIntl } from './intl/br.intl';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatPaginatorModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },
    ]
})
export class SharedModule { }