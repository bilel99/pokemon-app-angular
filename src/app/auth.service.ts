import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public redirectUrl: string;

    // Méthode de connection
    public login(): Observable<boolean>{
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    // Méthode de déconnection
    public logout(): void {
        this.isLoggedIn = false;
    }

}