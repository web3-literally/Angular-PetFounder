import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from '../../app.service';

@Component({
    selector: 'app-properties-search',
    templateUrl: './properties-search.component.html',
    styleUrls: ['./properties-search.component.scss']
})
export class PropertiesSearchComponent implements OnInit {
    @Input() variant: number = 1;
    @Input() vertical: boolean = false;
    @Input() searchOnBtnClick: boolean = false;
    @Input() removedSearchField: string;
    @Output() onSearchChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();
    public showMore: boolean = false;
    public form: FormGroup;
    public petTypes = [];
    public petStatuses = [];

    constructor(public appService: AppService, public fb: FormBuilder) {
    }

    ngOnInit() {
        if (this.vertical) {
            this.showMore = true;
        }
        this.petTypes = this.appService.getPetTypes();
        this.petStatuses = this.appService.getPetStatuses();
        this.form = this.fb.group({
            petType: null,
            petStatus: null,
            radius: null,
        });

        this.onSearchChange.emit(this.form);
    }

    ngOnChanges() {
        if (this.removedSearchField) {
            if (this.removedSearchField.indexOf('.') > -1) {
                let arr = this.removedSearchField.split('.');
                this.form.controls[arr[0]]['controls'][arr[1]].reset();
            } else if (this.removedSearchField.indexOf(',') > -1) {
                let arr = this.removedSearchField.split(',');
                this.form.controls[arr[0]]['controls'][arr[1]]['controls']['selected'].setValue(false);
            } else {
                this.form.controls[this.removedSearchField].reset();
            }
        }
    }

    public reset() {
        this.form.reset({
            petType: null,
            petStatus: null,
            redius: null,
        });
    }

    public search() {
        this.onSearchClick.emit();
    }

    public getAppearance() {
        return (this.variant != 3) ? 'outline' : '';
    }

    public getFloatLabel() {
        return (this.variant == 1) ? 'always' : '';
    }
}
