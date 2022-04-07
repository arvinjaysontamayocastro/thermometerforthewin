import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TemperatureListComponent } from './list/temperature-list.component';
// import { JobViewComponent } from "./view/job-view.component";

@NgModule({
  declarations: [
    TemperatureListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TemperaturesModule {}
