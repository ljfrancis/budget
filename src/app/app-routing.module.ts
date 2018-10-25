import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonthComponent } from './components/month/month.component';
import { YearComponent } from './components/year/year.component';

const routes: Routes = [
  { path: '',   redirectTo: '/month', pathMatch: 'full'},
  { path: 'month',     component: MonthComponent}, 
  { path: 'month/:month',     component: MonthComponent},
  { path: 'month/:month/:year',     component: MonthComponent},
  { path: 'year',     component: YearComponent}, 
  { path: 'year/:year',     component: YearComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}