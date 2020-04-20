import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartTileUiComponent } from './my-cart-tile-ui.component';

describe('MyCartTileUiComponent', () => {
  let component: MyCartTileUiComponent;
  let fixture: ComponentFixture<MyCartTileUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartTileUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartTileUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
