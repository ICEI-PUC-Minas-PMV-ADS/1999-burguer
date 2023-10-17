import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoProdutoComponent } from './criacao-produto.component';

describe('CriacaoProdutoComponent', () => {
    let component: CriacaoProdutoComponent;
    let fixture: ComponentFixture<CriacaoProdutoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CriacaoProdutoComponent]
        });
        fixture = TestBed.createComponent(CriacaoProdutoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
