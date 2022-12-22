import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ancestors = [
    {uuid: 1, surname: "Freeland", forename: "Richard", birth_year: "1980"},
    {uuid: 2, surname: "Freeland", forename: "Setova", birth_year: "1982"},
    {uuid: 3, surname: "Freeland", forename: "Catherine", birth_year: "2012"},
    {uuid: 4, surname: "Freeland", forename: "Alexandra", birth_year: "2015"}
  ];

  constructor() { }

  public getAncestors():Array<{uuid, surname, forename, birth_year}>{
    return this.ancestors;
  }
}
