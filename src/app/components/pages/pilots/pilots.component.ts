import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})

export class PilotsComponent implements OnInit {
  starshipDetails: any = {};
  starshipId: string | null = null;
  pilots: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.starshipId = params['id'];

      if (this.starshipId) {
        this.apiService.getDataStarships(this.starshipId).subscribe((details: any) => {
          this.starshipDetails = details.details;
          this.pilots = [];
          this.starshipDetails.pilots.forEach((pilotUrl: string) => {
            this.apiService.getDataPilots(pilotUrl).subscribe((pilotDetails: any) => {
              this.pilots.push(pilotDetails);
            });
          });
        });
      }
    });
  }
}











