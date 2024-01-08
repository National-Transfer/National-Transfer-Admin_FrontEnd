import { Component, Inject, OnInit, inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { filter, map } from 'rxjs';


interface Claim {
  claim: string;
  value: unknown;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  claims: Claim[] = [];

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {

  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));

    console.log(this.claims);
    
  }


}
