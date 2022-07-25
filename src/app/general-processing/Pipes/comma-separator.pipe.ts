import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparator'
})
export class CommaSeparatorPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/,/g, "\n");

}

}
