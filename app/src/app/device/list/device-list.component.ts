import { Component, OnInit } from '@angular/core';
import { NotificationHubService } from './../../_services/notification-hub.service';
import { Subscription } from 'rxjs';
import { Settings } from '../../_models/settings';
import { DeviceService } from '../../_services/device.service';
import { Device } from '../../_models/device';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceTemperatureReading } from '../../_models/deviceTemperatureReading';
import { TemperatureService } from '../../_services/temperature.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  form: FormGroup;
  trackForm: FormGroup;

  devices: Device[] = [];
  selectedDevice: Device;
  deviceTemperatureReading: DeviceTemperatureReading;
  
  isLoading = false;
  type: string;

  private devicesSub: Subscription;

  constructor(private deviceService: DeviceService, private temperatureService: TemperatureService, private notificationHubService: NotificationHubService) {
    
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

    isReportWhenFreezingFluctuation: .5,
    isReportWhenBoilingFluctuation: .5,
  };

  initialize() {
    // this.settings.boilingPoint = 1;
  }

  track() {
    // this.temperatureHubService.connect(this.settings);
    // this.temperatureSubscription = this.temperatureHubService.temperatureReadings.subscribe(tr => {
    //   this.temperatureReading = tr.reading;
    // });
  }
  ngOnInit() {
    this.deviceService.getDevices();
    this.devicesSub = this.deviceService
      .getDeviceUpdateListener()
      .subscribe((deviceData: { devices: Device[]; }) => {
        this.isLoading = false;
        this.devices = deviceData.devices;
        console.log("updated devices");
        console.log(this.devices);
      });

    this.form = new FormGroup({
      deviceId: new FormControl(null),
      temperature: new FormControl(0, {
        validators: [Validators.required],
      }),
    });

    this.trackForm = new FormGroup({
      deviceId: new FormControl(null),
      isReportWhenFreezingReached: new FormControl(false),
      isReportWhenBoilingReached: new FormControl(false),
      isReportWhenFreezingApproaching: new FormControl(false),
      isReportWhenBoilingApproaching: new FormControl(false),
      isReportWhenFreezingOnce: new FormControl(false),
      isReportWhenBoilingOnce: new FormControl(false),
      isReportWhenFreezingFluctuation: new FormControl(0),
      isReportWhenBoilingFluctuation: new FormControl(0),
    });
  }
  getInitialValue(device: Device) {
    console.log("device");
    console.log(device);
    if (device.temperatureReadings && device.temperatureReadings.length > 0) {
      return device.temperatureReadings[device.temperatureReadings.length - 1].temperature;
    }
    else {
      return +((device.boilingPoint - device.freezingPoint) / 2);
    }
  }
  onTrackDevice(device: Device) {
    this.type = "track";
    this.selectedDevice = device;
    var initialValue = this.getInitialValue(device);
    this.form.controls["deviceId"].setValue(device.deviceId);
    this.form.controls["temperature"].setValue(initialValue);
    this.deviceTemperatureReading = {
      deviceId: device.deviceId,
      temperature: initialValue,
      readingDate: new Date()
    };
    this.isLoading = false;
    
    this.trackForm.controls["deviceId"].setValue(device.deviceId);
    this.trackForm.controls["isReportWhenFreezingReached"].setValue(false);
    this.trackForm.controls["isReportWhenBoilingReached"].setValue(false);
    this.trackForm.controls["isReportWhenFreezingApproaching"].setValue(false);
    this.trackForm.controls["isReportWhenBoilingApproaching"].setValue(false);
    this.trackForm.controls["isReportWhenFreezingOnce"].setValue(false);
    this.trackForm.controls["isReportWhenBoilingOnce"].setValue(false);

    this.trackForm.controls["isReportWhenFreezingFluctuation"].setValue(.5);
    this.trackForm.controls["isReportWhenBoilingFluctuation"].setValue(.5);


    this.settings = {
      deviceId: device.deviceId,
      isReportWhenFreezingReached: this.trackForm.value.isReportWhenFreezingReached,
      isReportWhenBoilingReached: this.trackForm.value.isReportWhenBoilingReached,
      isReportWhenFreezingApproaching: this.trackForm.value.isReportWhenFreezingApproaching,
      isReportWhenBoilingApproaching: this.trackForm.value.isReportWhenBoilingApproaching,
      isReportWhenFreezingOnce: this.trackForm.value.isReportWhenFreezingOnce,
      isReportWhenBoilingOnce: this.trackForm.value.isReportWhenBoilingOnce,
      isReportWhenFreezingFluctuation: this.trackForm.value.isReportWhenFreezingFluctuation,
      isReportWhenBoilingFluctuation: this.trackForm.value.isReportWhenBoilingFluctuation,
    };
  }
  onAddTemperature(device: Device) {
    this.type = "addtemperature";
    this.selectedDevice = device;
    var initialValue = this.getInitialValue(device);
    this.form.controls["deviceId"].setValue(device.deviceId);
    this.form.controls["temperature"].setValue(initialValue);
    this.deviceTemperatureReading = {
      deviceId: device.deviceId,
      temperature: initialValue,
      readingDate: new Date()
    };
  }
  // clearSelectDevice() {
  //   // this.selectedDevice = null;
  //   console.log(this.selectedDevice);
  // }
  onSaveTemperature() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.deviceTemperatureReading.deviceId = this.form.value.deviceId;
    this.deviceTemperatureReading.temperature = this.form.value.temperature;
    this.temperatureService.addTemperature(this.deviceTemperatureReading);
    this.selectedDevice = null;
    this.form.reset();
  }
  onSaveTrack() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.settings.deviceId = this.trackForm.value.deviceId;
    this.settings.isReportWhenFreezingReached = this.trackForm.value.isReportWhenFreezingReached;
    this.settings.isReportWhenBoilingReached = this.trackForm.value.isReportWhenBoilingReached;
    this.settings.isReportWhenFreezingApproaching = this.trackForm.value.isReportWhenFreezingApproaching;
    this.settings.isReportWhenBoilingApproaching = this.trackForm.value.isReportWhenBoilingApproaching;
    this.settings.isReportWhenFreezingOnce = this.trackForm.value.isReportWhenFreezingOnce;
    this.settings.isReportWhenBoilingOnce = this.trackForm.value.isReportWhenBoilingOnce;
    this.settings.isReportWhenFreezingFluctuation = this.trackForm.value.isReportWhenFreezingFluctuation;
    this.settings.isReportWhenBoilingFluctuation = this.trackForm.value.isReportWhenBoilingFluctuation;
    // this.notificationService.addNotificationSettings(this.settings);

    this.notificationHubService.connect(this.settings);
    // this.temperatureSubscription = this.temperatureHubService.temperatureNotifications.subscribe(tr => {
    //   console.log(tr);
    //   // console.log("notifications is " + tr.notifications);
    //   // this.temperatureReading = tr.reading;
    // });


    this.selectedDevice = null;
    this.form.reset();
  }
}
