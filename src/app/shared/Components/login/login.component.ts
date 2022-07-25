import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { UserInfo } from './user.model';
import { oauthconfig } from './auth.config';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from './token-storage.service';

//S
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
//E

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = '';
  userInfo: UserInfo | undefined;
  token: String | undefined;
  logUserInfo: any;
  userSubscription: any;

  //Start Normal login code
  isNormlaLogin: boolean = true;
  loginForm!: FormGroup;
  isLoggedIn!: string;
  checkLoggedIn = false;
  ErrMsg: any;
  isLoginFailed = false;
  isLoading = false;
  //End Normal login code
  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: ToastrService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    if (!this.isNormlaLogin) {
      this.configureOpenIdWithOpenIAM();
    }
    if (this.tokenStorage.getToken()) {
      this.checkLoggedIn = true;
    }
    this.getLoginForm();
  }

  configureOpenIdWithOpenIAM() {
    this.oauthService.configure(oauthconfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
    // this.oauthService.loadDiscoveryDocumentAndLogin().then((_) => 
    //       //this.token = this.oauthService.getAccessToken() 
    //       //this.oauthService.loadUserProfile()
    //       this.configService.getUserInfo("user-data",this.oauthService.getAccessToken()).subscribe((response: any) => {
    //         this.token = this.oauthService.getAccessToken();
    //         this.userInfo = new UserInfo(response.name,response.email,response.profile,response.openid);
    //       //  return response;
    //       })
    // );
    //this.oauthService.setupAutomaticSilentRefresh();
  }

  get oAuthToken() {
    let authClaims: any = this.oauthService.getIdentityClaims();
    this.logUserInfo = sessionStorage.getItem('id_token_claims_obj');
    if (authClaims != null) {
      console.log(this.userInfo);
      return this.userInfo;
    }
    else {
      return null;
    }
  }

  oAuthlogin() {
    console.log(" click logggedin");
    this.oauthService.initLoginFlow('/loginflow=code');
  }

  oAuthlogout() {
    console.log(" click logged out");
    this.oauthService.logOut();
  }

  startAutomaticRefresh(): void {
    this.oauthService.setupAutomaticSilentRefresh();
  }

  stopAutomaticRefresh(): void {
    this.oauthService.stopAutomaticRefresh();
  }

  private getUserInfo() {
    this.oauthService.loadUserProfile()
      .then((userInfo) => {
        console.log(userInfo);
      });
  }

  getLoginForm() {
    this.loginForm = this.fb.group({
      userid: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)],),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    });
  }

  get userid() {
    return this.loginForm.get('userid');
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit(data: any) {
    if (this.loginForm.valid) {
      this.isLoading = true;
      let userid = data.userid;
      let password = data.password;
      this.authService.login(`login?userName=${userid}&password=${password}`).subscribe((res => {
        if (res && (res.length > 0)) {
          this.isLoggedIn = "true";
          this.tokenStorage.saveToken("eyJSb2xlIjoiQWRtaW4iLCJ");
          this.tokenStorage.saveUser(res);
          this.isLoginFailed = false;
          this.checkLoggedIn = true;
          this.isLoading = false;
          this.loginForm.reset();
          this.router.navigate(['/gp/search/analytics']);
        }
        else {
          this.isLoggedIn = "false";
          this.isLoginFailed = true;
          sessionStorage.setItem('loggerUser', this.isLoggedIn);
          this.notificationService.error("Login Failed. Invalid Username");
          this.router.navigate(['/login']);
          this.isLoading = false;
        }
      }));
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  regexStr = '^[ A-Za-z0-9_@./!@#$%^&*#&+-]*$';
  noWhiteSpace(event: any) {
    const key = event.keyCode;
    if (key === 32 && event.target.selectionStart === 0) {
      event.preventDefault();
      return false;
    }
    return new RegExp(this.regexStr).test(event.key);
  }
}
