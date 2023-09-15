import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';
  isAdmin: boolean = false;
  isUser: boolean = false;
  loading: boolean = false;

  // Language translate
  arabicLangBtn: any;
  englishLangBtn: any;

  constructor(private authService: AuthService, private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.englishLangBtn = true;
  }

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loading = true;
      this.isAdmin = true;

      // just show to loader for 1 second but replace this in real application
      setTimeout(() => {
        this.authService.login(this.username, this.password);
      }, 1000);

    } else if (this.username === 'user' && this.password === 'user') {
      this.loading = true;
      this.isUser = true;

      // just show to loader for 1 second but replace this in real application
      setTimeout(() => {
        this.authService.login(this.username, this.password);
      }, 1000);

    }
  }

  // Toggle language Select
  selectLanguage(event: any) {
    this.translate.use(event.target.value);
  }

}
