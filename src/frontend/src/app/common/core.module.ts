import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe, PercentPipe, registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask';

// ANGULAR LOCALE
registerLocaleData(localePtBr, 'pt');

// FORM FIELD CONFIG
const MatFormFieldAppearance: MatFormFieldDefaultOptions = {
    floatLabel: 'auto',
    appearance: 'outline'
};

// DEFAULT CURRENCY MASK
const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

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
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MatFormFieldAppearance },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ]
})
export class CoreModule { }
