import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-properties-search-results-filters',
    templateUrl: './properties-search-results-filters.component.html',
    styleUrls: ['./properties-search-results-filters.component.scss']
})
export class PropertiesSearchResultsFiltersComponent implements OnInit {
    @Input() searchFields: any;
    @Output() onRemoveSearchField: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    public remove(field) {
        this.onRemoveSearchField.emit(field);
    }

}
