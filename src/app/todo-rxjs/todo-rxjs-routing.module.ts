import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationComponent } from './containers/todo-rxjs.component';

const routes: Routes = [
  {
    path: 'creation',
    component: CreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRxjsRoutingModule {}
