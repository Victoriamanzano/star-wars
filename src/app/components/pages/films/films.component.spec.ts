import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmsComponent } from './films.component';
import { ApiService } from '@app/_services/api.service';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FilmsComponent],
      providers: [ApiService]
    })
    .compileComponents();

    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
