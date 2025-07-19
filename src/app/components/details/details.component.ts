import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  id!: string;

  @Input()
  set movieId(movieId: string) {
    this.id = movieId;
  }
}
