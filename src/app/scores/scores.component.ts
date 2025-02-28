import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css'
})
export class ScoresComponent implements OnInit {
  user: User | null = null;
  highScores: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then((user) => {
        if (user) {
          this.user = user;
        }
      });
    this.userService.getHighScores(10).then((scores) => {
      this.highScores = scores;
    });
  }
}
