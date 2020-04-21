import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyCartItem } from '../../user/models/userState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart-tile-ui',
  templateUrl: './my-cart-tile-ui.component.html',
  styleUrls: ['./my-cart-tile-ui.component.css']
})
export class MyCartTileUiComponent implements OnInit {

  @Input('cart-item') cartItem: MyCartItem;
  @Output('on-delete') onDelete = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  updateCart() {
    this.router.navigateByUrl(`/user/food/update/${this.cartItem._id}`);
  }

  deleteCart() {
    this.onDelete.emit(this.cartItem._id);
  }

}
