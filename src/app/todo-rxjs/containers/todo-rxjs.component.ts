import { Component, OnInit } from '@angular/core';
import {
  Observable,
  of,
  from,
  Subject,
  BehaviorSubject,
  range,
  fromEvent,
  interval,
  generate,
  timer
} from 'rxjs';
import { map, tap, take, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creation',
  template: `
    <div fxLayout="column" fxFlex style="margin:12px 24px 0px 24px">
      <div fxLayout="row" fxLayoutAlign="center center">
        <div fxFlex="33.3"></div>
        <div fxFlex="33.3"><h3>Demo Rxjs Creation</h3></div>
        <div fxFlex="33.3"></div>
      </div>
      <div fxLayout="row">
        <div fxFlex="20">Creation</div>
        <div fxFlex="20">Combine</div>
        <div fxFlex="20">Filter</div>
        <div fxFlex="20">Tranformation</div>
        <div fxFlex="20">Util</div>
      </div>
      <div fxLayout="row" fxFlex>
        <div fxFlex="20">
          <div fxFlex="50">
            <div>
              <button mat-raised-button (click)="usingNext()">next</button>
            </div>
            <div>
              <button mat-raised-button (click)="usingFrom()">from</button>
            </div>
            <div><button mat-raised-button (click)="usingOf()">of</button></div>
            <div>
              <button mat-raised-button (click)="usingRange()">Range</button>
            </div>
            <div>
              <button
                mat-raised-button
                #forFormEvent
                (click)="usingFormEvent()"
              >
                fromEvent
              </button>
            </div>
            <div>
              <button mat-raised-button (click)="usingFormInterval()">
                interval
              </button>
            </div>

            <div>
              <button mat-raised-button (click)="usingForTimer()">
                Timer
              </button>
            </div>

            <div>
              <button mat-raised-button (click)="usingForGenerate()">
                generated
              </button>
            </div>
          </div>
          <div fxFlex="50">
            <h5>next : {{ makeForNext$ | async }}</h5>
            <h5>from :{{ makeForFrom$ | async }}</h5>
            <h5>of :{{ makeForOf$ | async }}</h5>
            <h5>range :{{ makeForRange$ | async }}</h5>
            <h5>fromEvent:{{ makeForFormEvent$ | async | json }}</h5>
            <h5>Interval:{{ makeForInterval$ | async }}</h5>
            <h5>Timer :{{ makeForTimer$ | async }}</h5>
            <h5>generated :{{ makeForGenerate$ | async }}</h5>
          </div>
        </div>
        <div fxFlex="20">B</div>
        <div fxFlex="20">C</div>
        <div fxFlex="20">D</div>
        <div fxFlex="20">E</div>
      </div>
    </div>
  `,
  styles: []
})
export class CreationComponent implements OnInit {
  // for creation 
  makeForNext$: Observable<number>;
  makeForFrom$: Observable<number>;
  makeForOf$: Observable<number>;
  makeForRange$: Observable<number>;
  makeForFormEvent$: Observable<any>;
  makeForInterval$: Observable<number>;
  makeForTimer$: Observable<number>;
  makeForGenerate$: Observable<number>;

  // for Combination (รวมของ)
  

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  nextToCombine(): void {
    this.router.navigate(['/combine'], { relativeTo: this.activatedRoute });
  }

  // Defining observers
  /*
  next	Required. A handler for each delivered value. Called zero or more times after execution starts.
  error	Optional. A handler for an error notification. An error halts execution of the observable instance.
  complete	Optional. A handler for the execution-complete notification.
  Delayed values can continue to be delivered to the next handler after execution is complete.
  */

  usingNext(): void {
    this.makeForNext$ = new Observable(sub => {
      // สร้างใหม่มาเรื่อย
      sub.next(0),
        setTimeout(
          () => {
            sub.next(1), sub.complete();
          },
          1000,
          setInterval(() => sub.next(4), 1000)
        );
    });
  }

  usingFrom(): void {
    this.makeForFrom$ = from([1, 2, 3]);
  }

  usingOf(): void {
    this.makeForOf$ = of(1); //  ทำงานครั้งเดียว ( เรียก   . next  แล้ว  complete ต่อเลย )
  }

  usingRange(): void {
    this.makeForRange$ = range(1, 100);
    this.makeForRange$.subscribe(x => console.log(x));
  }

  usingFormEvent(): void {
    this.makeForFormEvent$ = fromEvent(document, 'click');
    this.makeForFormEvent$.subscribe(x => console.log(x));
  }

  usingFormInterval(): void {
    // หน่วงครั้งละ 1 วินาทีแล้วเพิ่มขุ้นเรื่อย
    this.makeForInterval$ = interval(1000).pipe(
      map(v => v),
      take(100)
    );
    this.makeForInterval$.subscribe(n =>
      console.log(`It's been ${n} seconds since subscribing!`)
    );
  }

  usingForTimer(): void {
    //  รอ 1 วิ่นาทีแล้วอัดเต็มที่ ( กำหนดค่าเริมต้นได้ )
    this.makeForTimer$ = timer(1000, 1).pipe(
      map(v => v),
      take(100)
    );
    this.makeForTimer$.subscribe(v => console.log(v));
  }

  usingForGenerate(): void {
    this.makeForGenerate$ = generate(
      //   too = for(v = 0 ; v < 100; v++ )
      0,
      v => v < 100,
      v => v + 1
    );

    this.makeForGenerate$.subscribe(n => {
      console.log(`It's been ${n} seconds since subscribing!`);
    });
  }
}
