export interface Settings {
    deviceId: string,
    
    isReportWhenFreezingReached: boolean,
    isReportWhenBoilingReached: boolean,

    isReportWhenFreezingApproaching: boolean,
    isReportWhenBoilingApproaching: boolean,

    isReportWhenFreezingOnce: boolean,
    isReportWhenBoilingOnce: boolean,

    isReportWhenFreezingFluctuation: number,
    isReportWhenBoilingFluctuation: number,
  }
  