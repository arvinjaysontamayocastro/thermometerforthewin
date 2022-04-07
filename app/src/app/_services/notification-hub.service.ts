import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { AlertMessage } from '../_models/alert-message';
import { CONFIGURATION } from '../_models/app.constants';
import { Settings } from '../_models/settings';
import { Temperature } from '../_models/temperature';
import { TemperatureNotification } from '../_models/temperatureNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationHubService {
  private connection: signalR.HubConnection;
  connectionEstablished = new Subject<Boolean>();

  temperatureReadings = new Subject<Temperature>();
  alertMessages = new Subject<AlertMessage>();

  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  connect(settings: Settings) {
    console.log("connecting notification hub using settings");
    var serializedSettings = this.serialize(settings);
    console.log(serializedSettings);

    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
      .withUrl(CONFIGURATION.baseUrls.server +
          'notificationhub?' + serializedSettings)
      .build();
      
      this.connection.start().then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      }).catch(err => console.log(err));

      // this.connection.on('GetTemperature', (reading) => {
      //   console.log('Received', reading);
      //   this.temperatureReadings.next({ reading });
      // });

      this.connection.on('AlertMessage', (alertMessage) => {
        console.log('Received', alertMessage);
        this.alertMessages.next(alertMessage);
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