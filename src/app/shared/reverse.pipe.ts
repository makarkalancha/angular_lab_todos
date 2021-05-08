import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  // transform(value: string, ...args: any[]): string {
  //   return value.split('').reverse().join('');
  // }

  //v1
  // transform(value: string|number|boolean|any[], ...args: any[]): string|number|boolean|any[] {
  //v2 overload
  transform(value: string, ...args: any[]): string
  transform(value: number, ...args: any[]): number
  transform(value: boolean, ...args: any[]): boolean
  transform(value: any[], ...args: any[]): any[] 
  transform(value: string|number|boolean|any[], ...args: any[]): string|number|boolean|any[] {
    if(typeof value == "string"){
      //automatically cast value to string
      return value.split('').reverse().join('');
    }else if(typeof value == "number"){
      return -value;
    }else if(typeof value == "boolean"){
      return !value;
    }
    //because string|number|boolean are used, compiler knows that any[] is left so no need to typeof
    // return value.reverse();
    // const reversed = [...value].reverse();//new Array(), copy, doesn't create new, uses references
    return [...value].reverse();
  }

}
