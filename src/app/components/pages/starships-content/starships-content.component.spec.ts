import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { StarshipsContentComponent } from './starships-content.component';
import { ApiService } from '@app/_services/api.service';

describe('StarshipsContentComponent', () => {
  let component: StarshipsContentComponent;
  let fixture: ComponentFixture<StarshipsContentComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [StarshipsContentComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(convertToParamMap({ id: '12' }))
          }
        },
        ApiService
      ]
    })
    .compileComponents();

    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(StarshipsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch starship details on init', () => {
    const spy = spyOn(apiService, 'getStarshipDetailsById').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('12');
  });
});
