import {Component, OnInit, Input, ViewChild, SimpleChange} from '@angular/core';
import {SwiperDirective, SwiperConfigInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {Settings, AppSettings} from '../../app.settings';

import {AppService} from '../../app.service';
import {CompareOverviewComponent} from '../compare-overview/compare-overview.component';
import {Property} from '../../app.models';
import {Pet} from '../../models/pet.models';

@Component({
    selector: 'app-property-item',
    templateUrl: './property-item.component.html',
    styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent implements OnInit {
    @Input() pet: Pet;
    @Input() property: Property;
    @Input() viewType: string = 'grid';
    @Input() viewColChanged: boolean = false;
    @Input() fullWidthPage: boolean = true;
    public column: number = 4;
    // public address:string;
    @ViewChild(SwiperDirective, {static: false}) directiveRef: SwiperDirective;
    public config: SwiperConfigInterface = {};
    private pagination: SwiperPaginationInterface = {
        el: '.swiper-pagination',
        clickable: true
    };
    public settings: Settings;

    constructor(public appSettings: AppSettings, public appService: AppService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initCarousel();
        // this.appService.getAddress(this.property.location.lat, this.property.location.lng).subscribe(data=>{
        //   console.log(data['results'][0]['formatted_address']);
        //   this.address = data['results'][0]['formatted_address'];
        // })
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes.viewColChanged) {
            this.getColumnCount(changes.viewColChanged.currentValue);
            if (!changes.viewColChanged.isFirstChange()) {
                if (this.pet.gallery.length > 1) {
                    this.directiveRef.update();
                }
            }
        }

        for (let propName in changes) {
            // let changedProp = changes[propName];
            // if (!changedProp.isFirstChange()) {
            //   if(this.property.gallery.length > 1){
            //     this.initCarousel();
            //     this.config.autoHeight = true;
            //     this.directiveRef.update();
            //   }
            // }
        }
    }

    public getColumnCount(value) {
        if (value == 25) {
            this.column = 4;
        } else if (value == 33.3) {
            this.column = 3;
        } else if (value == 50) {
            this.column = 2;
        } else {
            this.column = 1;
        }
    }

    public getStatusBgColor(status) {
        switch (status) {
            case 'Found':
                return '#558B2F';
            case 'Lost':
                return '#F44336';
            default:
                return '#01579B';
        }
    }


    public initCarousel() {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: false,
            navigation: true,
            pagination: this.pagination,
            grabCursor: true,
            loop: true,
            preloadImages: false,
            lazy: true,
            nested: true,
            // autoplay: {
            //   delay: 5000,
            //   disableOnInteraction: false
            // },
            speed: 500,
            effect: 'slide'
        };
    }
}
