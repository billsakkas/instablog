import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  wrongCredentials = false;

  signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    console.log(this.signinForm.value);
    const { username, password } = this.signinForm.value;
    if (!username || !password) return;
    const res = await this.authService.signIn(username, password);
    if (res) this.router.navigate(['/admin/dashboard']);
    this.wrongCredentials = true;

    return;
  }

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {}
}
