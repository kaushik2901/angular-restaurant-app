import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menuItem.model';
import { Store } from '@ngrx/store';
import { UserState } from '../models/userState';
import { Subscription } from 'rxjs';
import { getBadgeCounts } from '../store/user/user.selector';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit, OnDestroy {

  public myCartBadgeCount = 0;
  public myCartBadgeCountSubscription: Subscription;

  public menuList: MenuItem[];
  public appTitle: MenuItem;

  constructor(private store: Store<UserState>) { }

  ngOnInit(): void {
    this.myCartBadgeCountSubscription = this.store.select(getBadgeCounts).subscribe(counts => {
      this.menuList = [
        { title: 'Menu', url: 'user/', },
        { title: 'My Cart', url: 'user/my-cart', badgeCount: counts.myCart },
        { title: 'Logout', url: 'user/logout' },
      ];
    });
  }

  ngOnDestroy(): void {
    this.myCartBadgeCountSubscription.unsubscribe();
  }

}
