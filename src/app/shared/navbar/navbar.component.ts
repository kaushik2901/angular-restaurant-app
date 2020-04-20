import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../models/menuItem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input('menu-list') menuList: MenuItem[];
  @Input('app-title') appTitle: MenuItem;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  goToLink(link: string) {
    this.router.navigateByUrl(link);
  }

}
