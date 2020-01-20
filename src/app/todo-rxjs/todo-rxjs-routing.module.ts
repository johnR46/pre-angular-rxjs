import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombinationComponent } from './containers/combination.component';
import { CreationComponent } from './containers/creation.component';
import { FilteringComponent } from './containers/filtering.component';
import { TransformationComponent } from './containers/transformation.component';
import { UtilityComponent } from './containers/utility.component';

const routes: Routes = [
  {
    path: 'creation',
    component: CreationComponent
  },
  {
    path: 'combine',
    component: CombinationComponent
  },
  {
    path: 'filter',
    component: FilteringComponent
  },
  {
    path: 'tranform',
    component: TransformationComponent
  },
  {
    path: 'util',
    component: UtilityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRxjsRoutingModule {}
