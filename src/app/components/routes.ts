import { Route } from "@angular/router";
import { AgentsComponent } from "./agents/agents.component";
import { ClientsComponent } from "./clients/clients.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { SalesPointsComponent } from "./sales-points/sales-points.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { TransfersComponent } from "./transfers/transfers.component";

export const APP_ROUTES: Route[] = [

    {
        path: '', component: NavigationComponent, children: [

            {
                path: '', component: HomeComponent,
            },
            {
                path: 'agents', component: AgentsComponent
            },
            {
                path: 'clients', component: ClientsComponent

            },
            {
                path: 'transfers', component: TransfersComponent
            },
            {
                path: 'profile', component: ProfileComponent
            },
            {
                path: 'salesPoints', component: SalesPointsComponent
            },
        ]
    }

]