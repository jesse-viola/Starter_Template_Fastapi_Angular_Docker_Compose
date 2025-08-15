import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedYarns } from '../../yarns/featured-yarns/featured-yarns';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FeaturedYarns],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
