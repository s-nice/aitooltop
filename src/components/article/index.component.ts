// Copyright @ 2018-2022 xiejiahe. All rights reserved. MIT license.

import { Component } from '@angular/core'
import { $t } from 'src/locale';

@Component({
  selector: 'app-article',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ArticleComponent {
  $t = $t

  goBack = () => {
    history.go(-1);
  }
}
