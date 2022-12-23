import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IAncestor } from './shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_SERVER: string = 'https://c71up49u6l.execute-api.us-east-1.amazonaws.com/prod/';
  private FETCH_TOP: number = 15;

  ancestors = [
    { uuid: 1, surname: "Freeland", forename: "Richard", birth_year: "1980" },
    { uuid: 2, surname: "Freeland", forename: "Setova", birth_year: "1982" },
    { uuid: 3, surname: "Freeland", forename: "Catherine", birth_year: "2012" },
    { uuid: 4, surname: "Freeland", forename: "Alexandra", birth_year: "2015" }
  ];

  constructor(private httpClient: HttpClient) {
  }

  public getAncestorsTop(): Observable<IAncestor[]> {
    return this.httpClient.get<IAncestor[]>(this.API_SERVER + `detailsTop/${this.FETCH_TOP}`)
      .pipe(catchError(this.handleError))
  }

  public getAncestorsBySurname(surname: string): Observable<IAncestor[]> {
    return this.httpClient.get<IAncestor[]>(this.API_SERVER + `detailsBySurname/${surname}`)
      .pipe(catchError(this.handleError))
  }

  public getAncestorsByAddress(addr: string): Observable<IAncestor[]> {
    return this.httpClient.get<IAncestor[]>(this.API_SERVER + `detailsByAddr/${addr}`)
      .pipe(catchError(this.handleError))
  }

  public getAncestor(id: string): Observable<IAncestor> {
    return this.httpClient.get<IAncestor>(this.API_SERVER + `details/${id}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
