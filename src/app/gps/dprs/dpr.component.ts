import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable';
import { Subscription } from 'rxjs';

import { Dpr } from './dpr.model';
import { DprsService } from './dprs.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-dpr',
  templateUrl: './dpr.component.html',
  styleUrls: ['./dpr.component.css']
})
export class DprComponent implements OnInit, OnDestroy {
  dprs: Dpr[] = [];
  isLoading = false;
  totalDprs = 0;
  dprsPerPage = 30;
  pageSizeOptions = [30, 50, 100];
  currentPage = 1;
  id = 'hotInstance';
  hotSettings: Handsontable.default.GridSettings = {
    rowHeaders: true,
    colHeaders: true,
    columns: [
      {
        data: 'id',
        type: 'text'
      },
      {
        data: 'date',
        type: 'date',
        dateFormat: 'DD/MM/YYYY',
        correctFormat: true,
        defaultDate: '01/01/1900',
        // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
        datePickerConfig: {
          // First day of the week (0: Sunday, 1: Monday, etc)
          firstDay: 0,
          showWeekNumber: true,
          numberOfMonths: 1 ,
          // disableDayFn: function(date) {
          //   // Disable Sunday and Saturday
          //   return date.getDay() === 0 || date.getDay() === 6;
          // }
        }
      },
      {
        data: 'fieldparty',
        type: 'numeric'
      },
      {
        data: 'accepted',
        type: 'numeric',
      },
      {
        data: 'rejected',
        type: 'numeric'
      },
      {
        data: 'skipped',
        type: 'numeric'
      },
      {
        data: 'recovered',
        type: 'numeric'
      },
      {
        data: 'conversionfactor',
        type: 'numeric',
        numericFormat: {
          pattern: '0.0000'
        }
      },
      {
        data: 'coverage',
        type: 'numeric',
        numericFormat: {
          pattern: '0.0000'
        }
      },
      {
        data: 'area',
        type: 'text'
      },
      {
        data: 'shottype',
        type: 'text'
      },
      {
        data: 'acquisitiontype',
        type: 'text'
      }
    ],
    afterChange: (changes, source) => {
      if(changes && source === 'edit') {
        this.dprsService.saveDprs(changes, this.dprs.slice());
      }
    },
    //manualColumnMove: true,
    //manualRowMove: true,
    //manualColumnResize: true,
    //manualRowResize: true,
    //stretchH: 'all',
    hiddenColumns: {
      columns: [0],
      indicators: true
    },
    headerTooltips: true,
    dropdownMenu: true,
    columnSorting: true,
    filters: true,
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: {
      items: {
        'row_above': { name: 'Insert row above this one.' },
        'row_below': { name: 'Insert row below this one.' },
        'separator': Handsontable.default.plugins.ContextMenu.SEPARATOR,
        'clear_custom': {
          name: 'Clear all cells.',
          callback: function() {
            this.clear();
          }
        }
      }
    }
  };
  private dprsSub: Subscription;

  constructor(private dprsService: DprsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.dprsService.getDprs(this.dprsPerPage, this.currentPage);
    this.dprsSub = this.dprsService.getDprUpdateListener()
      .subscribe((dprData: { dprs: Dpr[], dprCount: number }) => {
        this.isLoading = false;
        this.totalDprs = dprData.dprCount;
        this.dprs = dprData.dprs;
      });
  }

  ngOnDestroy() {
    this.dprsSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.dprsPerPage = pageData.pageSize;
    this.dprsService.getDprs(this.dprsPerPage, this.currentPage);
  }

  detectChanges = (hotInstance, changes, source) => {
    console.log(changes);
  };

}
