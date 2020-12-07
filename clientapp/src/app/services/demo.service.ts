import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FileType} from "../domain/file-type";

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor(private httpClient: HttpClient) { }

  getFileTypes: () => Observable<FileType[]> = () => {
    console.log(`calling backend at ${environment.apiBaseUrl}/api/file-types`)
    return this.httpClient.get<FileType[]>(`${environment.apiBaseUrl}/api/file-types`);
  }
}
