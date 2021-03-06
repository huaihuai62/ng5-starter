import { Component, VERSION, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationStart, NavigationError, NavigationCancel, NavigationEnd } from '@angular/router';
import { RouterAnimation } from './router-animations';
import { EventBusService } from './services/event-bus.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouterAnimation]
})
export class AppComponent implements OnInit {
  angular: string;
  
  loading = false;
  isShowTabbar = true;
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private eventBusService: EventBusService) {
  }
  
  ngOnInit() {
    this.angular = `Angular! v${VERSION.full}`;
    
    this.eventBusService.showGlobalLoading.subscribe((value: boolean) => {
      this.loading = value;
    });
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.eventBusService.showGlobalLoading.next(true);
      }
      if (event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel) {
        this.eventBusService.showGlobalLoading.next(false);
      }
    });
    
    this.router.events.filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        if (!event['isShowTabbar']) {
          this.isShowTabbar = false;
        } else {
          this.isShowTabbar = true;
        }
      });
  }
}
