import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Atlas } from '../atlas.model';
import { AtlasService } from '../atlas.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-atlas-list',
  templateUrl: './atlas-list.component.html',
  styleUrls: ['./atlas-list.component.css']
})
export class AtlasListComponent implements OnInit, OnDestroy {
  atlas: Atlas[] = [];
  isLoading = false;
  displayedAtlasGridPointsColumns: string[] = ['lat', 'lng'];
  totalAtlas = 0;
  atlasPerPage = 10;
  pageSizeOptions = [10, 30, 50];
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;
  private atlasSub: Subscription;
  private authStatusSubs: Subscription;

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
}
