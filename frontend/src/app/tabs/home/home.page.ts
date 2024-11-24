import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
}
// import { Component } from '@angular/core';
// import { InfiniteScrollCustomEvent } from '@ionic/angular';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {
//   loadMore(event: InfiniteScrollCustomEvent) {
//     setTimeout(() => {
//       // Lógica para carregar mais itens, você pode carregar mais dados aqui
//       event.target.complete();
//     }, 1000);
//   }
// }
