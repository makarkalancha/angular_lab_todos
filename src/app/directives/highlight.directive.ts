import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  color = 'rgb(247, 235, 149)'; // jaune poussin
  
  @HostListener('mouseenter')
  onMouseEnter(){
    this.highlight(this.color);
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.highlight('');
  }

  constructor(private elementRef: ElementRef) { 
    this.highlight('');
  }

  private highlight(color: string){
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
