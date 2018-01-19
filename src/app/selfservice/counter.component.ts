import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable} from 'rxjs';

@Component({
    selector: 'counter',
    template: `<div>
                    <button (click)="decrement()">Decrement</button>
                    <button (click)="increment()">Increment</button>
                    <p> Counter: {{ count | async }} </p>
                </div>`
})
export class CounterComponent {
    count: Observable<Number>;

    constructor() {
        // convert event listeners into observables
        //const decrementCounter$ = Observable.create(observer => {
        //    this.decrement = () => {
        //        observer.next();
        //    };
        //});
        //const incrementCounter$ = Observable.create(observer => {
        //    this.increment = () => {
        //        observer.next();
        //    };
        //});

        //// set up the intent
        //const intent$ = Observable.merge(
        //    decrementCounter$.map(() =>
        //        -1),
        //    incrementCounter$.map(() =>
        //        +1)
        //);

        // declare how the intent is transformed into a model
        //this.count = intent$
        //    .startWith(0)
        //    .scan((currentCount, value)
        //        =>
        //        currentCount + value);

        // the observable model is bound to the user interface in the template.
        // observables are understood via the async pipe
    }
}