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

  updateDevice(device: Device) {
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
    this.http
      .post<{ message: string; device: Device }>(
        BACKEND_URL,
        device
      )
      .subscribe((responseData) => {
        this.router.navigate(['/device-list']);
      });
  }
}
