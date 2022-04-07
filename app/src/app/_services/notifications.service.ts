import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Device } from '../_models/device';
import { DeviceHubService } from './device-hub.service';
import { DeviceTemperatureReading } from '../_models/deviceTemperatureReading';
import { Settings } from '../_models/settings';

const BACKEND_URL = environment.apiUrl + '/settings';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // private devices: Device[] = [];
  // private devicesUpdated = new Subject<{devices: Device[]}>();//, deviceCount: number
  // public deviceSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router, deviceHubService: DeviceHubService) {
  }
  addNotificationSettings(settings: Settings) {
    this.http
      .post<{ message: string; settings: Settings }>(
        BACKEND_URL,
        settings
      )
      .subscribe((responseData) => {
        console.log("responseData");
        console.log(responseData);
        // this.router.navigate(['/device-list']);
      });
  }
}
