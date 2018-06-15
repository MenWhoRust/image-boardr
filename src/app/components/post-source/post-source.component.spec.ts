import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSourceComponent } from './post-source.component';

describe('PostSourceComponent', () => {
  let component: PostSourceComponent;
  let fixture: ComponentFixture<PostSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
