import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { LoginComponent } from './components/login/login.component'


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "opportunities", component: OpportunitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents  = [DashboardComponent, HomepageComponent]
