import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
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

  logout() {
    this.authService
      .logout()
      .then(() => {
        // Redirecionar para a página de login após o logout
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erro ao fazer logout', error);
      });
  }
}
