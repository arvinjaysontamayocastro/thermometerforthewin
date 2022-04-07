import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { CONFIGURATION } from '../_models/app.constants';
import { Device } from '../_models/device';
import { DeviceTemperatureReading } from '../_models/deviceTemperatureReading';

@Injectable({
  providedIn: 'root'
})
export class DeviceHubService {
  private connection: signalR.HubConnection;
  connectionEstablished = new Subject<Boolean>();

  addDevice = new Subject<Device>();
  updateDevice = new Subject<Device>();
  addDeviceTemperatureReading = new Subject<DeviceTemperatureReading>();

  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  connect() {
    console.log("connecting device hub");

    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
      .withUrl(CONFIGURATION.baseUrls.server +
          'devicehub')
      .build();
      
      this.connection.start().then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      }).catch(err => console.log(err));

      this.connection.on('AddDevice', (device) => {
        this.addDevice.next(device);
      });

      this.connection.on('UpdateDevice', (device) => {
        this.updateDevice.next(device);
      });

      this.connection.on('AddDeviceTemperatureReading', (deviceTemperatureReading) => {
        console.log('Received', deviceTemperatureReading);
        this.addDeviceTemperatureReading.next(deviceTemperatureReading);
      });
     }
  }
  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
  constructor() {

  }
}