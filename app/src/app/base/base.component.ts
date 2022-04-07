import { Component, OnInit } from '@angular/core';
// import { TemperatureHubService } from './../_services/temperature-hub.service';
import { Subscription } from 'rxjs';
import { Settings } from '../_models/settings';
import { DeviceService } from '../_services/device.service';
import { Device } from '../_models/device';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  devices: Device[] = [];
  isLoading = false;
  temperature: Number = 36;

  private devicesSub: Subscription;

  constructor(private deviceService: DeviceService) {
    // private temperatureHubService: TemperatureHubService, 
    this.initialize();
  }
  temperatureReading: number;
  public isInitialized: boolean = false;
  public temperatureSubscription: Subscription;

  public settings: Settings = {
    deviceId: "",

    isReportWhenFreezingReached: true,
    isReportWhenBoilingReached: true,

    isReportWhenFreezingApproaching: true,
    isReportWhenBoilingApproaching: true,

    isReportWhenFreezingOnce: true,
    isReportWhenBoilingOnce: true,

    isReportWhenFreezingFluctuation: 5,
    isReportWhenBoilingFluctuation: 5,
  };

  initialize() {
    // this.settings.boilingPoint = 1;
  }

  // track() {
  //   this.temperatureHubService.connect(this.settings);
  //   this.temperatureSubscription = this.temperatureHubService.notifications.subscribe(tr => {
  //     console.log(tr);
  //     console.log("reading is " + tr.reading);
  //     this.temperatureReading = tr.reading;
  //   });
  // }
  ngOnInit() {
    this.deviceService.getDevices();
    this.devicesSub = this.deviceService
    .getDeviceUpdateListener()
    .subscribe((deviceData: { devices: Device[]; }) => {
      this.isLoading = false;
      this.devices = deviceData.devices;
      console.log(this.devices);
    });
  }
}
