import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { Atlas } from '../atlas.model';
import { AtlasService } from '../atlas.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PageEvent } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-atlas-list',
  templateUrl: './atlas-list.component.html',
  styleUrls: ['./atlas-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AtlasListComponent implements OnInit, OnDestroy {
  sort: MatSort;
  //sort: MatSort;
  atlas: Atlas[] = [];
  isLoading = false;
  totalAtlas = 0;
  atlasPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;
  displayedColumns: string[] = ['sig', 'name', 'onoff', 'sector', 'basin', 'asset', 'blocktype', 'year', 'size', 'surveymode'];
  dataSource = null;
  expandedElement: Atlas | null;
  private atlasSub: Subscription;
  private authStatusSubs: Subscription

  constructor(public atlasService: AtlasService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.atlasService.getAtlas(this.atlasPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.atlasSub = this.atlasService.getAtlasUpdateListener()
      .subscribe((atlasData: { atlas: Atlas[], atlasCount: number }) => {
        this.isLoading = false;
        this.totalAtlas = atlasData.atlasCount;
        this.atlas = atlasData.atlas;
        this.dataSource = new MatTableDataSource<Atlas>(this.atlas);
        this.dataSource.sort = this.sort;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.atlasSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

  onDelete(atlasId: string) {
    this.isLoading = true;
    this.atlasService.deleteAtlas(atlasId).subscribe(() => {
      this.atlasService.getAtlas(this.atlasPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.atlasPerPage = pageData.pageSize;
    this.atlasService.getAtlas(this.atlasPerPage, this.currentPage);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngAfterViewInit() {
  //   console.log(this.dataSource);
  // }
}
