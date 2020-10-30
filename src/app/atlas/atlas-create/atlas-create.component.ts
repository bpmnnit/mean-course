import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { mimeType } from './mime-type.validator';
import { AuthService } from 'src/app/auth/auth.service';
import { Atlas } from '../atlas.model';
import { AtlasService } from '../atlas.service';

interface DutyType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-atlas-create',
  templateUrl: './atlas-create.component.html',
  styleUrls: ['./atlas-create.component.css']
})
export class AtlasCreateComponent implements OnInit, OnDestroy {
  atlas: Atlas;
  isLoading = false;
  form: FormGroup;
  locationMapImagePreview: string;
  dutyTypes: DutyType[] = [
    { value: 'Onshore', viewValue: 'Offshore' },
    { value: 'Onshore', viewValue: 'Offshore' }
  ];
  private mode = 'create';
  private atlasId: string;
  private authStatusSub: Subscription;

  constructor(
      public atlasService: AtlasService,
      public route: ActivatedRoute,
      private authService: AuthService
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      sig: new FormControl(null),
      name: new FormControl(null),
      onoff: new FormControl(null),
      sector: new FormControl(null),
      basin: new FormControl(null),
      asset: new FormControl(null),
      blocktype: new FormControl(null),
      year: new FormControl(null),
      size: new FormControl(null),
      surveymode: new FormControl(null),
      sourcetype: new FormControl(null),
      acqparty: new FormControl(null),
      acqfromdate: new FormControl(null),
      acqtodate: new FormControl(null),
      acqagency: new FormControl(null),
      procparty: new FormControl(null),
      procfromdate: new FormControl(null),
      proctodate: new FormControl(null),
      procagency: new FormControl(null),
      locationMapImage: new FormControl(null)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('atlasId')) {
        this.mode = 'edit';
        this.atlasId = paramMap.get('atlasId');
        this.isLoading = true;
        this.atlasService.getOneAtlas(this.atlasId).subscribe(atlasData => {
          this.isLoading = false;
          this.atlas = {
            id: atlasData._id,
            sig: atlasData.sig,
            name: atlasData.name,
            onoff: atlasData.onoff,
            sector: atlasData.sector,
            basin: atlasData.basin,
            asset: atlasData.asset,
            blocktype: atlasData.blocktype,
            year: atlasData.year,
            size: atlasData.size,
            surveymode: atlasData.surveymode,
            sourcetype: atlasData.sourcetype,
            acqparty: atlasData.acqparty,
            acqfromdate: atlasData.acqfromdate,
            acqtodate: atlasData.acqtodate,
            acqagency: atlasData.acqagency,
            procparty: atlasData.procparty,
            procfromdate: atlasData.procfromdate,
            proctodate: atlasData.proctodate,
            procagency: atlasData.procagency,
            locationMapImagePath: atlasData.locationMapImagePath,
            creator: atlasData.creator
          };
          this.form.setValue({
            sig: atlasData.sig,
            name: atlasData.name,
            onoff: atlasData.onoff,
            sector: atlasData.sector,
            basin: atlasData.basin,
            asset: atlasData.asset,
            blocktype: atlasData.blocktype,
            year: atlasData.year,
            size: atlasData.size,
            surveymode: atlasData.surveymode,
            sourcetype: atlasData.sourcetype,
            acqparty: atlasData.acqparty,
            acqfromdate: atlasData.acqfromdate,
            acqtodate: atlasData.acqtodate,
            acqagency: atlasData.acqagency,
            procparty: atlasData.procparty,
            procfromdate: atlasData.procfromdate,
            proctodate: atlasData.proctodate,
            procagency: atlasData.procagency,
            locationMapImage: atlasData.locationMapImagePath
          });
        });
      } else {
        this.mode = 'create';
        this.atlasId = null;
      }
    });
  }

  onSaveAtlas() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.atlasService.addAtlas(
        this.form.value.sig,
        this.form.value.name,
        this.form.value.onoff,
        this.form.value.sector,
        this.form.value.basin,
        this.form.value.asset,
        this.form.value.blocktype,
        this.form.value.year,
        this.form.value.size,
        this.form.value.surveymode,
        this.form.value.sourcetype,
        this.form.value.acqparty,
        this.form.value.acqfromdate,
        this.form.value.acqtodate,
        this.form.value.acqagency,
        this.form.value.procparty,
        this.form.value.procfromdate,
        this.form.value.proctodate,
        this.form.value.procagency,
        this.form.value.locationMapImage
      );
    } else {
      this.atlasService.updateAtlas(
        this.atlasId,
        this.form.value.sig,
        this.form.value.name,
        this.form.value.onoff,
        this.form.value.sector,
        this.form.value.basin,
        this.form.value.asset,
        this.form.value.blocktype,
        this.form.value.year,
        this.form.value.size,
        this.form.value.surveymode,
        this.form.value.sourcetype,
        this.form.value.acqparty,
        this.form.value.acqfromdate,
        this.form.value.acqtodate,
        this.form.value.acqagency,
        this.form.value.procparty,
        this.form.value.procfromdate,
        this.form.value.proctodate,
        this.form.value.procagency,
        this.form.value.locationMapImage
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // file object
    this.form.patchValue({locationMapImage: file});
    this.form.get('locationMapImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.locationMapImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
