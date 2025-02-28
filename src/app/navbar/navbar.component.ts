import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Auth, onAuthStateChanged, signOut, Unsubscribe } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private unsubscribe: Unsubscribe | undefined;
  loggedIn = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.unsubscribe = onAuthStateChanged(this.auth, (user) => {
      this.loggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.();
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.loggedIn = false;
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
  }
}
