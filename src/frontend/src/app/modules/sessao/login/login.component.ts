import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { SessaoService } from '../sessao.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public formAuth: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    msgError!: string;

    constructor(
        private sessaoService: SessaoService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    submitForm() {

        if (this.formAuth.invalid) {
            this.msgError = 'Formulário inválido!';
            this.formAuth.markAllAsTouched();
            return;
        }

        this.sessaoService.sign({
            email: this.formAuth.value.email,
            password: this.formAuth.value.password
        })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
            next: (res) => {

                localStorage.removeItem('access_token');
                localStorage.setItem('access_token', res.token);

                return this.router.navigate(['pedidos/home']);

            },
            error: (err) => {

                this.msgError = err?.error?.message;

            }
        });

    }

}


