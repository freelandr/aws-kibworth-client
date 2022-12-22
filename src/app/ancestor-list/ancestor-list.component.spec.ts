import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AncestorListComponent } from './ancestor-list.component';

describe('AncestorListComponent', () => {
  let component: AncestorListComponent;
  let fixture: ComponentFixture<AncestorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AncestorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AncestorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
