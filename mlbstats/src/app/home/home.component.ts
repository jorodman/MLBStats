import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { first } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: any;
  loadingArticles: boolean = true;
  
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    if(!this.articles)
    {
      this.update()
    }
  }

  update(): void {

    this.loadingArticles = true;

    this.api.getArticles().pipe(first()).subscribe((articles: any) => {
      this.articles = articles;
      this.loadingArticles = false;
    },
    () =>  { 
      this.loadingArticles = false 
    });
  }

}
