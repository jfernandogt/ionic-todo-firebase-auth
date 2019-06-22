import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() {
  }

  login(form) {
    // console.log('form', form.value);
    this.authService.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
    .then(
      () => this.router.navigateByUrl('/home')
    ).catch(
      error => console.log('se obtuvo el error', error)
    );
    
  }

}
