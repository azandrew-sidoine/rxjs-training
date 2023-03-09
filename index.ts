import './style.css';

import { of, map, Observable, from, fromEvent, filter, reduce } from 'rxjs';

// Version <= 7
// Importation des fonction de création depuis rxjs
// Importation des fonction de transformation depuis rxjs/operators

// Version >= 7
// Importation des fonction de création depuis rxjs
// Importation des fonction de transformation depuis rxjs

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

// Functions de création
// Note: Les fonctions de création nous permettent de créer un conteneur de flux
// observable
/**
 * Ce conteneur de flux de données produit une liste de nombre divible par deux
 * inférieur ou égale à 100
 * Create par construction
 */
const observable$ = new Observable((subscriber) => {
  // Le souscripteur a deux méthodes bien défini
  // next() - Pour produire un nouveau flux
  for (let num = 0; num <= 10; num++) {
    if (num % 2 === 0) {
      subscriber.next(num);
    }
  }
  // complete() - Pour fermer le conteneur de production
  subscriber.complete();

  // subscriber.next(240);
  // subscriber.next(300);
});

// Fonction de créaction `of`
const observable2$ = of('Hi Paul, Welcome to rxjs tutorial.');

// Fonction de création from
// A la différence de la fonction de création of, lui il s'attend a un type observable
// Conteneur (Ex: Array, Map), un object de type Observable RxJs, une Promsesse (Promise), etc...
const observable3$ = from([1, 2, 3, 4, 5]);
const observable4$ = of([1, 2, 3, 4, 5]);
const observable5$ = of(
  Promise.resolve('Hi Fernanda, Welcome to rxjs tutorial.')
);
const observable6$ = from(
  Promise.reject('Hi Fernanda, Welcome to rxjs tutorial.')
);

// fromEvent - Crée un conteneur de flux de données depuis un événement du DOM
fromEvent(window, 'click').subscribe((event) => console.log(`Event: ${event}`));

// Function de transformation
// Note: Les fonction de transformation sont appliqués sur chaque élement du conteneur de flux de données source, via l'interface `pipe()`
const array = new Array(10).keys();
const observable7$ = from(array).pipe(
  filter((state) => state % 2 === 0), // Première fonction de transformation - Retire les élément non divisible par 2
  map((state) => state * 2), // Second fonction de transformation: Multiplie chaque élement par 2,
  reduce((acc, current) => {
    acc += current;
    return acc;
  }, 0)
);

// Création d'une fonction de transformation

function filterMapReduce(observable: Observable<number>) {
  return observable.pipe(
    filter((state) => {
      console.log('In filter: ', state);
      return state % 2 === 0;
    }), // Première fonction de transformation - Retire les élément non divisible par 2
    map((state) => state * 2), // Second fonction de transformation: Multiplie chaque élement par 2,
    reduce((acc, current) => {
      acc += current;
      return acc;
    }, 0)
  );
}

const observable8$ = from(array).pipe(filterMapReduce);

// Souscription
// La sousccription a un conteneur de flux de données est faite à base de la méthode `subscribe`
observable$.subscribe((value) => console.log(`Souscripteur: ${value}`));

observable2$.subscribe(console.log);
console.log('Observable from');
observable3$.subscribe(console.log);
console.log('Observable of');
observable4$.subscribe(console.log);
console.log('Observable from promise');
observable5$.subscribe(console.log);
console.log('Observable from promise');
observable6$.subscribe({
  next: console.log,
  error: (err) => console.error(err),
  complete: () => console.log('Observable completed'),
});

console.log('Observable from');
observable7$.subscribe(console.log);

console.log('Observable from 8');
observable8$.subscribe(console.log);
