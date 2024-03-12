import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterOutlet, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/core/services'


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterModule]
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  success?: string;

  private audio: HTMLAudioElement;
  private escribirTimeout: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private accountService: AccountService, private el: ElementRef) {
    this.audio = new Audio('../../../assets/nueva-carpeta/sound/mandospeaks.wav');
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

     if (this.route.snapshot.queryParams.registered) {
      this.success = 'Registration successful';
  }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      return;
    }

    console.log('UserName:', this.f.username.value);
    console.log('Password:', this.f.password.value);

    this.loading = true;
    this.accountService.logIn(this.f.username.value, this.f.password.value).pipe(first()).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
      },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  detenerTextoYAudio() {
    this.detenerSonido();
    this.detenerEscritura();
  }

  detenerEscritura() {
    const elementoTexto = this.el.nativeElement.querySelector('#textoConEfecto');
    elementoTexto.textContent = '';
    clearTimeout(this.escribirTimeout);
    this.escribirTimeout = null;
  }

  clicEnBoton() {
    this.detenerSonido();
    this.limpiarTexto();
    this.reproducirSonido();
    this.mostrarTextoConEfecto();
  }

  detenerSonido() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  limpiarTexto() {
    const elementoTexto = this.el.nativeElement.querySelector('#textoConEfecto');
    elementoTexto.textContent = '';
  }

  reproducirSonido() {
    this.audio.play();
  }

  mostrarTextoConEfecto() {
    const texto = "Welcome, a Star wars. Registration is required. May the Force be with you.";
    const elementoTexto = this.el.nativeElement.querySelector('#textoConEfecto');

    if (this.escribirTimeout) {
      clearTimeout(this.escribirTimeout);
      this.escribirTimeout = null;
      elementoTexto.textContent = '';
    }

    this.escribirConEfecto(elementoTexto, texto);
  }

  escribirConEfecto(elemento: { textContent: any; }, texto: string | any[]) {
    let index = 0;
    const velocidadEscritura = 100;

    const escribirCaracter = () => {
      elemento.textContent += texto[index];
      index++;

      if (index < texto.length) {
       this.escribirTimeout = setTimeout(escribirCaracter, velocidadEscritura);
      } else {
          index = 0;
      }

    }

    escribirCaracter();
  }

}
