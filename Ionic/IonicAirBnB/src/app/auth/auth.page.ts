import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLoading = false;
    isLogin = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

    onLogin() {
        this.isLoading = true;
        this.authService.login();
        this.loadingCtrl.create({keyboardClose: true, message: 'Logging in...'})
            .then(loadingEl => {
                loadingEl.present();
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/places/tabs/discover');
            });
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return false;
        }

        const email = form.value.email;
        const password = form.value.password;

        if (this.isLogin) {
            // send to login
        } else {
            // send to signup
        }

        console.log(form.value);
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }
}
