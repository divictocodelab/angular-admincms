import { Injectable } from "@angular/core";

@Injectable()

export class UtilityFunctionService {
  constructor() {}
}

export function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (const k in b) {
      // if (b.hasOwnProperty(k)) a[k] =  parseFloat(a[k] || 0) + parseFloat(b[k]);
      // for precision of 2 digit
      if (b.hasOwnProperty(k)) {
        const data = (parseFloat(a[k] || 0) + parseFloat(b[k])).toString();
        a[k] = parseFloat(data).toFixed(2);
      }
    }
    return a;
  }, {});
}
