import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiisterComponent } from './regiister.component';

describe('RegiisterComponent', () => {
  let component: RegiisterComponent;
  let fixture: ComponentFixture<RegiisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
