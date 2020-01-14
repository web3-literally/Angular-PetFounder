import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { AgmCoreModule } from '@agm/core';
import { EmbedVideo } from 'ngx-embed-video';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AppRouting } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { AppInterceptor } from './theme/utils/app-interceptor';


import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Toolbar1Component } from './theme/components/toolbar1/toolbar1.component';
import { Toolbar2Component } from './theme/components/toolbar2/toolbar2.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { CurrencyComponent } from './theme/components/currency/currency.component';
import { LangComponent } from './theme/components/lang/lang.component';
import { SocialIconsComponent } from './theme/components/social-icons/social-icons.component';
import { ContactsComponent } from './theme/components/contacts/contacts.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { FooterComponent } from './theme/components/footer/footer.component';

import { AuthService } from './services/auth/auth.service';
import { TokenStorage } from './services/auth/token.storage';
import { AuthGuard } from './services/auth/auth-guard.service';
import { PetService } from './services/pet/pet.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    UserMenuComponent,
    CurrencyComponent,
    LangComponent,
    SocialIconsComponent,
    ContactsComponent,
    Toolbar1Component,
    Toolbar2Component,
    HorizontalMenuComponent,
    VerticalMenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLf9Ywk47zipEtorDewwMmB3JtuXdzYL4',
      libraries: ['places']
    }),
    EmbedVideo.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    InputFileModule.forRoot(config),
    AppRouting,
    SharedModule,
  ],
  providers: [
    AppSettings,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    AuthService,
    TokenStorage,
    AuthGuard,
    PetService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
