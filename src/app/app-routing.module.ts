import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetComponent } from './components/set/set.component';
import { SetsComponent } from './components/sets/sets.component';

const routes: Routes = [
  { path: '', component: SetsComponent },
  { path: 'set/:code', component: SetComponent },
  { path: '**', component: SetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
