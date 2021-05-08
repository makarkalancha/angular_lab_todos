import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div appHighlight></div>`
})
class TestComponent {
}

/*
to test
add "f" to parent "describe" - test only this file
add "f" to child "describe" - test only this test case
run "npm test"
*/

fdescribe('HighlightDirective', () => {
  // it('should create an instance', () => {
  //   const directive = new HighlightDirective();
  //   expect(directive).toBeTruthy();
  // });

  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement; 

  beforeEach(() => {
    const testModuleMetadata: TestModuleMetadata = {
      declarations: [HighlightDirective, TestComponent]
    };
    fixture = TestBed
      .configureTestingModule(testModuleMetadata)
      .createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(HighlightDirective));
    fixture.detectChanges();
  });

  describe('constructor', () => {
    it('should set the background color to null', () => {
      // expect(fixture.nativeElement.style.backgroundColor).toBeNull();
      expect(fixture.nativeElement.style.backgroundColor).toBeFalsy();
    });
  });

  describe('on mouseenter', () => {
    beforeEach(() => {
      directiveElement.triggerEventHandler('mouseenter', null);
    });
    it('should set the background color', () => {
      expect(directiveElement.nativeElement.style.backgroundColor).toBe('rgb(247, 235, 149)');
    });
  });

  describe('on mouseleave', () => {
    beforeEach(() => {
      directiveElement.triggerEventHandler('mouseleave', null);
    });
    it('should reset the background color', () => { 
      expect(directiveElement.nativeElement.style.backgroundColor).toBe('');
    });
  });
  // afterEach(() => // TODO: Faire le ménage après chaque test);
});