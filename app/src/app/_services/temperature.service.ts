import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Device } from '../_models/device';
import { DeviceHubService } from './device-hub.service';
import { DeviceTemperatureReading } from '../_models/deviceTemperatureReading';

const BACKEND_URL = environment.apiUrl + '/temperature';

@Injectable({ providedIn: 'root' })
export class TemperatureService {

  constructor(private http: HttpClient, private router: Router, deviceHubService: DeviceHubService) {
  }
  addTemperature(deviceTemperatureReading: DeviceTemperatureReading) {
    console.log("deviceTemperatureReading");
    console.log(deviceTemperatureReading);
    this.http
      .post<{ message: string; device: DeviceTemperatureReading }>(
        BACKEND_URL,
        deviceTemperatureReading
      )
      .subscribe((responseData) => {
        console.log("responseData");
        console.log(responseData);
      });
  }
}
