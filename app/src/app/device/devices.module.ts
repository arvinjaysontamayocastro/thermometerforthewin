import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DeviceCreateComponent } from './create/device-create.component';
import { DeviceListComponent } from './list/device-list.component';

@NgModule({
  declarations: [
    DeviceCreateComponent,
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class DevicesModule {}
