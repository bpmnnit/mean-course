import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Dpr } from './dpr.model';

const BACKEND_URL = environment.apiUrl + '/dprs/';

@Injectable({ providedIn: 'root' })
export class DprsService {
  private dprs: Dpr[] = [];
  private dprsUpdated = new Subject<{ dprs: Dpr[], dprCount: number }>();

  constructor(private http: HttpClient) {}
  getDprs(dprsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${dprsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; dprs: any, maxDprs: number }>(BACKEND_URL + queryParams)
    .pipe(
      map(dprData => {
        return {
          dprs: dprData.dprs.map(dpr => {
            return {
              id: dpr._id,
              date: dpr.date,
              fieldparty: dpr.fieldparty,
              accepted: dpr.accepted,
              rejected: dpr.rejected,
              skipped: dpr.skipped,
              recovered: dpr.recovered,
              conversionfactor: dpr.conversionfactor,
              coverage: dpr.coverage,
              area: dpr.area,
              shottype: dpr.shottype,
              acquisitiontype: dpr.acquisitiontype
            };
          }),
          maxDprs: dprData.maxDprs
        };
      })
    )
    .subscribe(transformedDprsData => {
      this.dprs = transformedDprsData.dprs;
      this.dprsUpdated.next({
        dprs: [...this.dprs],
        dprCount: transformedDprsData.maxDprs
      });
    });
  }

  saveDprs(dprsData: Dpr[]) {
    console.log(dprsData);
    // this.http.put(BACKEND_URL + 'update', dprsData)
    //   .subscribe(response => {
    //     console.log(response);
    //   });
  }

  getDprUpdateListener() {
    return this.dprsUpdated.asObservable();
  }
}
