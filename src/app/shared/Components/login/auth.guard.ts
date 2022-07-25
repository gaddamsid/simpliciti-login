import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { TokenStorageService } from '../login/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    checkLoggedIn = false;
    constructor(private router: Router,private tokenStorageService: TokenStorageService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): any {
        console.log("Url: " + url)
        this.checkLoggedIn = !!this.tokenStorageService.getToken();
        if (this.checkLoggedIn) {
            if (url == "/login")
                this.router.parseUrl('/gp/search/analytics');
            else
                return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}