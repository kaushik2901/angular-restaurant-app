import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menuItem.model';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  public menuList: MenuItem[];
  public appTitle: MenuItem;

  constructor() { }

  ngOnInit(): void {
    this.menuList = [
      { title: 'Manage Food', url: 'admin', },
      { title: 'Add Food', url: 'admin/edit/food', },
      { title: 'Logout', url: 'user/logout' },
    ];
  }

}
