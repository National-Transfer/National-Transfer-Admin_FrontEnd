import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { SalesPoint } from '../interfaces/sales-point';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class SalesPointService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://localhost:8091/agency-service/api/v1/salesPoints';

  constructor() { }


  getAllSalesPoints$ = <Observable<SalesPoint[]>>
    this.http.get<SalesPoint[]>(`${this.apiUrl}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error getting salespoints')
        })
      );


  saveSalesPoint$ = (salesPoint: SalesPoint) => <Observable<SalesPoint>>
    this.http.post<SalesPoint>(this.apiUrl, salesPoint, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          console.log(this.apiUrl);
          return of ('error saving agent')
        })
      );

  updateSalespoint$ = (salesPoint: SalesPoint) => <Observable<SalesPoint>>
    this.http.put<SalesPoint>(`${this.apiUrl}/${salesPoint.id}`, salesPoint, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error updating agent')
        })
      );

  deleteSalesPoint$ = (salesPointId: string) => <Observable<any>>
    this.http.delete<any>(`${this.apiUrl}/${salesPointId}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error deleting agent')
        })
      );

}
