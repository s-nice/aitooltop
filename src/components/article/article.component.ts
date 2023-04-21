// Copyright @ 2018-2022 xiejiahe. All rights reserved. MIT license.

import { Component } from '@angular/core'
import { $t } from 'src/locale';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class NoDataComponent {
  $t = $t

  goBack = () => {
    history.go(-1);
  }
}
