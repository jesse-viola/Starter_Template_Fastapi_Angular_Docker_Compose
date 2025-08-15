import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-yarn-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yarn-card.html',
  styleUrl: './yarn-card.scss'
})
export class YarnCard {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
}
