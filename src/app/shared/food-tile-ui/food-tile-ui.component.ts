import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../models/food.model';
import { data } from '../models/foodData3';

@Component({
  selector: 'app-food-tile-ui',
  templateUrl: './food-tile-ui.component.html',
  styleUrls: ['./food-tile-ui.component.css']
})
export class FoodTileUiComponent implements OnInit {

  @Output('on-update') onUpdate = new EventEmitter<string>();
  @Output('on-delete') onDelete = new EventEmitter<string>();

  public data: Food;
  @Input('foodData') set foodData(data: Food) {
    this.data = data;
  }

  @Input('enable-update') enableUpdate: boolean;

  constructor() { }

  ngOnInit(): void { }

  update() {
    this.onUpdate.emit(this.data._id);
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.onDelete.emit(this.data._id);
    }
  }

}
