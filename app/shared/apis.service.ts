import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {IRider} from "../models/rider";
import {IReponseWrapper} from "../models/response-wrapper";
import {Team} from "../models/team";


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) {
  }

  private _riders = new BehaviorSubject<IRider[]>([]);

  get riders(): BehaviorSubject<IRider[]> {
    return this._riders;
  }

  getRidersList() {
    this.http.get('http://15.184.90.114/riders_list')
      .subscribe(info => {
        let response = info as IReponseWrapper<IRider>;
        this._riders.next(response.data);
      })
  }

  createTeamWithRelatedRiders(team: Team) {
    return  this.http.post('http://15.184.90.114/register_new_team', team);
  }
}
