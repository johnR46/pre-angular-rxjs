import { Injectable, ErrorHandler } from '@angular/core';
import { ApiService } from 'src/app/todo-rxjs/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    console.log(displayMessage); // use to show and display  !

    super.handleError(error);
  }
}
