import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field"
import { RouterLink } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
    SearchBar
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  onSearchChange(searchTerm: string) {
    // console.log('Search changed:', searchTerm);
    // Implement your search logic here
  }

  onSearchSubmit(searchTerm: string) {
    // console.log('Search submitted:', searchTerm);
    // Implement your search submission logic here
  }

  onSearchFocus() {
    // console.log('Search focused');
  }

  onMouseEntered() {
    // console.log('Mouse entered search');
  }

  onMouseLeft() {
    // console.log('Mouse left search');
  }
}
