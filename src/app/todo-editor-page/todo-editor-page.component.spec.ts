import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditorPageComponent } from './todo-editor-page.component';

describe('TodoEditorPageComponent', () => {
  let component: TodoEditorPageComponent;
  let fixture: ComponentFixture<TodoEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoEditorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
