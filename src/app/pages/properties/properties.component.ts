import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AppSettings, Settings} from '../../app.settings';
import {Pagination, Property} from '../../app.models';

import {Pet} from '../../models/pet.models';
import {PetService} from '../../services/pet/pet.service';

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
    @ViewChild('sidenav', {static: true}) sidenav: any;
    public sidenavOpen: boolean = true;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    public psConfig: PerfectScrollbarConfigInterface = {
        wheelPropagation: true
    };

    public pets: Pet[];
    public properties: Property[];
    public viewType: string = 'grid';
    public viewCol: number = 33.3;
    public count: number = 12;
    public sort: string;
    public searchFields: any;
    public removedSearchField: string;
    public pagination: Pagination = new Pagination(1, this.count, null, 2, 0, 0);
    public message: string;
    public watcher: Subscription;

    public settings: Settings;

    constructor(public appSettings: AppSettings, public petService: PetService, public mediaObserver: MediaObserver) {
        this.settings = this.appSettings.settings;
        this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
            if (change.mqAlias == 'xs') {
                this.sidenavOpen = false;
                this.viewCol = 100;
            } else if (change.mqAlias == 'sm') {
                this.sidenavOpen = false;
                this.viewCol = 50;
            } else if (change.mqAlias == 'md') {
                this.viewCol = 50;
                this.sidenavOpen = true;
            } else {
                this.viewCol = 33.3;
                this.sidenavOpen = true;
            }
        });

    }

    ngOnInit() {
        this.getPets();
    }

    ngOnDestroy() {
        this.watcher.unsubscribe();
    }

    public getPets() {
        this.petService.getPets().subscribe(data => {
            let result = this.filterData(data.allPets);
            if (result.data.length == 0) {
                this.pets.length = 0;
                this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
                this.message = 'No Results Found';
                return false;
            }
            this.pets = result.data;
            this.pagination = result.pagination;
            this.message = null;
        });
    }

    public resetPagination() {
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
    }

    public filterData(data) {
        return this.petService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
    }

    public searchClicked() {
        this.pets.length = 0;
        this.getPets();
        window.scrollTo(0, 0);
    }

    public searchChanged(event) {
        event.valueChanges.subscribe(() => {
            this.resetPagination();
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
        this.pets.length = 0;
        this.resetPagination();
        this.getPets();
    }

    public changeSorting(sort) {
        this.sort = sort;
        this.pets.length = 0;
        this.getPets();
    }

    public changeViewType(obj) {
        this.viewType = obj.viewType;
        this.viewCol = obj.viewCol;
    }


    public onPageChange(e) {
        this.pagination.page = e.pageIndex + 1;
        this.getPets();
        window.scrollTo(0, 0);
    }

}
