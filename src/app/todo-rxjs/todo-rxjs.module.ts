import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRxjsRoutingModule } from './todo-rxjs-routing.module';
import { CreationComponent } from './containers/todo-rxjs.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreationComponent],
  imports: [
    CommonModule,
    TodoRxjsRoutingModule,
    FlexLayoutModule,
    // material
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class TodoRxjsModule {}
