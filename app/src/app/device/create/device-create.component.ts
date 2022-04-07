import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
// import { AuthService } from '../../_services/auth.service';
import { Device } from '../../_models/device';
import { DeviceService } from '../../_services/device.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css'],
})
export class DeviceCreateComponent implements OnInit, OnDestroy {
  device: Device;
  isLoading = false;
  isInitialized = false;
  form: FormGroup;
  public mode = 'Create';
  private deviceId: string;
  private devicesSub: Subscription;

  constructor(
    public deviceService: DeviceService,
    public route: ActivatedRoute
    // ,private authService: AuthService // For now, all is allowed to use the app
  ) { }

  ngOnInit() {
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((authStatus) => {
    //     this.isLoading = false;
    //   });
    this.isLoading = false;
    this.form = new FormGroup({
      deviceId: new FormControl(null),
      deviceCode: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      boilingPoint: new FormControl(100, {
        validators: [Validators.required],
      }),
      freezingPoint: new FormControl(0, {
        validators: [Validators.required],
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('deviceId')) {
        this.deviceService.getDevices();
        this.devicesSub = this.deviceService
        .getDeviceUpdateListener()
        .subscribe((data: { devices: Device[]; }) => {
          this.mode = 'Update';
          this.deviceId = paramMap.get('deviceId');
          this.isLoading = true;
          var deviceData = this.deviceService.getDevice(this.deviceId);
          this.isLoading = false;
          // console.log("deviceData");
          // console.log(deviceData)
          this.device = {
            deviceId: deviceData.deviceId,
            deviceCode: deviceData.deviceCode,
            freezingPoint: deviceData.freezingPoint,
            boilingPoint: deviceData.boilingPoint,
            temperatureReadings: deviceData.temperatureReadings
          };
          this.form.setValue({
            deviceId: this.device.deviceId,
            deviceCode: this.device.deviceCode,
            freezingPoint: this.device.freezingPoint,
            boilingPoint: this.device.boilingPoint
            // ,temperatureReadings: this.device.temperatureReadings
          });
          this.isInitialized = true;
        });
      } else {
        this.device = {
          deviceId: null,
          deviceCode: "",
          freezingPoint: 0,
          boilingPoint: 100,
          temperatureReadings: []
        };
        this.mode = 'Create';
        this.deviceId = null;
      }
    });
  }
  onSaveDevice() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    if (this.mode === 'Create') {
      this.device.deviceId = null;
      this.device.deviceCode = this.form.value.deviceCode;
      this.device.boilingPoint = this.form.value.boilingPoint;
      this.device.freezingPoint = this.form.value.freezingPoint;
      this.deviceService.addDevice(this.device);
    }
    else {
      this.device.deviceId = this.form.value.deviceId;
      this.device.deviceCode = this.form.value.deviceCode;
      this.device.boilingPoint = this.form.value.boilingPoint;
      this.device.freezingPoint = this.form.value.freezingPoint;
      this.deviceService.updateDevice(this.device);
    }
    this.form.reset();
  }
  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
