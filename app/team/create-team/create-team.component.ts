import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RiderMember, Team} from "../../models/team";
import {UtilsService} from "../../shared/utils.service";
import {ApisService} from "../../shared/apis.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit, OnDestroy {

  // @ts-ignore
  teamProfileForm: FormGroup;
  // @ts-ignore
  items: FormArray;
  team: Team = {} as Team;
  // @ts-ignore
  response: Subscription;

  constructor(private fb: FormBuilder, private util: UtilsService, private api: ApisService, private router: Router) {
    this.initTeamForm();
  }

  get riders() {
    return this.teamProfileForm.get('riders') as FormArray;
  }

  initTeamForm() {
    this.teamProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      tshirt_color: ['', Validators.required],
      photo: [''],
      riders: this.fb.array([this.createItem()]),
    });
  }

  ngOnInit(): void {
    console.log('riders are ', this.riders.controls?.length);
  }

  addItem(): void {
    this.items = this.teamProfileForm.get('riders') as FormArray;
    this.items.push(this.createItem());
  }

  removeItem(i: number) {
    this.riders.removeAt(i);
  }

  createItem(): FormGroup {
    return this.fb.group({
      rider_id: ['', Validators.required],
      rider_phone: ['', Validators.required],
    });
  }

  submitData() {
    this.team.riders_ids = [] as RiderMember[];
    console.warn(this.teamProfileForm.value.photo);
    this.team.name = this.teamProfileForm.value.name;
    this.team.email = this.teamProfileForm.value.email;
    this.team.phone = this.teamProfileForm.value.phone;
    this.team.tshirt_color = this.teamProfileForm.value.tshirt_color;
    this.riders.controls.forEach(i => {
      this.team.riders_ids.push({
        riders: i.value.rider_id,
        phone: i.value.rider_phone
      } as RiderMember)
    });
    this.response = this.api.createTeamWithRelatedRiders(this.team).subscribe(result => {
      this.router.navigate(['/riders']);
    }, error => {
      console.error('issue are ', JSON.stringify(error));
    });
  }

  onFileSelected(event: any) {
    this.util.convertFile(event.target.files[0]).subscribe(base64 => {
      // console.log('base are' , base64);
      this.team.image = base64;
    });
  }

  ngOnDestroy(): void {
    this.response.unsubscribe();
  }

}
