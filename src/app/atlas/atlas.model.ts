export interface Atlas {
  id: string;
  sig: string;
  name: string;
  onoff: string;
  sector: string;
  basin: string;
  asset: string;
  blocktype: string;
  year: string;
  size: number;
  surveymode: string;
  sourcetype: string;
  acqparty: string;
  acqfromdate: Date;
  acqtodate: Date;
  acqagency: string;
  procparty: string;
  procfromdate: Date;
  proctodate: Date;
  procagency: string;
  locationMapImagePath: string;
  foldMapImagePath: string;
  inlineImagePath: string;
  xlineImagePath: string;
  timeSliceImagePath: string;
  acqgrid: [{lat:string, lng: string}];
  creator: string;
}
