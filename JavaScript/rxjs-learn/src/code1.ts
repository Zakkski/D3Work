import * as Rx from "rxjs";

// cold observable
var observable = Rx.Observable.create((observer: any) => {
    try {
        observer.next('Hey guys!');
        observer.next('How are you');
        setInterval(() => {
            observer.next('I am good')
        }, 2000)
        // observer.complete();
        // observer.next('Not send');
    } catch (err) {
        observer.error(err);
    }
});

const observer = observable.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem('Completed')
);

const observer2 = observable.subscribe(
    (x: any) => addItem(x)
);

// allows you to tie observers together
observer.add(observer2);

setTimeout(() => {
    observer.unsubscribe();
}, 6001)

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}