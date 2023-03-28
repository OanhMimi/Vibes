import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadsComponent } from './reads/reads.component';
import { ThoughtsComponent } from './thoughts/thoughts.component';
import { HabitsComponent } from './habits/habits.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'habits-component', component: HabitsComponent},
  { path: 'thoughts-component', component: ThoughtsComponent},
  { path: 'reads-component', component: ReadsComponent},
  // { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
