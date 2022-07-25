import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-general-processing',
  templateUrl: './general-processing.component.html',
  styleUrls: ['./general-processing.component.scss']
})

export class GeneralProcessingComponent implements OnInit {

  hideSearch = false;
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let activatedRoute = this.route.snapshot;
    while (activatedRoute?.firstChild) {
      activatedRoute = activatedRoute?.firstChild
    }
    if (activatedRoute?.data['hideSearch']) {
      this.hideSearch = activatedRoute?.data['hideSearch'];
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild
        }
        return route;
      })
    ).subscribe((route: ActivatedRouteSnapshot) => {
      this.hideSearch = route.data && route.data['hideSearch'];
    })
  }

}
