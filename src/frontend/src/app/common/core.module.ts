import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ]
})
export class CoreModule { }
