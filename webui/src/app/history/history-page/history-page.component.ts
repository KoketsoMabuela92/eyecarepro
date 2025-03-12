import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  messages: any[] = [];
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUserHistory();
  }

  getUserHistory(): void {
    this.loading = true;
    this.apiService.getUserHistory().subscribe(
      (response) => {
        this.messages = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching message history:', error);
        this.loading = false;
      }
    );
  }
}
