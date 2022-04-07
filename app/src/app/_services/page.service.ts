import { Injectable } from '@angular/core';

enum Modes {
    Light = "LIGHT",
    Dark = "DARK",
}

@Injectable({ providedIn: 'root' })
export class PageService {

  mode: string = Modes.Light;

  toggleMode() {
    this.mode = this.mode === Modes.Light ? Modes.Dark : Modes.Light;
    sessionStorage.setItem("mode", this.mode);
  }
  constructor() {
    var modeFromCache = sessionStorage.getItem("mode");
    if(modeFromCache) {
      this.mode = modeFromCache;
    }
  }
}
