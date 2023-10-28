import { Component } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/services/dialog.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './esqueci-minha-senha.component.html',
    styleUrls: ['./esqueci-minha-senha.component.scss']
})
export class EsqueciMinhaSenhaComponent {

    field: {
        email: string,
        code: number,
        password: string
    } = {
        email: '',
        code: null,
        password: ''
    };
    msgError: string
    constructor(
        private sessaoService: SessaoService,
        private router: Router,
        private dialog: DialogService
    ) { }

    verification_code: string
    getEmail = true
    getCode = false
    getPassword = false

    submitEmailInput() {
        this.sessaoService.forgotPassword(
            this.field
        )
        .subscribe({
            next: (res) => {
                console.log(res.verification_code)
                this.verification_code = res.verification_code
                this.getEmail = false
                this.getCode = true
            },
            error: (err) => {
                this.dialog.error('Verifique o email!', 'Erro ao solicitar código:')
            }
        })
    }

    submitCodeInput(){
        if (this.field.code == Number(this.verification_code)){
            this.getCode = false
            this.getPassword = true
        } else {
            this.dialog.error('', 'Erro ao verificar código!')
        }
    }

    submitPasswordInput(){
        this.sessaoService.resetPassword(
            this.field
        )
        .subscribe({
            next: (res) => {
                this.router.navigate(['/sessao/login'])
            },
            error: (err) => {
                this.dialog.error(err, 'Erro ao redefinir a senha!')
            }
        })

    }
}
