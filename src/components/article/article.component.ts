// Copyright @ 2018-2022 xiejiahe. All rights reserved. MIT license.

import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() a: string;
  article: any;

  constructor(
      private route: ActivatedRoute,
      private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const id = +this.a;
    this.articleService.getArticle(id).subscribe(article => this.article = article);
  }
}
