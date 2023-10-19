import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard {

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // TODO: PARA TESTE
        //return true;

        let token = localStorage.getItem('access_token');

        if (token) {

            return true;

        } else {

            this.router.navigateByUrl('/sessao/login');

            return false;

        }

    }

}
