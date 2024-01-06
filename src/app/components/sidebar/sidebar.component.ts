import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faPeopleGroup, faUserGroup,faUser, faMoneyBillTransfer, faBuildingColumns, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  faHome = faHome; 
  faUserGroup = faUserGroup;
  faPeopleGroup=faPeopleGroup;
  faUser=faUser;
  faMoneyBillTransfer= faMoneyBillTransfer;
  faBuildingColumns =faBuildingColumns; 
  faRightFromBracket =faRightFromBracket;
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private oktaAuth = inject(OKTA_AUTH);

  activeLink !: string;

  home(){
    this.activeLink = 'home';
    this.router.navigate(['']);

  }

  agents(): void {
    this.activeLink = 'agents';
    this.router.navigate(['agents'], { relativeTo: this.route });

  }

  clients(): void {
    this.activeLink = 'clients';
    this.router.navigate(['clients'], { relativeTo: this.route });

  }

  transfers(){
    this.activeLink = 'transfers';
    this.router.navigate(['transfers'], { relativeTo: this.route });


  }
  profile(){
    this.activeLink = 'profile';
    this.router.navigate(['profile'], { relativeTo: this.route });

  }

  salesPoints(){
    this.activeLink = 'salesPoints';
    this.router.navigate(['salesPoints'], { relativeTo: this.route });

  }
  async logout(): Promise<void>{
    await this.oktaAuth.signOut();

  }
}
