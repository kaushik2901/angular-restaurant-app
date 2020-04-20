import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTileUiComponent } from './food-tile-ui.component';

describe('FoodTileUiComponent', () => {
  let component: FoodTileUiComponent;
  let fixture: ComponentFixture<FoodTileUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTileUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTileUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
