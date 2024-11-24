import { Component } from '@angular/core';

@Component({
  selector: 'app-hours-detail',
  templateUrl: './hours-detail.page.html',
  styleUrls: ['./hours-detail.page.scss'],
})
export class HoursDetailPage {
  isModalOpen = false;
  selectedHour: any = null;

  // Dados de exemplo
  horas = [
    {
      horas: '2:00',
      acao: 'Ação Comunitária',
      empresa: 'Associação X',
      entrada: '08:30',
      saida: '21:30',
    },
    {
      horas: '1:30',
      acao: 'Ação Ambiental',
      empresa: 'Empresa Y',
      entrada: '09:00',
      saida: '15:30',
    },
    {
      horas: '3:15',
      acao: 'Ação Educacional',
      empresa: 'Instituto Z',
      entrada: '07:00',
      saida: '12:15',
    },
  ];

  // Abrir modal com os detalhes
  openHourModal(hora: any) {
    this.selectedHour = hora;
    this.isModalOpen = true;
  }

  // Fechar modal
  closeHourModal() {
    this.isModalOpen = false;
    this.selectedHour = null;
  }

  // Lógica para baixar certificado
  downloadCertificado(hora: any) {
    console.log('Baixando certificado para:', hora);
  }
}
