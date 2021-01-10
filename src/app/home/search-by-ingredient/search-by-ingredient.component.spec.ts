import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByIngredientComponent } from './search-by-ingredient.component';

describe('SearchByIngredientComponent', () => {
  let component: SearchByIngredientComponent;
  let fixture: ComponentFixture<SearchByIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
