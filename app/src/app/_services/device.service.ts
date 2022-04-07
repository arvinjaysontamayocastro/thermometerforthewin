import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Device } from '../_models/device';
import { DeviceHubService } from './device-hub.service';
import { TemperatureReading } from '../_models/temperatureReading';

const BACKEND_URL = environment.apiUrl + '/device';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private devices: Device[] = [];
  private devicesUpdated = new Subject<{ devices: Device[] }>();//, deviceCount: number
  public deviceAddSubscription: Subscription;
  public deviceUpdateSubscription: Subscription;
  public deviceAddTemperatureSubscription: Subscription;

  constructor(private http: HttpClient, private router: Router, deviceHubService: DeviceHubService) {
    deviceHubService.connect();
    this.deviceAddSubscription = deviceHubService.addDevice.subscribe(device => {
      this.devices.push(device);
      this.devicesUpdated.next({ devices: [...this.devices] });
    });
    this.deviceUpdateSubscription = deviceHubService.updateDevice.subscribe(device => {
      var d = this.devices.find(d => { return d.deviceId === device.deviceId; });
      d.deviceCode = device.deviceCode;
      d.freezingPoint = device.freezingPoint;
      d.boilingPoint = device.boilingPoint;
      this.devicesUpdated.next({ devices: [...this.devices] });
    });
    this.deviceAddTemperatureSubscription = deviceHubService.addDeviceTemperatureReading.subscribe(deviceTemperatureReading => {
      var d = this.devices.find(d => { return d.deviceId === deviceTemperatureReading.deviceId; });
      var temperatureReading: TemperatureReading = {
        temperature: deviceTemperatureReading.temperature,
        readingDate: deviceTemperatureReading.readingDate
      };
      console.log("d");
      console.log(d);
      console.log("temperatureReading");
      console.log(temperatureReading);
      d.temperatureReadings.push(temperatureReading);
      this.devicesUpdated.next({ devices: [...this.devices] });
    });
  }
  getDevice(deviceId: string) {
    console.log("deviceId");
    console.log(deviceId);
    console.log(this.devices);
    return this.devices.find(d => { return d.deviceId === deviceId; });
  }
  getDevices() {
    // devicesPerPage: number, currentPage: number
    // const queryParams = `?pagesize=${devicesPerPage}&page=${currentPage}`;
    this.http
      .get<any>(BACKEND_URL)//, maxDevices: number + queryParams
      .pipe(
        map((deviceData) => {
          return {
            devices: JSON.parse(deviceData).map(device => {
              return {
                deviceId: device.DeviceId,
                deviceCode: device.DeviceCode,
                freezingPoint: device.FreezingPoint,
                boilingPoint: device.BoilingPoint,
                temperatureReadings: device.TemperatureReadings.map(temperatureReading => {
                  return {
                    temperature: temperatureReading.Temperature,
                    readingDate: temperatureReading.ReadingDate
                  }
                })
              };
            })
          };
          // , maxDevices: deviceData.maxDevices
        })
      ) //operators
      .subscribe((transformedDeviceData) => {
        this.devices = transformedDeviceData.devices;
        this.devicesUpdated.next({ devices: [...this.devices] }); // copy of devices, deviceCount: transformedDeviceData.maxDevices
      });
  }
  getDeviceUpdateListener() {
    return this.devicesUpdated.asObservable();
  }

  // getDevice(id: string) {
  //   return this.http.get<{
  //     _id: string;
  //     title: string;
  //     content: string;
  //     imagePath: string;
  //     creator: string;
  //   }>(BACKEND_URL + id);
  //   // return { ...this.devices.find((p) => p.id === id) };
  // }

  updateDevice(device: Device) {
    // const deviceData = new FormData();
    // "DeviceCode": "T01",
    // "BoilingPoint": 100,
    // "FreezingPoint": 0

    // deviceData.append('DeviceCode', device.deviceCode);
    // deviceData.append('BoilingPoint', device.boilingPoint.toString());
    // deviceData.append('FreezingPoint', device.freezingPoint.toString());

    console.log(device);
    this.http
      .put<{ message: string; device: Device }>(
        BACKEND_URL,
        device
      )
      .subscribe((responseData) => {
        this.router.navigate(['/device-list']);
      });
  }
  addDevice(device: Device) {
    // const deviceData = new FormData();
    // "DeviceCode": "T01",
    // "BoilingPoint": 100,
    // "FreezingPoint": 0

    // deviceData.append('DeviceCode', device.deviceCode);
    // deviceData.append('BoilingPoint', device.boilingPoint.toString());
    // deviceData.append('FreezingPoint', device.freezingPoint.toString());

    console.log(device);
    this.http
      .post<{ message: string; device: Device }>(
        BACKEND_URL,
        device
      )
      .subscribe((responseData) => {
        this.router.navigate(['/device-list']);
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
