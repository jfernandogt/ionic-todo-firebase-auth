import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public authService: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() {
  }

  register(form) {
    this.authService.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then(() => this.router.navigateByUrl('/login'))
      .catch(error => console.log('Error en registrarse', error));
  }

}
