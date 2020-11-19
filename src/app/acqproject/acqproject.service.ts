import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AcqProject } from './acqproject.model';

const BACKEND_URL = environment.apiUrl + '/apc/';

@Injectable({ providedIn: 'root' })
export class AcqProjectService {
  private acqProject: AcqProject[] = [];
  private acqProjectUpdated = new Subject<{ acqProject: AcqProject[], acqProjectCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAcqProjects(acqProjectPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${acqProjectPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; acqProject: any, maxAcqProject: number }>(BACKEND_URL + queryParams)
    .pipe(
      map(acqProjectData => {
        return {
          acqProject: acqProjectData.acqProject.map(acqProj => {
            return {
              id: acqProj._id,
              area: acqProj.area,
              contract: acqProj.contract,
              vessel: acqProj.vessel,
              contractor: acqProj.contractor,
              start_date: acqProj.start_date,
              end_date: acqProj.end_date,
              mob_start_date: acqProj.mob_start_date,
              mob_end_date: acqProj.mob_end_date,
              volume: acqProj.volume,
              source_interval: acqProj.source_interval,
              sail_line_interval: acqProj.sail_line_interval,
              streamer_length: acqProj.streamer_length,
              receiver_interval: acqProj.receiver_interval,
              shot_point_interval: acqProj.shot_point_interval,
              source_array: acqProj.source_array,
              streamers: acqProj.streamers,
              record_length: acqProj.record_length,
              prime: acqProj.prime,
              infill_cap: acqProj.infill_cap,
              prefix: acqProj.prefix,
              direction: acqProj.direction,
              streamer_profile: acqProj.streamer_profile,
              planned_completion_days: acqProj.planned_completion_days,
              creator: acqProj.creator
            };
          }),
          maxAcqProject: acqProjectData.maxAcqProject
        };
      })
    )
    .subscribe(transformedAcqProjectData => {
      this.acqProject = transformedAcqProjectData.acqProject;
      this.acqProjectUpdated.next({
        acqProject: [...this.acqProject],
        acqProjectCount: transformedAcqProjectData.maxAcqProject
      });
    });
  }

  getAcqProjectUpdateListener() {
    return this.acqProjectUpdated.asObservable();
  }

  getAcqProject(id: string) {
    return this.http.get<{ _id: string, area: string, contract: string, vessel: string, contractor: string, start_date: Date, end_date: Date, mob_start_date: Date, mob_end_date: Date, volume: number, source_interval: number, sail_line_interval: number, streamer_length: number, receiver_interval: number, shot_point_interval: number, source_array: number, streamers: number, record_length: number, prime: number, infill_cap: number, prefix: string, direction: { x: number, y: number }, streamer_profile: [string], planned_completion_days: number, creator: string }>(
      BACKEND_URL + id
    );
  }

  addAcqProject(area: string, contract: string, vessel: string, contractor: string, start_date: Date, end_date: Date, mob_start_date: Date, mob_end_date: Date, volume: number, source_interval: number, sail_line_interval: number, streamer_length: number, receiver_interval: number, shot_point_interval: number, source_array: number, streamers: number, record_length: number, prime: number, infill_cap: number, prefix: string, direction: {x: number, y: number}, streamer_profile: [string], planned_completion_days: number) {
    const acqProjectData = new FormData();
    acqProjectData.append("area", area);
    acqProjectData.append("contract", contract);
    acqProjectData.append("vessel", vessel);
    acqProjectData.append("contractor", contractor);
    acqProjectData.append("start_date", start_date.toString());
    acqProjectData.append("end_date", end_date.toString());
    acqProjectData.append("mob_start_date", mob_start_date.toString());
    acqProjectData.append("mob_end_date", mob_end_date.toString());
    acqProjectData.append("volume", volume.toString());
    acqProjectData.append("source_interval", source_interval.toString());
    acqProjectData.append("sail_line_interval", sail_line_interval.toString());
    acqProjectData.append("streamer_length", streamer_length.toString());
    acqProjectData.append("receiver_interval", receiver_interval.toString());
    acqProjectData.append("shot_point_interval", shot_point_interval.toString());
    acqProjectData.append("source_array", source_array.toString());
    acqProjectData.append("streamers", streamers.toString());
    acqProjectData.append("record_length", record_length.toString());
    acqProjectData.append("prime", prime.toString());
    acqProjectData.append("infill_cap", infill_cap.toString());
    acqProjectData.append("prefix", prefix);
    acqProjectData.append("direction", JSON.stringify(direction));
    acqProjectData.append("streamer_profile", JSON.stringify(streamer_profile));
    acqProjectData.append("planned_completion_days", planned_completion_days.toString());
    console.log(acqProjectData);
    this.http
      .post<{ message: string; acqProject: AcqProject }>(
        BACKEND_URL,
        acqProjectData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  getFormattedDate(d: Date) {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let day = '';
    let m = '';

    if (dt < 10) {
      day = '0' + dt.toString();
    }
    if (month < 10) {
      m = '0' + month.toString();
    }
    let formattedDate = year + '-' + m + '-' + day; // + '/' + m + '/'+ year;
    return formattedDate;
  }

  updateAcqProject(id: string, area: string, contract: string, vessel: string, contractor: string, start_date: Date, end_date: Date, mob_start_date: Date, mob_end_date: Date, volume: number, source_interval: number, sail_line_interval: number, streamer_length: number, receiver_interval: number, shot_point_interval: number, source_array: number, streamers: number, record_length: number, prime: number, infill_cap: number, prefix: string, direction: {x: number, y: number}, streamer_profile: [string], planned_completion_days: number) {
    let acqProjectData: AcqProject;
    acqProjectData = {
      id: id,
      area: area,
      contract: contract,
      vessel: vessel,
      contractor: contractor,
      start_date: start_date,
      end_date: end_date,
      mob_start_date: mob_start_date,
      mob_end_date: mob_end_date,
      volume: volume,
      source_interval: source_interval,
      sail_line_interval: sail_line_interval,
      streamer_length: streamer_length,
      receiver_interval: receiver_interval,
      shot_point_interval: shot_point_interval,
      source_array: source_array,
      streamers: streamers,
      record_length: record_length,
      prime: prime,
      infill_cap: infill_cap,
      prefix: prefix,
      direction: direction,
      streamer_profile: streamer_profile,
      planned_completion_days: planned_completion_days,
      creator: null
    };
    this.http
      .put(BACKEND_URL + id, acqProjectData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteAcqProject(acqProjectId: string) {
    return this.http.delete(BACKEND_URL + acqProjectId);
  }
}
