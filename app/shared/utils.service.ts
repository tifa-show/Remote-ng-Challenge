import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    // @ts-ignore
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
