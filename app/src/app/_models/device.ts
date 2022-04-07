import { TemperatureReading } from "./temperatureReading";

export interface Device {
    deviceId: string,
    deviceCode: string,

    freezingPoint: number,
    boilingPoint: number,

    temperatureReadings: TemperatureReading[]
  }
  