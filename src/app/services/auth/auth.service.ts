import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatSnackBar} from '@angular/material';

import {TokenStorage} from './token.storage';
import {TooltipComponent} from '@angular/material';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private token: TokenStorage) {
    }

    public userSource = new BehaviorSubject<any>('');

    login(email: string, password: string): Observable<any> {
        return Observable.create(observer => {
            this.http.post('/api/auth/login', {
                email,
                password
            }).subscribe((data: any) => {
                observer.next({user: data.user});
                this.setUser(data.user);
                this.token.saveToken(data.token);
                observer.complete();
            }, (error: any) => {
                this.snackBar.open('Login Failed. Try Again!', '×', {
                    panelClass: 'failed',
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
        });
    }

    register(username: string, email: string, password: string, repeatPassword: string): Observable<any> {
        return Observable.create(observer => {
            this.http.post('/api/auth/register', {
                username,
                email,
                password,
                repeatPassword
            }).subscribe((data: any) => {
                observer.next({user: data.user});
                this.setUser(data.user);
                this.token.saveToken(data.token);
                observer.complete();
            }, (error: any) => {
                this.snackBar.open('User Registeration Failed!', '×', {
                    panelClass: 'failed',
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
        });
    }

    setUser(user): void {
        if (user) {
            user.isAdmin = (user.roles.indexOf('admin') > -1);
        }
        this.userSource.next(user);
        (<any> window).user = user;
    }

    getUser(): Observable<any> {
        return this.userSource.asObservable();
    }

    me(): Observable<any> {
        return Observable.create(observer => {
            const tokenVal = this.token.getToken();
            if (!tokenVal) {
                return observer.complete();
            }
            this.http.get('/api/auth/me').subscribe((data: any) => {
                observer.next({user: data.user});
                this.setUser(data.user);
                observer.complete();
            });
        });
    }

    signOut(): void {
        this.token.signOut();
        this.setUser(null);
    }
}
