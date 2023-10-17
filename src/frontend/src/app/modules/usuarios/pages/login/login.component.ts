import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsariosService } from '../../usuarios.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public formAuth: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]

    })



    public msgError!:string

    constructor(
        private formBuilder: FormBuilder,
        private usuarioService: UsariosService
    ) { }
    ngOnInit(): void {

    }

    public submitForm() {
        if (this.formAuth.valid) {
            this.usuarioService.sign(
                {
                    email: this.formAuth.value.email,
                    password: this.formAuth.value.password
                }
            ).subscribe({
                next: (res) => res,
                error: (e) => (this.msgError = e),
            })
        }
    }
}


