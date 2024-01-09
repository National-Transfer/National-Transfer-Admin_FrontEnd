import { Component, inject } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import {ChartData} from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faUsersLine, faUsers, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, filter, map } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgChartsModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faUsersLine=faUsersLine;
  faUsers=faUsers;
  faArrowRightArrowLeft=faArrowRightArrowLeft;

  datasets: ChartData <'bar', {key: string, value: number} []> = {
    datasets: [{
      data: [{key: 'Clients', value: 2}, {key: 'Agents', value: 1}],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };

  transfers: ChartData <'bar', {key: string, value: number} []> = {
    datasets: [{
      data: [{key: 'Transfers', value: 2}],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };

  public name$!: Observable<string>;
  private oktaAuthStateService = inject(OktaAuthStateService);

  public ngOnInit(): void {
    this.name$ = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    
    
  }
  
}
