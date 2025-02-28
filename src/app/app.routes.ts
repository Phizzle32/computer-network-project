import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: GameComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
