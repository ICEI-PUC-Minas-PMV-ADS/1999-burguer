import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe, PercentPipe, registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';

// ANGULAR LOCALE
registerLocaleData(localePtBr, 'pt');

@NgModule({
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        PercentPipe,
        CurrencyPipe,
        DecimalPipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
    ]
})
export class CoreModule { }
