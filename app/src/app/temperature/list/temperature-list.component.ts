import { Component, OnInit } from '@angular/core';
// import { TemperatureHubService } from '../../_services/temperature-hub.service';
import { Subscription } from 'rxjs';
import { Settings } from '../../_models/settings';
import { DeviceService } from '../../_services/device.service';
import { Device } from '../../_models/device';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceTemperatureReading } from '../../_models/deviceTemperatureReading';
import { TemperatureService } from 'src/app/_services/temperature.service';


@Component({
  selector: 'app-temperature-list',
  templateUrl: './temperature-list.component.html',
  styleUrls: ['./temperature-list.component.scss'],
})
export class TemperatureListComponent implements OnInit {
  form: FormGroup;

  devices: Device[] = [];
  selectedDevice: Device;
  deviceTemperatureReading: DeviceTemperatureReading;
  isLoading = false;

  private devicesSub: Subscription;

  constructor(private deviceService: DeviceService, private temperatureService: TemperatureService) {
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

  track() {
    // this.temperatureHubService.connect(this.settings);
    // this.temperatureSubscription = this.temperatureHubService.temperatureReadings.subscribe(tr => {
    //   console.log(tr);
    //   console.log("reading is " + tr.reading);
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
  }
  getInitialValue(device: Device) {
    console.log("device");
    console.log(device);
    if (device.temperatureReadings && device.temperatureReadings.length > 0) {
      return device.temperatureReadings[device.temperatureReadings.length - 1]["Temperature"];
    }
    else {
      return +((device.boilingPoint - device.freezingPoint) / 2);
    }
  }
  onSelectDevice(device: Device) {
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
}
