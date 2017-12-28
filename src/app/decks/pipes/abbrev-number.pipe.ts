import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'abbrevNumber'
})
export class AbbrevNumberPipe implements PipeTransform {
  transform(number: number) {
    const numOfDigits = number.toString().length;

    if (numOfDigits > 4) {
      const abbrevedNumber = Math.round(number / 100) / 10;

      if (numOfDigits > 5) {
        return `${Math.round(abbrevedNumber)}k`;
      }

      return `${abbrevedNumber}k`;
    }

    return number;
  }
}
