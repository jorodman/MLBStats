import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { first } from 'rxjs'

@Component({
  selector: 'app-redsox',
  templateUrl: './redsox.component.html',
  styleUrls: ['./redsox.component.css']
})
export class RedSoxComponent implements OnInit {

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
