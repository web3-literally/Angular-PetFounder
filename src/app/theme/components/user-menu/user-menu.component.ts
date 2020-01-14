import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input() user: any = {};

  constructor(public appService: AppService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/login');
  }
  navigate(link): void {
    this.router.navigate([link]);
  }
}
