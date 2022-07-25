import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[specialIsAlphaNumeric]'
})
export class SpecialCharacterDirective {

  regexStr = '^[a-zA-Z0-9]*$';
  @Input() isAlphaNumeric!: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    const key = event.keyCode;
    if (key === 32 && event.target.selectionStart === 0) {
      event.preventDefault();
      return false;
    }
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: any) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

}