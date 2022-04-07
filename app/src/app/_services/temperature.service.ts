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
  // private devices: Device[] = [];
  // private devicesUpdated = new Subject<{devices: Device[]}>();//, deviceCount: number
  // public deviceSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router, deviceHubService: DeviceHubService) {
    // deviceHubService.connect();
    // this.deviceSubscription = deviceHubService.addDevice.subscribe(device => {
    //   this.devices.push(device);
    //   this.devicesUpdated.next({ devices: [...this.devices]});
    // });
    // this.deviceSubscription = deviceHubService.updateDevice.subscribe(device => {
    //   var d = this.devices.find(d => {return d.deviceId === device.deviceId;});
    //   d.deviceCode = device.deviceCode;
    //   d.freezingPoint = device.freezingPoint;
    //   d.boilingPoint = device.boilingPoint;
    //   this.devicesUpdated.next({ devices: [...this.devices]});
    // });
  }
  // getDevice(deviceId: string) {
  //   console.log("deviceId");
  //   console.log(deviceId);
  //   console.log(this.devices);
  //   return this.devices.find(d => {return d.deviceId === deviceId;});
  // }
  // getDevices() {
  //   this.http
  //     .get<any>(BACKEND_URL)//, maxDevices: number + queryParams
  //     .pipe(
  //       map((deviceData) => {
  //         return {devices: JSON.parse(deviceData).map(device => {
  //           return {
  //             deviceId: device.DeviceId,
  //             deviceCode: device.DeviceCode,
  //             freezingPoint: device.FreezingPoint,
  //             boilingPoint: device.BoilingPoint,
  //             temperatureReadings: device.TemperatureReadings
  //           };
  //         })};
  //         // , maxDevices: deviceData.maxDevices
  //       })
  //     ) //operators
  //     .subscribe((transformedDeviceData) => {
  //       this.devices = transformedDeviceData.devices;
  //       this.devicesUpdated.next({ devices: [...this.devices]}); // copy of devices, deviceCount: transformedDeviceData.maxDevices
  //     });
  // }
  // getDeviceUpdateListener() {
  //   return this.devicesUpdated.asObservable();
  // }

  // updateDevice(device: Device) {
    
  //   console.log(device);
  //   this.http
  //     .put<{ message: string; device: Device }>(
  //       BACKEND_URL,
  //       device
  //     )
  //     .subscribe((responseData) => {
  //       this.router.navigate(['/device-list']);
  //     });
  // }
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
        // this.router.navigate(['/device-list']);
      });
  }
  // updateDevice(id: string, title: string, content: string, image: File | string) {
  //   let deviceData: Device | FormData;
  //   if (typeof (image === 'object')) {
  //     deviceData = new FormData();
  //     deviceData.append("id", id);
  //     deviceData.append('title', title);
  //     deviceData.append('content', content);
  //     deviceData.append('image', image, title);
  //   } else {
  //     deviceData = {
  //       id: id,
  //       title: title,
  //       content: content,
  //       imagePath: image.toString(),
  //       creator: null
  //     };
  //   }

  //   this.http
  //     .put(BACKEND_URL + id, deviceData)
  //     .subscribe((response) => {
  //       this.router.navigate(['/']);
  //     });
  // }
  // deleteDevice(deviceId: string) {
  //   return  this.http
  //     .delete(BACKEND_URL + deviceId)
  // }
}
