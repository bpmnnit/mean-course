import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  foldMapImagePreview: string;
  inlineImagePreview: string;
  xlineImagePreview: string;
  timeSliceImagePreview: string;

  dutyTypes: DutyType[] = [
    { value: 'Onshore', viewValue: 'Onshore' },
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
      acqgrid: new FormArray([
        new FormGroup({
          'lat': new FormControl(),
          'lng': new FormControl()
        })
      ]),
      acqparty: new FormControl(null),
      acqfromdate: new FormControl(null),
      acqtodate: new FormControl(null),
      acqagency: new FormControl(null),
      procparty: new FormControl(null),
      procfromdate: new FormControl(null),
      proctodate: new FormControl(null),
      procagency: new FormControl(null),
      locationMapImage: new FormControl(null),
      foldMapImage: new FormControl(null),
      inlineImage: new FormControl(null),
      xlineImage: new FormControl(null),
      timeSliceImage: new FormControl(null)
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
            acqgrid: atlasData.acqgrid,
            acqparty: atlasData.acqparty,
            acqfromdate: atlasData.acqfromdate,
            acqtodate: atlasData.acqtodate,
            acqagency: atlasData.acqagency,
            procparty: atlasData.procparty,
            procfromdate: atlasData.procfromdate,
            proctodate: atlasData.proctodate,
            procagency: atlasData.procagency,
            locationMapImagePath: atlasData.locationMapImagePath,
            foldMapImagePath: atlasData.foldMapImagePath,
            inlineImagePath: atlasData.inlineImagePath,
            xlineImagePath: atlasData.xlineImagePath,
            timeSliceImagePath: atlasData.timeSliceImagePath,
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
            acqgrid: atlasData.acqgrid,
            acqparty: atlasData.acqparty,
            acqfromdate: atlasData.acqfromdate,
            acqtodate: atlasData.acqtodate,
            acqagency: atlasData.acqagency,
            procparty: atlasData.procparty,
            procfromdate: atlasData.procfromdate,
            proctodate: atlasData.proctodate,
            procagency: atlasData.procagency,
            locationMapImage: atlasData.locationMapImagePath,
            foldMapImage: atlasData.foldMapImagePath,
            inlineImage: atlasData.inlineImagePath,
            xlineImage: atlasData.xlineImagePath,
            timeSliceImage: atlasData.timeSliceImagePath
          });
        });
      } else {
        this.mode = 'create';
        this.atlasId = null;
      }
    });
  }

  onAddLatLong() {
    (<FormArray>this.form.get('acqgrid')).push(
      new FormGroup({
        'lat': new FormControl(null),
        'lng': new FormControl(null)
      })
    );
  }

  onDeleteLatLong(index: number) {
    (<FormArray>this.form.get('acqgrid')).removeAt(index);
  }

  onDeleteAllLatLong() {
    (<FormArray>this.form.get('acqgrid')).clear();
  }

  getLatLongCount() {
    return (<FormArray>this.form.get('acqgrid')).length;
  }

  get controls() { // a getter!
    return (<FormArray>this.form.get('acqgrid')).controls;
  }

  onSaveAtlas() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      console.log(this.form.value);
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
        this.form.value.acqgrid,
        this.form.value.acqparty,
        this.form.value.acqfromdate,
        this.form.value.acqtodate,
        this.form.value.acqagency,
        this.form.value.procparty,
        this.form.value.procfromdate,
        this.form.value.proctodate,
        this.form.value.procagency,
        this.form.value.locationMapImage,
        this.form.value.foldMapImage,
        this.form.value.inlineImage,
        this.form.value.xlineImage,
        this.form.value.timeSliceImage
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
        this.form.value.acqgrid,
        this.form.value.acqparty,
        this.form.value.acqfromdate,
        this.form.value.acqtodate,
        this.form.value.acqagency,
        this.form.value.procparty,
        this.form.value.procfromdate,
        this.form.value.proctodate,
        this.form.value.procagency,
        this.form.value.locationMapImage,
        this.form.value.foldMapImage,
        this.form.value.inlineImage,
        this.form.value.xlineImage,
        this.form.value.timeSliceImage
      );
    }
    this.form.reset();
  }

  onImagePicked(num: number, event: Event) {
    const e = (event.target as HTMLInputElement);
    if(e.files && e.files.length) {
      console.log(e.files);
      switch(num) {
        case 0: {
          this.form.patchValue({locationMapImage: e.files[0]});
          let pp = this.form.get('locationMapImage');
          pp.updateValueAndValidity();
          const locationMapImageReader = new FileReader();
          locationMapImageReader.onload = () => {
            this.locationMapImagePreview = locationMapImageReader.result as string;
          };
          locationMapImageReader.readAsDataURL(e.files[0]);
          break;
        }
        case 1: {
          this.form.patchValue({foldMapImage: e.files[0]});
          let tt = this.form.get('foldMapImage');
          tt.updateValueAndValidity();
          const foldMapImageReader = new FileReader();
          foldMapImageReader.onload = () => {
            this.foldMapImagePreview = foldMapImageReader.result as string;
          };
          foldMapImageReader.readAsDataURL(e.files[0]);
          break;
        }
        case 2: {
          this.form.patchValue({inlineImage: e.files[0]});
          let tt = this.form.get('inlineImage');
          tt.updateValueAndValidity();
          const inlineImageReader = new FileReader();
          inlineImageReader.onload = () => {
            this.inlineImagePreview = inlineImageReader.result as string;
          };
          inlineImageReader.readAsDataURL(e.files[0]);
          break;
        }
        case 3: {
          this.form.patchValue({xlineImage: e.files[0]});
          let tt = this.form.get('xlineImage');
          tt.updateValueAndValidity();
          const xlineImageReader = new FileReader();
          xlineImageReader.onload = () => {
            this.xlineImagePreview = xlineImageReader.result as string;
          };
          xlineImageReader.readAsDataURL(e.files[0]);
          break;
        }
        case 4: {
          this.form.patchValue({timeSliceImage: e.files[0]});
          let tt = this.form.get('timeSliceImage');
          tt.updateValueAndValidity();
          const timeSliceImageReader = new FileReader();
          timeSliceImageReader.onload = () => {
            this.timeSliceImagePreview = timeSliceImageReader.result as string;
          };
          timeSliceImageReader.readAsDataURL(e.files[0]);
          break;
        }
      }
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
