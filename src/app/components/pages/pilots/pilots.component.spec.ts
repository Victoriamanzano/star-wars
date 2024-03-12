import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PilotsComponent } from './pilots.component';
import { ApiService } from '@app/_services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PilotsComponent],
      providers: [ApiService]
    })
    .compileComponents();

    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
