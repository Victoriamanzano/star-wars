import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private router: Router) { }

  redirigir() {
    const rutaRedireccion = ['../home/home.component.html'];
    this.router.navigate([rutaRedireccion]);
  }
}
