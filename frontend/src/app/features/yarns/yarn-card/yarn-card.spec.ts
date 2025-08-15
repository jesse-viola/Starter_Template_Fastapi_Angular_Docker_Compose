import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnCard } from './yarn-card';

describe('YarnCard', () => {
  let component: YarnCard;
  let fixture: ComponentFixture<YarnCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YarnCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YarnCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
