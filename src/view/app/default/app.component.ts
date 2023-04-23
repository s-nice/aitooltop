// Copyright @ 2018-2022 xiejiahe. All rights reserved. MIT license.

import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { queryString, fuzzySearch, matchCurrentList } from '../../../utils'
import { INavProps, INavThreeProp } from '../../../types'
import { websiteList, settings } from '../../../store'
import { isLogin } from '../../../utils/user'

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export default class WebpComponent {
  websiteList: INavProps[] = websiteList
  currentList: INavThreeProp[] = []
  id: number = 0
  page: number = 0
  isLogin = isLogin
  open: boolean = false
  LOGO_CDN = settings.favicon
  a: number = 0
  searchKeyword: string = ''

  constructor (private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit () {
    this.activatedRoute.queryParams.subscribe(() => {
      const { page, id, q, a } = queryString()
      this.page = page
      this.id = id
      if (a) {
        this.a = a
      } else if (page==5) {
        this.a = 313
      } else if (q) {
        this.a=0
        this.currentList = fuzzySearch(this.websiteList, q)
      } else {
        this.a=0
        this.currentList = matchCurrentList()
      }
    })
  }

  search() {
    if(!this.searchKeyword.trim()){
      return;
    }
    this.currentList = fuzzySearch(this.websiteList, this.searchKeyword)
  }

  handleSidebarNav (index) {
    const { page } = queryString()
    this.router.navigate(['/app'], { 
      queryParams: {
        page,
        id: index,
      }
    })
  }

  handleCilckNav (index) {
    this.router.navigate(['/app'], {
      queryParams: {
        page: index,
      }
    })
    this.open = !this.open;
    (<any>window).$('.nav-open').slideUp(200)
  }

  handleToggleOpen() {
    this.open = !this.open;
    (<any>window).$('.nav-open').slideToggle(200)
  }
}
