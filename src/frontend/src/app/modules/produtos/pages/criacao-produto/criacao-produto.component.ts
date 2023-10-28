import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutosService } from '../../produtos.service';
import { DialogService } from 'src/app/common/services/dialog.service';

@Component({
    selector: 'app-criacao-produto',
    templateUrl: './criacao-produto.component.html',
    styleUrls: ['./criacao-produto.component.scss']
})
export class CriacaoProdutoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    produtoId: number;

    formDados: FormGroup;

    execReq: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private _produtosService: ProdutosService,
        private _spinner: NgxSpinnerService,
        private _dialog: DialogService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {

        this.formDados = this.formBuilder.group({
            id: [null, []],
            nome: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            valor: [null, [Validators.required]],
            status: [false, []],
            imagem: [null, [Validators.required]]
        });

    }

    ngOnInit() {

        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
            
                if (params['id']) this.produtoId = +params['id'];

        });

        this.getProduto();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getProduto() {

        if (!this.produtoId) return;

        if (this.execReq) return;
        this.execReq = true;

        this._spinner.show();

        this._produtosService.getProduto(this.produtoId)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.execReq = false; this._spinner.hide(); })
            )
            .subscribe({
                next: res => {

                    this.preencheForm(res);

                },
                error: err => {

                    this._dialog.error(err, 'Erro ao buscar produtos');
                    this.voltar();

                }
            });


    }

    preencheForm(res) {

        this.formDados.patchValue(this.converteCamposParaForm(res));

    }

    converteCamposParaForm(obj): any {

        return obj;

    }

    submitForm() {

        if (this.produtoId) {
            this.editar();
        } else {
            this.cadastrar();
        }

    }

    cadastrar() {

        if (this.formDados.invalid) {
            this.formDados.markAllAsTouched();
            this._dialog.showToast('Verifique o preenchimento do formulário!');
            return;
        }
        
        if (this.execReq) return;
        this.execReq = true;

        this._spinner.show();

        const values = this.converteCamposParaBack(this.formDados.value);

        delete values.id;

        this._produtosService.createProduto(values)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.execReq = false; this._spinner.hide(); })
            )
            .subscribe({
                next: res => {

                    this._dialog.showToast('Produto cadastrado com sucesso!');
                    this.voltar();

                },
                error: err => {

                    this._dialog.error(err, 'Erro ao cadastrar produto');

                }
            });

    }

    editar() {

        if (this.formDados.invalid) {
            this.formDados.markAllAsTouched();
            this._dialog.showToast('Verifique o preenchimento do formulário!');
            return;
        }

        if (this.execReq) return;
        this.execReq = true;

        this._spinner.show();

        const values = this.converteCamposParaBack(this.formDados.value);

        this._produtosService.editProduto(this.produtoId, values)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.execReq = false; this._spinner.hide(); })
            )
            .subscribe({
                next: res => {

                    this._dialog.showToast('Produto editado com sucesso!');
                    this.voltar();

                },
                error: err => {

                    this._dialog.error(err, 'Erro ao editar produto');

                }
            });

    }

    converteCamposParaBack(obj) {

        obj.nome = (obj.nome || '').trim() || null;
        obj.descricao = (obj.descricao || '').trim() || null;
        obj.imagem = (obj.imagem || '').trim() || null;
        obj.status = obj.status || false;

        return obj;

    }

    voltar() {

        this._router.navigate(['/produtos/listaDeProdutos']);

    }

}