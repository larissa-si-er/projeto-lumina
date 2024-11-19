// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-news',
//   templateUrl: './news.page.html',
//   styleUrls: ['./news.page.scss'],
// })
// export class NewsPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {
  news: any[] = [];  // Armazenar as notícias
  searchTerm: string = 'ONGs no Brasil';  // Termo de busca inicial (humanitário)

  constructor(private http: HttpClient) {
    this.fetchNews();  // Chama a função de buscar notícias quando a página carrega
  }

  // Função para buscar notícias
  fetchNews() {
    const apiKey = '10d67b99ae5c4cb193cb2f16d698ed55';  // Substitua pela sua chave da API
    const url = `https://newsapi.org/v2/everything?q=${this.searchTerm}&language=pt&apiKey=${apiKey}`;
    // Faz a requisição GET para a API de notícias
    this.http.get(url).subscribe((data: any) => {
      this.news = data.articles;  // Armazena os artigos recebidos no array "news"
    }, error => {
      console.error('Erro ao buscar notícias:', error);
    });
  }
}

