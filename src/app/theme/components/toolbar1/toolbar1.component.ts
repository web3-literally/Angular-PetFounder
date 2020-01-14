import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'src/app/app.service';
import { AuthService } from '../../../services/auth/auth.service'

@Component({
  selector: 'app-toolbar1',
  templateUrl: './toolbar1.component.html'
})
export class Toolbar1Component implements OnInit {
  @Input() user: any = {};
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService: AppService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  public sidenavToggle() {
    this.onMenuIconClick.emit();
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/login');
  }
  navigate(link): void {
    this.router.navigate([link]);
  }
}