import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    private message: string;

	constructor(private authService: AuthService, private router: Router) {
		this.setMessage();
	}

	// Informe l'utilisateur sur son authentfication.
	private setMessage() {
		this.message = this.authService.isLoggedIn ? 'Vous êtes connecté.' : 'Vous êtes déconnecté.';
	}

	// Connecte l'utilisateur auprès du Guard
	private login() {
		this.message = 'Tentative de connexion en cours ...';
		this.authService.login().subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				// Récupère l'URL de redirection depuis le service d'authentification
				// Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/pokemons';
				// Redirige l'utilisateur
				this.router.navigate([redirect]);
			}
		});
	}

	// Déconnecte l'utilisateur
	private logout() {
		this.authService.logout();
		this.setMessage();
	}

}