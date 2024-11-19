// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-splash',
//   templateUrl: './splash.page.html',
//   styleUrls: ['./splash.page.scss'],
// })
// export class SplashPage implements OnInit {

//   constructor(private router : Router) { }

//   ngOnInit() {
//     setTimeout(()=>{
//       this.router.navigateByUrl('home');
//     },2000);
//   }

// }



// ------------------------------
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-splash',
//   templateUrl: './splash.page.html',
//   styleUrls: ['./splash.page.scss'],
// })
// export class SplashPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }





import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {
  showFirstSplash = true;
  showSecondSplash = false;
  showLoadingBalls = false; 

  constructor(private router: Router) {
    this.initializeSplashes();
  }

  initializeSplashes() {
    //primeira splash
    setTimeout(() => {
      this.showFirstSplash = false;
      this.showSecondSplash = true;

      setTimeout(() => {
        this.showLoadingBalls = true;

        setTimeout(() => {
          this.showSecondSplash = false;
          this.router.navigate(['/login']); // rota da página principal
        }, 3000); 
      }, 2000);
    }, 3000); 
  }
}


