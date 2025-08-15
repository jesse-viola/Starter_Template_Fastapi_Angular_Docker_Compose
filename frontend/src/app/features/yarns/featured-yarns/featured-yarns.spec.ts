import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedYarns } from './featured-yarns';

describe('FeaturedYarns', () => {
  let component: FeaturedYarns;
  let fixture: ComponentFixture<FeaturedYarns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedYarns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedYarns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
