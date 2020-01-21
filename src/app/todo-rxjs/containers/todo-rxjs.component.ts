import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  concat,
  forkJoin,
  from,
  fromEvent,
  generate,
  interval,
  merge,
  Observable,
  of,
  range,
  timer,
  combineLatest,
  zip
} from 'rxjs';
import {
  map,
  startWith,
  take,
  tap,
  filter,
  takeUntil,
  concatMap,
  mergeMap,
  mergeAll,
  switchAll,
  concatAll,
  exhaust,
  switchMap,
  delay
} from 'rxjs/operators';
// อันไหนใช้ใน pipe  ให้  import  มาจาก rxjs/operators return type operators function
// อันไหนจะ get ค่าออกมาเฉยๆ เนี่ย หรือจะยัดเข้า เอามาจาก  rxjs ( return type data)
import { ApiService } from '../api.service';

interface CustomForZip {
  age: number;
  name: string;
  isDev: boolean;
}

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
        <div fxFlex="20">
          <div fxLayout="row">
            <div>
              price : <input [formControl]="price" />
              <br />
              qty : <input [formControl]="qty" />
              <br />
              amount : <input [formControl]="amount" />
            </div>
          </div>
          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingConcat()">
                Concat
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              concat : {{ makeForConcat$ | async }}
            </h5>
          </div>
          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingForkJoin()">
                forkJoin😎
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              forkJoin: {{ makeForforkJoin$ | async }}
            </h5>
          </div>
          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingMerge()">
                merge 😂 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              merge: {{ makeForMerge$ | async }}
            </h5>
          </div>
          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingZip()">
                zip 😂 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              zip: {{ makeForZip$ | async | json }}
            </h5>
          </div>
        </div>
        <div fxFlex="20">
          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingFilter()">
                filter 😒 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              filter: {{ makeForFilter$ | async }}
            </h5>
          </div>

          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingTake()">
                take 😒 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              take: {{ makeForTake$ | async }}
            </h5>
          </div>

          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingTakeUntil()">
                takeUtil 😒 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              takeUntil: {{ makeFortakeUntil$ | async }}
            </h5>
          </div>
        </div>
        <div fxFlex="20">
          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingConcatMap()">
                concatMap 🤣 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              concatMap: {{ makeForConcatMap$ | async }}
            </h5>
          </div>

          <div fxLayout="row">
            <div>
              <button mat-raised-button (click)="usingMap()">
                Map 🤣 :
              </button>
            </div>
            <h5 style="margin:9px 0px 3px 10px">
              Map: {{ makeForMap$ | async }}
            </h5>
          </div>
        </div>
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
  price: FormControl = new FormControl(0);
  qty: FormControl = new FormControl(0);
  amount: FormControl = new FormControl(0);
  makeForConcat$: Observable<number>; // รอลำดับการทำงาน ก่อน หลัง ( แล้วรวมเป็นกันเป็น 1 ผลลัพธ์ )
  makeForforkJoin$: Observable<any[]>;
  makeForMerge$: Observable<number | number | number>;
  makeForZip$: Observable<CustomForZip>;

  // Filtering     filter , take, takeUntil
  makeForFilter$: Observable<number>;
  makeForTake$: Observable<number>;
  makeFortakeUntil$: Observable<number>;

  //  Transformation  map, concatMap , mergeMap, switchMap
  // operator ที่มีความสามารถของ Mapping และ Flattening รวมกัน  concatMap , mergeMap, switchMap
  // Flattening เดียวๆ  concatAll() , mergeAll(), switchAll() , exhaust()

  // switchMap (map + switchAll) : “Fashion” Operator ?

  makeForMap$: Observable<number>;
  makeForConcatMap$: Observable<number>;

  playerObservable = of('Miracle', 'Topson');

  http = {
    getMessage(name): Observable<string> {
      return of(`${name} is Awesome`, `${name} is cool!`);
    }
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.amount.disable();
    this.UsingCombineLatest();

    this.playerObservable
      .pipe(
        map(name => this.http.getMessage('john')),
        // concatAll()
        exhaust()
        // mergeAll(),
        // switchAll()
      )
      .subscribe(console.log);
  }

  usingConCatMap(): void {
    const req = timer(1000, 1000)
      .pipe(
        map(v => v),
        concatMap(v => of('A' + v))
      )
      .subscribe(v => console.log(v));
  }

  usingSwitchMap(): void {
    const req = timer(1000, 1000)
      .pipe(
        map(v => v),
        switchMap(v => of('A' + v))
      )
      .subscribe(v => console.log(v));
  }

  usingMap(): void {
    // ไม่ต่างอะไรกับการ map arr  ไม่มีมีการ  sub ค่าก่อนหน้ามาใช้เหมือนกับ concatMap() แค่นั้นแหละ ถถถ
    // การเปลี่ยนแปลง collection ของชุดข้อมูลให้เป็นชุดข้อมูลที่มีขนาดเท่าเดิมแต่เป็นชุดข้อมูลใหม่
    const source = of(1);
    this.makeForMap$ = source.pipe(map(v => v));
  }

  usingConcatMap(): void {
    // Mapping และ Flattening (subค่าละเอาไปใช้ต่อ)
    // เอาผลลัพํธ์ออกมาจากอันแรกแล้วทำต่อจากนั้นรับ val กลับมา
    const source = of(1);
    this.makeForConcatMap$ = source.pipe(
      concatMap(v => of(v + 1).pipe(concatMap(x => of(x + 1))))
    ); // 1   //  2                       // 3
    //  รออันก่อนหน้าทำเสร็จ แล้ว sub ละเอา value มาส่งต่อไปยิง req
    // concatMap อันแรกรับมาจาก source  ได้  v = 1  ยิง  req  ไป  + 1 (  v + 1 = 2 )
    // เสร็จแล้ว pipe ไปแล้ว concatMap อันที่สองรับ x = 2  แล้วยิงไป บวกอีก 1 เป็น 3 จากนั้นโยนค่าให้ตัวแรกสุด
  }

  usingTakeUntil(): void {
    // ปล่อยของไปเรื่อยจนกว่าจะมีการแจ้งเตือนเข้ามาค่อยหยุดพูด
    const source = interval(1000);
    const trick = timer(5000).pipe(take(1));
    this.makeFortakeUntil$ = source.pipe(takeUntil(trick));
  }
  usingTake(): void {
    // เอากี่ครั้ง  ในนี้คือเอา 10 ครั้ง แล้ว unsub
    this.makeForTake$ = interval(1000).pipe(take(10));
  }

  usingFilter(): void {
    this.makeForFilter$ = of(1, 3, 5, 7, 9, 6).pipe(
      filter(v => v % 2 === 0), // กรองอันที่เป็นเลขคี่ออก
      tap(console.log)
    );
  }

  usingZip(): void {
    const age$ = of<number>(20, 21, 22);
    const name$ = of<string>('Foo', 'Bar', 'Beer');
    const isDev$ = of<boolean>(true, true, false);

    // ใช้ห่อของ ?  ลองทำเป็น  interface แปป
    this.makeForZip$ = zip(age$, name$, isDev$).pipe(
      // map(([CustomForZip]) => ({ CustomForZip }))
      map(([age, name, isDev]) => ({ age, name, isDev }))
    );

    this.makeForZip$.subscribe(v => {
      console.log(v);
    });
  }

  private UsingCombineLatest() {
    const priceChange$: Observable<number> = this.price.valueChanges.pipe(
      map(v => +v), // แปลงเป็น number
      startWith(0), // บังคับให้เริ่ม
      tap(console.log)
    );
    const qtyChange$: Observable<number> = this.qty.valueChanges.pipe(
      map(v => +v),
      startWith(0),
      tap(console.log)
    );
    const updatedAmount = combineLatest(priceChange$, qtyChange$);
    updatedAmount.subscribe((v: number[]) => {
      this.amount.setValue(v[0] * v[1]);
    });
  }
  usingConcat(): void {
    // ทำ  ทีละอัน แล้วเอามาต่่อกันเป็น observable เดียวกัน
    const timerMock = interval(1000).pipe(take(3));
    const sequenceMock = range(1, 10);
    this.makeForConcat$ = concat(timerMock, sequenceMock);
    this.makeForConcat$.subscribe(console.log);
  }

  usingForkJoin(): void {
    // ต่างคนต่างทำ รอจนเสร็จแล้วค่อยเอาผลลัพธ์มารวมกัน (ออกเป็น  Array result ของอันที่ 1 , 2 , n )
    const timerMock = interval(1000).pipe(take(2));
    const sequenceMock = range(1, 10);
    this.makeForforkJoin$ = forkJoin(timerMock, sequenceMock);
    this.makeForforkJoin$.subscribe(v => {
      console.log('timer :', v[0]);
      console.log('sequenceMock :', v[1]);
    });
  }

  usingMerge(): void {
    const timer1 = interval(1000).pipe(take(10));
    const timer2 = interval(2000).pipe(take(6));
    const timer3 = interval(500).pipe(take(10));
    const concurrent = 2; // จำนวนที่เปิดให้ออกครั้งละเท่าไหร่
    //  คล้ายๆ กับ concat  แต่ว่า อันนี้คือจับมารวมกัน ให้เป็น  Observable  เดียว ( รถ (observable) อยู่ในคนละถนน
    // merge คือการขับออกจากถถนที่อยู่ไปรวมกันตรงถนนใหญ่ ไรงี้ )
    // เสร็จก่อนออกก่อน
    this.makeForMerge$ = merge(timer1, timer2, timer3, concurrent);

    this.makeForMerge$.subscribe(v => {
      console.log(v);
    });
  }

  // Defining observers
  /*
  next	Required. A handler for each delivered value. Called zero or more times after execution starts.
  error	Optional. A handler for an error notification. An error halts execution of the observable instance.
  complete	Optional. A handler for the execution-complete notification.
  Delayed values can continue to be delivered to the next handler after execution is complete.

  Creation	from,fromEvent, of
  Combination	combineLatest, concat, merge, startWith , withLatestFrom, zip
  Filtering	debounceTime, distinctUntilChanged, filter, take, takeUntil
  Transformation	bufferTime, concatMap, map, mergeMap, scan, switchMap
  Utility	tap

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
    // 3 วิ จากนั้นให้พ่น count ออกมาครั้งละ 1 ทุกๆ 1 วินาที  คล้ายกันกับ interval แต่ตัวนี้กำหนดเวลาเริ่มทำงานได้
    this.makeForTimer$ = timer(3000, 500).pipe(take(100));
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
