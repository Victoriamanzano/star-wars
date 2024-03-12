import { Component, ElementRef } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FooterComponent]
})

export class HomeComponent {
  private audio: HTMLAudioElement;
  private escribirTimeout: any;

  constructor(private el: ElementRef) {
    this.audio = new Audio('../../../assets/nueva-carpeta/sound/speak-r2d2.mp3');
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
    const texto = "Hola, soy R2D2! Encantado de conocerte, te doy la bienvenida a nuestra web, disfruta y aprende un poco sobre nuestra forma de vida. Hasta Pronto!!!!";
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

  onScrollDown() {
    throw new Error('Method not implemented.');
  }
}
