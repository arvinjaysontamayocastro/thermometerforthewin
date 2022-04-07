import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class HelperService {
  constructor() {
  }

  sortUnique(arr) {
    return arr.sort().filter(function(el,i,a){return i===a.indexOf(el)});
  }

  sortBy(arr, property) {
    return arr.sort((a, b) => a[property].localeCompare(b[property]));
  }
}
