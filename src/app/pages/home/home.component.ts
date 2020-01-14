import {Component, OnInit} from '@angular/core';
import {Settings, AppSettings} from '../../app.settings';
import {Pet, Pagination} from '../../models/pet.models';

import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {PetService} from '../../services/pet/pet.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    watcher: Subscription;
    activeMediaQuery = '';

    public pets: Pet[];
    public viewType: string = 'grid';
    public viewCol: number = 25;
    public count: number = 8;
    public sort: string;
    public searchFields: any;
    public removedSearchField: string;
    public pagination: Pagination = new Pagination(1, 8, null, 2, 0, 0);
    public message: string;

    public settings: Settings;

    constructor(
        public appSettings: AppSettings, public petService: PetService, public mediaObserver: MediaObserver) {
        this.settings = this.appSettings.settings;

        this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
            // console.log(change)
            if (change.mqAlias == 'xs') {
                this.viewCol = 100;
            } else if (change.mqAlias == 'sm') {
                this.viewCol = 50;
            } else if (change.mqAlias == 'md') {
                this.viewCol = 33.3;
            } else {
                this.viewCol = 25;
            }
        });

    }

    ngOnInit() {
        this.getPets();
        // if (this.mediaObserver.isActive('xs')) {
        //    console.log('mobile version -XS')
        // }
    }

    ngDoCheck() {
        if (this.settings.loadMore.load) {
            this.settings.loadMore.load = false;
            this.getPets();
        }
    }

    ngOnDestroy() {
        this.resetLoadMore();
        this.watcher.unsubscribe();
    }

    public getPets() {
        this.petService.getPets().subscribe(data => {
            if (this.pets && this.pets.length > 0) {
                this.settings.loadMore.page++;
                this.pagination.page = this.settings.loadMore.page;
            }
            const result = this.filterData(data.allPets);
            if (result.data.length == 0) {
                //this.pets.length = 0;
                this.pets = [];
                this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
                this.message = 'No Results Found';
                return false;
            }
            if (this.pets && this.pets.length > 0) {
                this.pets = this.pets.concat(result.data);
            } else {
                this.pets = result.data;
            }
            this.pagination = result.pagination;
            this.message = null;

            if (this.pets.length == this.pagination.total) {
                this.settings.loadMore.complete = true;
                this.settings.loadMore.result = this.pets.length;
            } else {
                this.settings.loadMore.complete = false;
            }
        });
    }

    public resetLoadMore() {
        this.settings.loadMore.complete = false;
        this.settings.loadMore.start = false;
        this.settings.loadMore.page = 1;
        this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
    }

    public filterData(data) {
        return this.petService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
    }

    public searchClicked() {
        this.pets.length = 0;
        this.getPets();
    }

    public searchChanged(event) {
        event.valueChanges.subscribe(() => {
            this.resetLoadMore();
            this.searchFields = event.value;
            setTimeout(() => {
                this.removedSearchField = null;
            });
            if (!this.settings.searchOnBtnClick) {
                this.pets.length = 0;
            }
        });
        event.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
            if (!this.settings.searchOnBtnClick) {
                this.getPets();
            }
        });
    }

    public removeSearchField(field) {
        this.message = null;
        this.removedSearchField = field;
    }


    public changeCount(count) {
        this.count = count;
        this.resetLoadMore();
        this.pets.length = 0;
        this.getPets();
    }

    public changeSorting(sort) {
        this.sort = sort;
        this.resetLoadMore();
        this.pets.length = 0;
        this.getPets();
    }

    public changeViewType(obj) {
        this.viewType = obj.viewType;
        this.viewCol = obj.viewCol;
    }
}
