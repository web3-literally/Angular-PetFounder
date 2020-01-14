import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MatBottomSheet} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Pet} from '../../models/pet.models';
import {Location, Property} from '../../app.models';

export class Data {
    constructor(public pets: Pet[]) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class PetService {

    constructor(public http: HttpClient,
                private bottomSheet: MatBottomSheet,
                private snackBar: MatSnackBar,
                public appSettings: AppSettings) {
    }

    public getPets() {
        return Observable.create(observer => {
            this.http.post('/api/pet/get-all-pets', {}).subscribe((data: any) => {
                if (data.status != 'success') {
                    this.snackBar.open('Get Pets From Server Failed!', '×', {
                        panelClass: 'failed',
                        verticalPosition: 'top',
                        duration: 3000
                    });
                } else {
                    let allPets = data.pets as Pet[];
                    observer.next({allPets});
                    observer.complete();
                }
            }, (error: any) => {
                this.snackBar.open('Get Pets From Server Failed!', '×', {
                    panelClass: 'failed',
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
        });
    }

    public getPetById(id: string) {
        return Observable.create(observer => {
            this.http.post('/api/pet/get-pet', {id}).subscribe((data: any) => {
                if (data.status != 'success') {
                    this.snackBar.open('Get Pets From Server Failed!', '×', {
                        panelClass: 'failed',
                        verticalPosition: 'top',
                        duration: 3000
                    });
                } else {
                    let pet = data.pet as Pet;
                    observer.next({pet});
                    observer.complete();
                }
            }, (error: any) => {
                this.snackBar.open('Get Pets From Server Failed!', '×', {
                    panelClass: 'failed',
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
        });
    }

    public filterData(data, params: any, sort?, page?, perPage?) {

        if (params) {

            if (params.petType) {
                data = data.filter(pet => pet.petType == params.petType.name);
            }

            if (params.petStatus && params.petStatus.length) {
                let statuses = [];
                params.petStatus.forEach(status => {
                    statuses.push(status.name);
                });

                const pets = [];
                data.filter(pet => {
                    if (statuses.indexOf(pet.foundLost) > -1) {
                        if (!pets.includes(pet)) {
                            pets.push(pet);
                        }
                    }
                });
                data = pets;
            }
        }

        this.sortData(sort, data);
        return this.paginator(data, page, perPage);
    }

    public sortData(sort, data) {
        return data;
    }

    public paginator(items, page?, perPage?) {
        var page = page || 1,
            perPage = perPage || 4,
            offset = (page - 1) * perPage,
            paginatedItems = items.slice(offset).slice(0, perPage),
            totalPages = Math.ceil(items.length / perPage);
        return {
            data: paginatedItems,
            pagination: {
                page,
                perPage,
                prePage: page - 1 ? page - 1 : null,
                nextPage: (totalPages > page) ? page + 1 : null,
                total: items.length,
                totalPages,
            }
        };
    }

    public registerFoundPet(petInfo: object): Observable<any> {
        return Observable.create(observer => {
            this.http.post('/api/pet/register-foundpet', petInfo).subscribe((data: any) => {
                observer.next({data});
                observer.complete();
            }, (error: any) => {
                const ret = {status: 'failed'};
                observer.next({ret});
                observer.complete();
            });
        });
    }

    public registerLostPet(petInfo: object): Observable<any> {
        return Observable.create(observer => {
            this.http.post('/api/pet/register-lostpet', petInfo).subscribe((data: any) => {
                observer.next({data});
                observer.complete();
            }, (error: any) => {
                const ret = {status: 'failed'};
                observer.next({ret});
                observer.complete();
            });
        });
    }
}
