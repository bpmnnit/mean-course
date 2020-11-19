import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { AcqProject } from '../acqproject.model';
import { AcqProjectService } from '../acqproject.service';

@Component({
  selector: 'app-acqproject-create',
  templateUrl: './acqproject-create.component.html',
  styleUrls: ['./acqproject-create.component.css']
})
export class AcqProjectCreateComponent implements OnInit, OnDestroy {
  acqProject: AcqProject;
  isLoading = false;
  form: FormGroup;

  private mode = 'create';
  private acqProjectId: string;
  private authStatusSub: Subscription;

  constructor(
      public acqProjectService: AcqProjectService,
      public route: ActivatedRoute,
      private authService: AuthService
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      area: new FormControl(null),
      contract: new FormControl(null),
      vessel: new FormControl(null),
      contractor: new FormControl(null),
      start_date: new FormControl(null),
      end_date: new FormControl(null),
      mob_start_date: new FormControl(null),
      mob_end_date: new FormControl(null),
      volume: new FormControl(null),
      source_interval: new FormControl(null),
      sail_line_interval: new FormControl(null),
      streamer_length: new FormControl(null),
      receiver_interval: new FormControl(null),
      shot_point_interval: new FormControl(null),
      source_array: new FormControl(null),
      streamers: new FormControl(null),
      record_length: new FormControl(null),
      prime: new FormControl(null),
      infill_cap: new FormControl(null),
      prefix: new FormControl(null),
      direction: new FormGroup({
        'x': new FormControl(),
        'y': new FormControl()
      }),
      streamer_profile: new FormArray([ new FormControl(null) ]),
      planned_completion_days: new FormControl(null)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('acqProjectId')) {
        this.mode = 'edit';
        this.acqProjectId = paramMap.get('acqProjectId');
        this.isLoading = true;
        this.acqProjectService.getAcqProject(this.acqProjectId).subscribe(acqProjectData => {
          this.isLoading = false;
          this.acqProject = {
            id: acqProjectData._id,
            area: acqProjectData.area,
            contract: acqProjectData.contract,
            vessel: acqProjectData.vessel,
            contractor: acqProjectData.contractor,
            start_date: acqProjectData.start_date,
            end_date: acqProjectData.end_date,
            mob_start_date: acqProjectData.mob_start_date,
            mob_end_date: acqProjectData.mob_end_date,
            volume: acqProjectData.volume,
            source_interval: acqProjectData.source_interval,
            sail_line_interval: acqProjectData.sail_line_interval,
            streamer_length: acqProjectData.streamer_length,
            receiver_interval: acqProjectData.receiver_interval,
            shot_point_interval: acqProjectData.shot_point_interval,
            source_array: acqProjectData.source_array,
            streamers: acqProjectData.streamers,
            record_length: acqProjectData.record_length,
            prime: acqProjectData.prime,
            infill_cap: acqProjectData.infill_cap,
            prefix: acqProjectData.prefix,
            direction: acqProjectData.direction,
            streamer_profile: acqProjectData.streamer_profile,
            planned_completion_days: acqProjectData.planned_completion_days,
            creator: acqProjectData.creator
          };
          this.form.setValue({
            area: acqProjectData.area,
            contract: acqProjectData.contract,
            vessel: acqProjectData.vessel,
            contractor: acqProjectData.contractor,
            start_date: acqProjectData.start_date,
            end_date: acqProjectData.end_date,
            mob_start_date: acqProjectData.mob_start_date,
            mob_end_date: acqProjectData.mob_end_date,
            volume: acqProjectData.volume,
            source_interval: acqProjectData.source_interval,
            sail_line_interval: acqProjectData.sail_line_interval,
            streamer_length: acqProjectData.streamer_length,
            receiver_interval: acqProjectData.receiver_interval,
            shot_point_interval: acqProjectData.shot_point_interval,
            source_array: acqProjectData.source_array,
            streamers: acqProjectData.streamers,
            record_length: acqProjectData.record_length,
            prime: acqProjectData.prime,
            infill_cap: acqProjectData.infill_cap,
            prefix: acqProjectData.prefix,
            direction: acqProjectData.direction,
            streamer_profile: acqProjectData.streamer_profile,
            planned_completion_days: acqProjectData.planned_completion_days,
            creator: acqProjectData.creator
          });
        });
      } else {
        this.mode = 'create';
        this.acqProjectId = null;
      }
    });
  }

  onAddStreamerProfile() {
    (<FormArray>this.form.get('streamer_profile')).push(new FormControl());
  }

  onDeleteStreamerProfile(index: number) {
    (<FormArray>this.form.get('streamer_profile')).removeAt(index);
  }

  onDeleteAllStreamerProfile() {
    (<FormArray>this.form.get('streamer_profile')).clear();
  }

  getStreamerProfileCount() {
    return (<FormArray>this.form.get('streamer_profile')).length;
  }

  get controls() { // a getter!
    return (<FormArray>this.form.get('streamer_profile')).controls;
  }

  onSaveAcqProject() {
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      console.log(this.form.value);
      this.acqProjectService.addAcqProject(
        this.form.value.area,
        this.form.value.contract,
        this.form.value.vessel,
        this.form.value.contractor,
        this.form.value.start_date,
        this.form.value.end_date,
        this.form.value.mob_start_date,
        this.form.value.mob_end_date,
        this.form.value.volume,
        this.form.value.source_interval,
        this.form.value.sail_line_interval,
        this.form.value.streamer_length,
        this.form.value.receiver_interval,
        this.form.value.shot_point_interval,
        this.form.value.source_array,
        this.form.value.streamers,
        this.form.value.record_length,
        this.form.value.prime,
        this.form.value.infill_cap,
        this.form.value.prefix,
        this.form.value.direction,
        this.form.value.streamer_profile,
        this.form.value.planned_completion_days
      );
    } else {
      this.acqProjectService.updateAcqProject(
        this.acqProjectId,
        this.form.value.area,
        this.form.value.contract,
        this.form.value.vessel,
        this.form.value.contractor,
        this.form.value.start_date,
        this.form.value.end_date,
        this.form.value.mob_start_date,
        this.form.value.mob_end_date,
        this.form.value.volume,
        this.form.value.source_interval,
        this.form.value.sail_line_interval,
        this.form.value.streamer_length,
        this.form.value.receiver_interval,
        this.form.value.shot_point_interval,
        this.form.value.source_array,
        this.form.value.streamers,
        this.form.value.record_length,
        this.form.value.prime,
        this.form.value.infill_cap,
        this.form.value.prefix,
        this.form.value.direction,
        this.form.value.streamer_profile,
        this.form.value.planned_completion_days
      );
    }
    this.form.reset();
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0]; // file object
  //   this.form.patchValue({locationMapImage: file});
  //   this.form.get('locationMapImage').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.locationMapImagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
