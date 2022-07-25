import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNotAllowWhiteSpaceStart]'
})
export class NotAllowWhiteSpaceStartDirective {
  regexStr = '^[ A-Za-z0-9_@./!@#$%^&*#&+-]*$';
  @Input() isWhiteSpaceStart!: boolean;
  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    const key = event.keyCode;
    if (key === 32 && event.target.selectionStart === 0) {
      event.preventDefault();
      return false;
    }
    return new RegExp(this.regexStr).test(event.key);
  }

  // @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
  //   this.validateFields(event);
  // }

  // validateFields(event: any) {
  //   setTimeout(() => {

  //     this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
  //     event.preventDefault();

  //   }, 100)
  // }

}
