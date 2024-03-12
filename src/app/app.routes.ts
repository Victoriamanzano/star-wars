import { Routes} from '@angular/router';
import { StarshipsContentComponent } from './components/pages/starships-content/starships-content.component';
import { StarshipsComponent } from './components/pages/starships/starships.component';
import { LoginComponent, RegisterComponent } from './components/account';
import { HomeComponent } from './components/home';
import { AuthGuard } from './core/helpers';


export const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },

  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starships-content', component: StarshipsContentComponent },
  { path: '**', redirectTo: '' },

];

export class AppRouting {

 }
