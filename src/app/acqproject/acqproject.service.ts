import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AcqProject } from './acqproject.model';

const BACKEND_URL = environment.apiUrl + '/acqProject/';

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
          acqProject: acqProjectData.acqProject.map(acqProject => {
            return {
              id: acqProject._id,
              area: acqProject.area,
              contract: acqProject.contract,
              vessel: acqProject.vessel,
              contractor: acqProject.contractor,
              start_date: acqProject.start_date,
              end_date: acqProject.end_date,
              mob_start_date: acqProject.mob_start_date,
              mob_end_date: acqProject.mob_end_date,
              volume: acqProject.volume,
              source_interval: acqProject.source_interval,
              sail_line_interval: acqProject.sail_line_interval,
              streamer_length: acqProject.streamer_length,
              receiver_interval: acqProject.receiver_interval,
              shot_point_interval: acqProject.shot_point_interval,
              source_array: acqProject.source_array,
              streamers: acqProject.streamers,
              record_length: acqProject.record_length,
              prime: acqProject.prime,
              infill_cap: acqProject.infill_cap,
              prefix: acqProject.prefix,
              direction: acqProject.direction,
              streamer_profile: acqProject.streamer_profile,
              planned_completion_days: acqProject.planned_completion_days,
              creator: acqProject.creator
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

  addAcqProject(area: string, contract: string, vessel: string, contractor: string, start_date: Date, end_date: Date, mob_start_date: Date, mob_end_date: Date, volume: number, source_interval: number, sail_line_interval: number, streamer_length: number, receiver_interval: number, shot_point_interval: number, source_array: number, streamers: number, record_length: number, prime: number, infill_cap: number, prefix: string, direction: { x: number, y: number }, streamer_profile: [string], planned_completion_days: number) {
    const acqProjectData = new FormData();
    acqProjectData.append("area", area);
    acqProjectData.append("contract", contract);
    acqProjectData.append("vessel", vessel);
    acqProjectData.append("contractor", contractor);
    acqProjectData.append("start_date", start_date.toISOString());
    acqProjectData.append("end_date", end_date.toISOString());
    acqProjectData.append("mob_start_date", mob_start_date.toISOString());
    acqProjectData.append("mob_end_date", mob_end_date.toISOString());
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
    acqProjectData.append("prefix", prefix.toString());
    acqProjectData.append("direction", JSON.stringify(direction));
    acqProjectData.append("streamer_profile", streamer_profile.toString());
    acqProjectData.append("planned_completion_days", planned_completion_days.toString());
    this.http
      .post<{ message: string; acqProject: AcqProject }>(
        BACKEND_URL,
        acqProjectData
      )
      .subscribe(responseData => {
        this.router.navigate(["acqProjectlist"]);
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
    let formattedDate = day + '/' + m + '/'+ year;
    return formattedDate;
  }

  updateAcqProject(id: string, area: string, contract: string, vessel: string, contractor: string, start_date: Date, end_date: Date, mob_start_date: Date, mob_end_date: Date, volume: number, source_interval: number, sail_line_interval: number, streamer_length: number, receiver_interval: number, shot_point_interval: number, source_array: number, streamers: number, record_length: number, prime: number, infill_cap: number, prefix: string, direction: { x: number, y: number }, streamer_profile: [string], planned_completion_days: number) {
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
