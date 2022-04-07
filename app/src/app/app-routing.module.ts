import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { DeviceCreateComponent } from "./device/create/device-create.component";
import { DeviceListComponent } from "./device/list/device-list.component";
import { TemperatureListComponent } from "./temperature/list/temperature-list.component";

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'device-list', component: DeviceListComponent },
  { path: 'device-add', component: DeviceCreateComponent },
  { path: 'device-update/:deviceId', component: DeviceCreateComponent },
  { path: 'temperature-list', component: TemperatureListComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
