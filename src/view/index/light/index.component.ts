import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { INavProps, INavThreeProp } from '../../../types'
import {
  fuzzySearch,
  randomBgImg,
  queryString,
  setWebsiteList,
  toggleCollapseAll,
  matchCurrentList
} from '../../../utils'
import { isLogin } from '../../../utils/user'
import { initRipple } from '../../../utils/ripple'
import { websiteList } from '../../../store'

@Component({
  selector: 'app-light',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class LightComponent {

  constructor (private router: Router, private activatedRoute: ActivatedRoute) {}

  websiteList: INavProps[] = websiteList
  currentList: INavThreeProp[] = []
  id: number = 0
  page: number = 0
  a: number = 0
  isLogin = isLogin
  sliceMax = 1

  ngOnInit() {
    randomBgImg()

    this.activatedRoute.queryParams.subscribe(() => {
      const { id, page, q, a } = queryString()
      this.page = page
      this.id = id
      this.sliceMax = 1
      if (a) {
        this.a = a
      } else if (page==5 && !id) {
        this.a = 313
        this.id = 0
      } else if (q) {
        this.a=0
        this.currentList = fuzzySearch(this.websiteList, q)
      } else {
        this.a=0
        this.currentList = matchCurrentList()
      }
      setTimeout(() => {
        this.sliceMax = Number.MAX_SAFE_INTEGER
      }, 100)
    })
  }

  collapsed() {
    try {
      return websiteList[this.page].nav[this.id].collapsed
    } catch (error) {
      return false
    }
  }

  handleCilckTopNav(index) {
    const id = this.websiteList[index].id || 0
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: index,
        id,
        _: Date.now()
      }
    })
  }

  handleSidebarNav(index) {
    const { page } = queryString()
    this.websiteList[page].id = index
    this.router.navigate([this.router.url.split('?')[0]], { 
      queryParams: {
        page,
        id: index,
        _: Date.now()
      }
    })
  }

  ngAfterViewInit() {
    initRipple()
  }

  onCollapse = (item, index) => {
    item.collapsed = !item.collapsed
    this.websiteList[this.page].nav[this.id].nav[index] = item
    setWebsiteList(this.websiteList)
  }

  onCollapseAll = () => {
    toggleCollapseAll(this.websiteList)
  }
}
