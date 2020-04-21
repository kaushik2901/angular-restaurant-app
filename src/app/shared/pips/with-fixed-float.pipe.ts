import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withFixedFloat'
})
export class WithFixedFloatPipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    const points: number = args[0] && args[0] > 0 ? args[0] : 2;
    return value.toFixed(points);
  }

}
