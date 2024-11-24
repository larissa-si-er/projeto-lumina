// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// // export class ProfilePage implements OnInit {

// //   constructor() { }

// //   ngOnInit() {
// //   }

// // }
// export class ProfilePage {
//   expandedInfo: string | null = null; // Controla a exibição das informações
//   isModalOpen: boolean = false; // Controla a exibição do modal

//   // Alterna a visibilidade das informações
//   toggleInfo(section: string) {
//     this.expandedInfo = this.expandedInfo === section ? null : section;
//   }

//   // Abre o modal
//   openHoursPopup() {
//     this.isModalOpen = true;
//   }

//   // Fecha o modal
//   closeModal() {
//     this.isModalOpen = false;
//   }

//   // Callback para quando o modal for fechado
//   onModalDismiss() {
//     this.isModalOpen = false;
//   }
// }
//funcionou esse basicooooooooooooooooooooo:::::::::::::
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// export class ProfilePage {
//   expandedInfo: string | null = null; // Controla a exibição das informações
//   isModalOpen: boolean = false; // Controla a exibição do modal

//   // Alterna a visibilidade das informações
//   toggleInfo(section: string) {
//     this.expandedInfo = this.expandedInfo === section ? null : section;
//   }

//   // Abre o modal
//   openHoursPopup() {
//     this.isModalOpen = true;
//   }

//   // Fecha o modal
//   closeModal() {
//     this.isModalOpen = false;
//   }

//   // Callback para quando o modal for fechado
//   onModalDismiss() {
//     this.isModalOpen = false;
//   }
// }
// import { Component } from '@angular/core';
// import { ModalController } from '@ionic/angular';

// // Interface para os itens de horas
// interface ItemHoras {
//   horas: string;
//   acao: string;
//   empresa: string;
//   showMore: boolean;
// }

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// export class ProfilePage {
//   isModalOpen = false;

//   // Variáveis para controlar o estado de exibição das informações extras
//   expandedInfo: string = ''; // Controla qual seção está expandida ('personal', 'address', etc.)

//   // Agora a variável 'horas' é tipada com 'ItemHoras[]' (um array de objetos 'ItemHoras')
//   horas: ItemHoras[] = [
//     {
//       horas: '2:00',
//       acao: 'Ação de meio ambiente',
//       empresa: 'Empresa X',
//       showMore: false,
//     },
//     {
//       horas: '1:30',
//       acao: 'Ação de saúde',
//       empresa: 'Empresa Y',
//       showMore: false,
//     },
//     // Adicione outros itens conforme necessário
//   ];

//   constructor(private modalController: ModalController) {}

//   // Função para abrir o modal
//   openModal() {
//     this.isModalOpen = true;
//   }

//   // Função para fechar o modal
//   closeModal() {
//     this.isModalOpen = false;
//   }

//   // Função chamada ao pressionar o botão de "show more info"
//   showMoreInfo(item: ItemHoras) {
//     item.showMore = !item.showMore;
//   }

//   // Função para download do certificado
//   downloadCertificado(item: ItemHoras) {
//     console.log('Baixando certificado para:', item);
//     // Aqui você pode implementar a lógica para baixar o certificado
//   }

//   // Função para alternar a exibição de informações extras
//   toggleInfo(section: string) {
//     this.expandedInfo = this.expandedInfo === section ? '' : section;
//   }

//   // Função para abrir o popup de horas
//   openHoursPopup() {
//     this.openModal(); // Abre o modal de horas
//   }

//   // Função para lidar com o fechamento do modal
//   onModalDismiss() {
//     this.isModalOpen = false; // Quando o modal for fechado, marca como fechado
//     console.log('Modal foi fechado');
//   }
// }
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// export class ProfilePage {
//   expandedInfo: string = ''; // Controla a exibição de informações extras
//   isHoursModalOpen = false; // Controla o modal grande (tela cheia)
//   isHourDetailModalOpen = false; // Controla o modal pequeno (detalhes de uma hora)
//   selectedHour: any = null; // Armazena a hora selecionada para o modal pequeno

//   // Dados de exemplo para horas voluntárias
//   horas = [
//     {
//       horas: '2:00',
//       acao: 'Ação Comunitária',
//       empresa: 'Associação X',
//       entrada: '08:30',
//       saida: '21:30',
//     },
//     {
//       horas: '1:30',
//       acao: 'Ação Ambiental',
//       empresa: 'Empresa Y',
//       entrada: '09:00',
//       saida: '15:30',
//     },
//   ];

//   toggleInfo(section: string) {
//     this.expandedInfo = this.expandedInfo === section ? '' : section;
//   }

//   // Abre o modal grande (tela cheia)
//   openHoursModal() {
//     this.isHoursModalOpen = true;
//   }

//   // Fecha o modal grande
//   closeHoursModal() {
//     this.isHoursModalOpen = false;
//   }

//   // Abre o modal pequeno com detalhes de uma hora
//   openHourDetailModal(hora: any) {
//     this.selectedHour = hora;
//     this.isHourDetailModalOpen = true;
//   }

//   // Fecha o modal pequeno
//   closeHourDetailModal() {
//     this.isHourDetailModalOpen = false;
//   }

//   // Função para baixar o certificado
//   downloadCertificado(hora: any) {
//     console.log('Baixando certificado para:', hora);
//     // Implementar a lógica de download
//   }
// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  expandedInfo: string = ''; // Controla a exibição de informações extras

  toggleInfo(section: string) {
    this.expandedInfo = this.expandedInfo === section ? '' : section;
  }
}
