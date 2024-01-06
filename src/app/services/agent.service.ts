import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Agent } from '../interfaces/agent';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'http://agent-service/api/v1/agents';

  constructor() { }


  getAllAgents$ = <Observable<Agent[]>>
    this.http.get<Agent[]>(`${this.apiUrl}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error getting agents')
        })
      );

  saveAgent$ = (agent: Agent) => <Observable<Agent>>
    this.http.post<Agent>(`${this.apiUrl}`, agent, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error saving agent')
        })
      );

  updateAgent$ = (agent: Agent) => <Observable<Agent>>
    this.http.put<Agent>(`${this.apiUrl}`, agent, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error updating agent')
        })
      );

  filterAgents$ = (item: string, response: Agent[]) => <Observable<Agent[]>>
    new Observable<Agent[]>(
      subscriber => {
        console.log(response);
        const filteredAgents = (response).filter(agent =>
          agent?.lastName!.toLowerCase().includes(item.toLowerCase()) ||
          agent?.firstName!.toLowerCase().includes(item.toLowerCase()) ||
          agent?.email!.toLowerCase().includes(item.toLowerCase()) ||
          agent?.phoneNumber.includes(item)
        );

        subscriber.next(filteredAgents);
        subscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error filtering agents')
        })
      );

  deleteAgent$ = (agentId: string) => <Observable<any>>
    this.http.delete<any>(`${this.apiUrl}/${agentId}`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error deleting agent')
        })
      );

}
