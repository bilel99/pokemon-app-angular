import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

	// Méthode GUARD détermine si un (utilisateur peux ce connecter ou non)
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		return this.checkLogin(url);
	}

	// Méthode d'aide pour le GUARD qui intérroge notre service Auth
	private checkLogin(url: string): boolean {
		if (this.authService.isLoggedIn) {
			return true;
		}
		this.authService.redirectUrl = url;
		this.router.navigate(['login']);
		return false;
	}

}