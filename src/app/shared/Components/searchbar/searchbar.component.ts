import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
 
  name = "Angular " + VERSION.major;
  isShow = false;

  toggleStatus() {
    this.isShow = !this.isShow;
  }

  onSearch(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/view';
    this.router.navigateByUrl("/view/event");
  }

}
