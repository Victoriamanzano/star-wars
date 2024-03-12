import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApiService } from '@app/core/services/api.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";



@Component({
    selector: 'app-starships',
    standalone: true,
    templateUrl: './starships.component.html',
    styleUrl: './starships.component.scss',
    imports: [CommonModule, HttpClientModule, InfiniteScrollModule, FooterComponent]
})
export class StarshipsComponent implements OnInit{
  httpClient = inject(HttpClient);
  public starships: any[] = [];
  currentPage: number = 1;
    isLoading: boolean = false;
    maxPages: number = 4;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllStarships(this.currentPage)
    .subscribe( starships =>{
      this.starships = starships;
    });
    this.fetchStarships();
  }

fetchStarships(): void {
  this.isLoading = true;
  this.apiService.getAllStarships(this.currentPage).subscribe((starships: any) => {
    this.starships = starships;
    this.isLoading = false;
  });
}

  onStarshipClick(starship: any): void {

    this.router.navigate(['starships-content'], { queryParams: { id: starship.id } });
  }

  onScroll(): void {
    const pos = window.scrollY + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max && !this.isLoading) {
      this.currentPage++;
      this.loadMoreStarships();
    }
  }

  loadMoreStarships(): void {
    this.isLoading = true;
    if (this.currentPage <= this.maxPages) {
      this.apiService.getAllStarships(this.currentPage).subscribe((starships: any) => {
        this.starships = this.starships.concat(starships);
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}








