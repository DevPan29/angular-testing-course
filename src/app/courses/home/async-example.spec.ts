import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { delay, of } from "rxjs";

describe("Async Testing Examples", () => {
    
    it("Asynchronous test example with Jasmine done", (done: DoneFn) => {

        let test = false;

        setTimeout(() => {

            test = true;
            expect(test).toBeTruthy();

            done();

        }, 1000);

    })

    it("Asyncronous text example with setTimeout()", fakeAsync(() => {

        let test = false;

        setTimeout(() => {
            console.log("running assertions 1");
        })

         setTimeout(() => {

            console.log("running assertions 2");

            test = true;
            


        }, 1000);

        flush();
        expect(test).toBeTruthy();

    }))

    it("Asyncronous text example - plain Promise", fakeAsync(() => {

        let test = false;

        console.log("Creating promise");

        Promise.resolve().then(() => {
            console.log("Promise first then() evaluated sucessfully ");

             test = true;
            
            return Promise.resolve();
        })
            .then(() => {

            console.log("Promise second then() evaluated sucessfully ");

        
        });

        flushMicrotasks();

        console.log("Running test assertions");

        expect(test).toBeTruthy();
    }))

    it("Asyncronous text example - plain Promise + setTimeout()", fakeAsync(() => {

        let counter = 0;

        Promise.resolve()
            .then(() => {
                counter += 10;

                setTimeout(() => {
                    counter += 1;
                }, 1000)
            });

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(11);
    }))


    it("Asyncronous text example - Observabels", fakeAsync(() => {

        let test = false;

        console.log('Creating Observable');

        const test$ = of(test).pipe(delay(1000));

        test$.subscribe(() => {

            console.log('inner subscribe');
            test = true;
        })

        tick(1000);

        console.log('Running test assertions');

        expect(test).toBe(true);

    }));
})