// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// export class ProfilePage {
//   expandedInfo: string = '';

//   toggleInfo(section: string) {
//     this.expandedInfo = this.expandedInfo === section ? '' : section;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = null;
  expandedInfo: string = ''; // Controla as informações expandidas

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Obter o userId a partir do AuthService ou localStorage
    const userId = this.authService.getUserId(); // Assumindo que esse método retorne o userId
    if (userId) {
      this.userService.getUserDetails(userId).subscribe((user) => {
        this.user = user; // Atribui os dados ao objeto user
      });
    } else {
      console.error('User ID não encontrado');
    }
  }

  // Função para alternar entre informações expandidas
  toggleInfo(info: string) {
    this.expandedInfo = this.expandedInfo === info ? '' : info;
  }
}
