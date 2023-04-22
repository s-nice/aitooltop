// Copyright @ 2018-2022 xiejiahe. All rights reserved. MIT license.

import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article';
import { DomSanitizer } from '@angular/platform-browser';

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
      private articleService: ArticleService,
      private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = +this.a;
    this.articleService.getArticle(id).subscribe(article => this.article = article);
  }
}
