import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Client } from '../interfaces/client';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = environment.redirectUri +'/kyc-service/api/v1/clients';

  constructor() { }


  getAllClients$ = <Observable<Client[]>>
    this.http.get<Client[]>(`${this.apiUrl}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error getting clients')
        })
      );

  saveClient$ = (client: Client) => <Observable<Client>>
    this.http.post<Client>(`${this.apiUrl}`, client, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error saving client')
        })
      );

  updateClient$ = (client: Client) => <Observable<Client>>
    this.http.put<Client>(`${this.apiUrl}/${client.id}`, client, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error updating Client')
        })
      );

  filterClients$ = (item: string, response: Client[]) => <Observable<Client[]>>
    new Observable<Client[]>(
      subscriber => {
        console.log(response);
        const filteredClients = (response).filter(Client =>
          Client?.title!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.firstName!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.email!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.phoneNumber.includes(item) ||
          Client?.identityNumber!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.address!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.countryOfAddress!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.identityType!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.nationality!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.city!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.profession!.toLowerCase().includes(item.toLowerCase()) ||
          Client?.countryOfIssue!.toLowerCase().includes(item.toLowerCase()) 


        );

        subscriber.next(filteredClients);
        subscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error filtering Clients')
        })
      );

  deleteClient$ = (clientId: string) => <Observable<any>>
    this.http.delete<any>(`${this.apiUrl}/${clientId}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error deleting Client')
        })
      );

}
