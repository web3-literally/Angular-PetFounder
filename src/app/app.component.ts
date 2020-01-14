import { Component } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private userSubscription: Subscription;
  public user: any;
  
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public router: Router,) {
    this.settings = this.appSettings.settings;
  }

  public ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      }
    });
  }

}
