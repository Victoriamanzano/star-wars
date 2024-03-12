import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { PilotsComponent } from '../pilots/pilots.component';
import { FilmsComponent } from '../films/films.component';

@Component({
  selector: 'app-starships-content',
  standalone: true,
  templateUrl: './starships-content.component.html',
  styleUrls: ['./starships-content.component.scss'],
  imports: [CommonModule, HttpClientModule, PilotsComponent, FilmsComponent],
})

export class StarshipsContentComponent implements OnInit {
  starshipId: string | null = null;
  starshipDetails: any = {};
  imageURL: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.starshipId = params['id'];

      if (this.starshipId) {
        this.apiService.getDataStarships(this.starshipId).subscribe((details: any) => {
          this.starshipDetails = details;
          this.imageURL = details.imageURL;
        });
      }
    });
  }
}





