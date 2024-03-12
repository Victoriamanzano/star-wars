import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-films',
    standalone: true,
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    imports: [CommonModule, HttpClientModule, FooterComponent]
})

export class FilmsComponent implements OnInit {
  starshipDetails: any = {};
  starshipId: string | null = null;
  films: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.starshipId = params['id'];

      if (this.starshipId) {
        this.apiService.getDataStarships(this.starshipId).subscribe((details: any) => {
          this.starshipDetails = details.details;
          this.films = [];
             this.starshipDetails.films.forEach((filmUrl: string) => {
              this.apiService.getDataFilms(filmUrl).subscribe((filmDetails: any) => {
               this.films.push(filmDetails);
            });
          });

        });
      }
    });
  }
}
