import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <ngx-spinner bdColor="rgba(139, 139, 139, 0.4)" size="small" color="#ffffff00" type="line-scale"></ngx-spinner>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    
    title = 'frontend';

}
