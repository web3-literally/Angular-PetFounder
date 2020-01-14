import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
  suppressScrollX: true
};

import { PipesModule } from '../theme/pipes/pipes.module';
import { DirectivesModule } from '../theme/directives/directives.module';


import { HeaderImageComponent } from './header-image/header-image.component';
import { HeaderCarouselComponent } from './header-carousel/header-carousel.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { PropertiesToolbarComponent } from './properties-toolbar/properties-toolbar.component';
import { PropertiesSearchComponent } from './properties-search/properties-search.component';
import { CompareOverviewComponent } from './compare-overview/compare-overview.component';
import { RatingComponent } from './rating/rating.component';
import { PropertiesSearchResultsFiltersComponent } from './properties-search-results-filters/properties-search-results-filters.component';
import { PropertiesCarouselComponent } from './properties-carousel/properties-carousel.component';
import { ClientsComponent } from './clients/clients.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { CommentsComponent } from './comments/comments.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { OurAgentsComponent } from './our-agents/our-agents.component';
import { MissionComponent } from './mission/mission.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { LogoComponent } from './logo/logo.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    DirectivesModule,
    LogoComponent,
    HeaderImageComponent,
    HeaderCarouselComponent,
    PropertyItemComponent,
    LoadMoreComponent,
    PropertiesToolbarComponent,
    PropertiesSearchComponent,
    CompareOverviewComponent,
    RatingComponent,
    PropertiesSearchResultsFiltersComponent,
    PropertiesCarouselComponent,
    ClientsComponent,
    GetInTouchComponent,
    CommentsComponent,
    TestimonialsComponent,
    OurAgentsComponent,
    MissionComponent,
    OurServicesComponent
  ],
  declarations: [
    LogoComponent,
    HeaderImageComponent,
    HeaderCarouselComponent,
    PropertyItemComponent,
    LoadMoreComponent,
    PropertiesToolbarComponent,
    PropertiesSearchComponent,
    CompareOverviewComponent,
    RatingComponent,
    PropertiesSearchResultsFiltersComponent,
    PropertiesCarouselComponent,
    ClientsComponent,
    GetInTouchComponent,
    CommentsComponent,
    TestimonialsComponent,
    OurAgentsComponent,
    MissionComponent,
    OurServicesComponent
  ],
  entryComponents: [
    CompareOverviewComponent
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // AuthService,
    // TokenStorage,
  ]
})
export class SharedModule { }
