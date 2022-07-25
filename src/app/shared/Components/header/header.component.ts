import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PaymentCartService } from '../../services/payment-cart.service';
import { LanguageService } from './languages.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../login/token-storage.service';
import { GPService } from 'src/app/general-processing/services/g-p.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public cartCount: number = 0;
  subscription!: Subscription;
  private langValue = new BehaviorSubject<string>('');
  sendLang = this.langValue.asObservable();
  userInfo: any;
  currentUser: any;

  constructor(public translate: TranslateService,
    private router: Router,
    private gpService: GPService,
    private headerService: LanguageService,
    private paymentCartService: PaymentCartService,
    private notificationService: ToastrService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.paymentCartService.cartItems$.subscribe(s => {
      this.cartCount = s;
    });
    this.gpService.get('getShoppingCart').subscribe(s => {
      this.paymentCartService.onChangeCartItems(s?.data ?? 0);
    });
    this.currentUser = this.token.getUser();
    if (this.currentUser) {
      for (let key in this.currentUser) {
        let value = this.currentUser[key];
        this.currentUser.userName = value.userName;
      }
    }
  }

  translateLang(lang: string) {
    this.translate.use(lang);
    this.headerService.langSelection(lang);
    this.langValue.next(lang);
  }

  onClickCart() {
    this.router.navigate(['gp/search/payment-cart']);
  }

  oAuthlogout() {
    this.token.signOut();
    this.notificationService.success("Logged out Successfully");
    this.router.navigate(['/login']);
  }
}
