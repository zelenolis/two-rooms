import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTimeColor]'
})
export class TimeColorDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    //this.el.nativeElement.style.backgroundColor = 'red'
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const dropdownOptions = this.el.nativeElement.querySelectorAll('.mat-option span');
      console.log(dropdownOptions)
      dropdownOptions.forEach((option: any) => {
        this.renderer.setStyle(option, 'background-color', 'lightblue');
      });
    });
  }

}
