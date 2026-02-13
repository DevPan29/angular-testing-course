import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

fdescribe("Async Testing Examples", () => {
    
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

    fit("Asyncronous text example - plain Promise", fakeAsync(() => {

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

})