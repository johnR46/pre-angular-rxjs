import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRxjsRoutingModule } from './todo-rxjs-routing.module';
import { CreationComponent } from './containers/creation.component';
import { CombinationComponent } from './containers/combination.component';
import { FilteringComponent } from './containers/filtering.component';
import { TransformationComponent } from './containers/transformation.component';
import { UtilityComponent } from './containers/utility.component';


@NgModule({
  declarations: [CreationComponent, CombinationComponent, FilteringComponent, TransformationComponent, UtilityComponent],
  imports: [
    CommonModule,
    TodoRxjsRoutingModule
  ]
})
export class TodoRxjsModule { }
