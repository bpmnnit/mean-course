import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Atlas } from './atlas.model';

const BACKEND_URL = environment.apiUrl + '/atlas/';

@Injectable({ providedIn: 'root' })
export class AtlasService {
  private atlas: Atlas[] = [];
  private atlasUpdated = new Subject<{ atlas: Atlas[], atlasCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAtlas(atlasPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${atlasPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; atlas: any, maxAtlas: number }>(BACKEND_URL + queryParams)
    .pipe(
      map(atlasData => {
        return {
          atlas: atlasData.atlas.map(an_atlas => {
            return {
              id: an_atlas._id,
              sig: an_atlas.sig,
              name: an_atlas.name,
              onoff: an_atlas.onoff,
              sector: an_atlas.sector,
              basin: an_atlas.basin,
              asset: an_atlas.asset,
              blocktype: an_atlas.blocktype,
              year: an_atlas.year,
              size: an_atlas.size,
              surveymode: an_atlas.surveymode,
              sourcetype: an_atlas.sourcetype,
              acqgrid: an_atlas.acqgrid,
              acqparty: an_atlas.acqparty,
              acqfromdate: this.getFormattedDate(an_atlas.acqfromdate),
              acqtodate: this.getFormattedDate(an_atlas.acqtodate),
              acqagency: an_atlas.acqagency,
              procparty: an_atlas.procparty,
              procfromdate: this.getFormattedDate(an_atlas.procfromdate),
              proctodate: this.getFormattedDate(an_atlas.proctodate),
              procagency: an_atlas.procagency,
              locationMapImagePath: an_atlas.locationMapImagePath,
              foldMapImagePath: an_atlas.foldMapImagePath,
              inlineImagePath: an_atlas.inlineImagePath,
              xlineImagePath: an_atlas.xlineImagePath,
              timeSliceImagePath: an_atlas.timeSliceImagePath,
              creator: an_atlas.creator
            };
          }),
          maxAtlas: atlasData.maxAtlas
        };
      })
    )
    .subscribe(transformedAtlasData => {
      this.atlas = transformedAtlasData.atlas;
      this.atlasUpdated.next({
        atlas: [...this.atlas],
        atlasCount: transformedAtlasData.maxAtlas
      });
    });
  }

  getAtlasUpdateListener() {
    return this.atlasUpdated.asObservable();
  }

  getOneAtlas(id: string) {
    return this.http.get<{ _id: string, sig: string, name: string, onoff: string, sector: string, basin: string, asset: string, blocktype: string, year: string, size: number, surveymode: string, sourcetype: string, acqgrid: [{lat: string, lng: string}], acqparty: string, acqfromdate: Date, acqtodate: Date, acqagency: string, procparty: string, procfromdate: Date, proctodate: Date, procagency: string, locationMapImagePath: string, foldMapImagePath: string, inlineImagePath: string, xlineImagePath: string, timeSliceImagePath: string, creator: string }>(
      BACKEND_URL + id
    );
  }

  addAtlas(sig: string, name: string, onoff: string, sector: string, basin: string, asset: string, blocktype: string, year: string, size: number, surveymode: string, sourcetype: string, acqgrid: [{lat: string, lng: string}], acqparty: string, acqfromdate: Date, acqtodate: Date, acqagency: string, procparty: string, procfromdate: Date, proctodate: Date, procagency: string, locationMapImage: File, foldMapImage: File, inlineImage: File, xlineImage: File, timeSliceImage: File) {
    console.log(acqgrid);
    const atlasData = new FormData();
    atlasData.append("sig", sig);
    atlasData.append("name", name);
    atlasData.append("onoff", onoff);
    atlasData.append("sector", sector);
    atlasData.append("basin", basin);
    atlasData.append("asset", asset);
    atlasData.append("blocktype", blocktype);
    atlasData.append("year", year);
    if(size) { atlasData.append("size", size.toString()); }
    atlasData.append("surveymode", surveymode);
    atlasData.append("sourcetype", sourcetype);
    if(acqgrid) { atlasData.append("acqgrid", JSON.stringify(acqgrid)); }
    atlasData.append("acqparty", acqparty);
    if(acqfromdate) { atlasData.append("acqfromdate", acqfromdate.toString()); }
    if(acqtodate) { atlasData.append("acqtodate", acqtodate.toString()); }
    atlasData.append("acqagency", acqagency);
    atlasData.append("procparty", procparty);
    if(procfromdate) { atlasData.append("procfromdate", procfromdate.toString()); }
    if(proctodate) { atlasData.append("proctodate", proctodate.toString());  }
    atlasData.append("procagency", procagency);
    atlasData.append("locationMapImage", locationMapImage, sig);
    atlasData.append("foldMapImage", foldMapImage, sig);
    atlasData.append("inlineImage", inlineImage, sig);
    atlasData.append("xlineImage", xlineImage, sig);
    atlasData.append("timeSliceImage", timeSliceImage, sig);
    this.http
      .post<{ message: string; atlas: Atlas }>(
        BACKEND_URL,
        atlasData
      )
      .subscribe(responseData => {
        this.router.navigate(["atlaslist"]);
      });
  }

  getFormattedDate(d: Date) {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let day: string | number = dt;
    let m: string | number = month;

    if (dt < 10) {
      day = '0' + dt.toString();
    }
    if (month < 10) {
      m = '0' + month.toString();
    }
    let formattedDate = day.toString() + '/' + m.toString() + '/'+ year.toString();
    console.log(formattedDate);
    return formattedDate;
  }

  updateAtlas(id: string, sig: string, name: string, onoff: string, sector: string, basin: string, asset: string, blocktype: string, year: string, size: number, surveymode: string, sourcetype: string, acqgrid: [{lat: string, lng: string}], acqparty: string, acqfromdate: Date, acqtodate: Date, acqagency: string, procparty: string, procfromdate: Date, proctodate: Date, procagency: string, locationMapImage: File | string, foldMapImage: File | string, inlineImage: File | string, xlineImage: File | string, timeSliceImage: File | string) {
    let atlasData: Atlas | FormData;
    if(typeof locationMapImage === 'object' || typeof foldMapImage === 'object' || typeof inlineImage === 'object' || typeof xlineImage === 'object' || typeof timeSliceImage === 'object') {
      atlasData = new FormData();
      atlasData.append("id", id);
      atlasData.append("sig", sig);
      atlasData.append("name", name);
      atlasData.append("onoff", onoff);
      atlasData.append("sector", sector);
      atlasData.append("basin", basin);
      atlasData.append("asset", asset);
      atlasData.append("blocktype", blocktype);
      atlasData.append("year", year);
      atlasData.append("size", size.toString());
      atlasData.append("surveymode", surveymode);
      atlasData.append("sourcetype", sourcetype);
      atlasData.append("acqgrid", JSON.stringify(acqgrid));
      atlasData.append("acqparty", acqparty);
      atlasData.append("acqfromdate", acqfromdate.toString());
      atlasData.append("acqtodate", acqtodate.toString());
      atlasData.append("acqagency", acqagency);
      atlasData.append("procparty", procparty);
      atlasData.append("procfromdate", procfromdate.toString());
      atlasData.append("proctodate", proctodate.toString());
      atlasData.append("procagency", procagency);
      atlasData.append("locationMapImage", locationMapImage, sig);
      atlasData.append("foldMapImage", foldMapImage, sig);
      atlasData.append("inlineImage", inlineImage, sig);
      atlasData.append("xlineImage", xlineImage, sig);
      atlasData.append("timeSliceImage", timeSliceImage, sig);
    } else {
      atlasData = {
        id: id,
        sig: sig,
        name: name,
        onoff: onoff,
        sector: sector,
        basin: basin,
        asset: asset,
        blocktype: blocktype,
        year: year,
        size: size,
        surveymode: surveymode,
        sourcetype: sourcetype,
        acqgrid: acqgrid,
        acqparty: acqparty,
        acqfromdate: acqfromdate,
        acqtodate: acqtodate,
        acqagency: acqagency,
        procparty: procparty,
        procfromdate: procfromdate,
        proctodate: proctodate,
        procagency: procagency,
        locationMapImagePath: locationMapImage,
        foldMapImagePath: foldMapImage,
        inlineImagePath: inlineImage,
        xlineImagePath: xlineImage,
        timeSliceImagePath: timeSliceImage,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, atlasData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteAtlas(atlasId: string) {
    return this.http.delete(BACKEND_URL + atlasId);
  }
}
