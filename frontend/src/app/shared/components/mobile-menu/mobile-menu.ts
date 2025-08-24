import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, MatDividerModule],
  template: `
    <mat-sidenav-container class="mobile-menu-container" [class.menu-open]="isOpen" [hasBackdrop]="true">
      <mat-sidenav 
        #sidenav
        mode="over" 
        position="end"
        [opened]="isOpen" 
        (openedChange)="onToggle($event)"
        class="mobile-sidenav">
        
        <div class="mobile-menu-header">
          <h3>Menu</h3>
          <button mat-icon-button (click)="close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        
        <mat-nav-list>
          <a mat-list-item routerLink="/patterns" (click)="close()">
            <mat-icon matListItemIcon>description</mat-icon>
            <span matListItemTitle>Patterns</span>
          </a>
          <a mat-list-item routerLink="/yarns" (click)="close()">
            <mat-icon matListItemIcon>texture</mat-icon>
            <span matListItemTitle>Yarns</span>
          </a>
          <a mat-list-item routerLink="/needles" (click)="close()">
            <mat-icon matListItemIcon>build</mat-icon>
            <span matListItemTitle>Needles</span>
          </a>
          <a mat-list-item routerLink="/projects" (click)="close()">
            <mat-icon matListItemIcon>folder</mat-icon>
            <span matListItemTitle>Projects</span>
          </a>
          <a mat-list-item routerLink="/learn" (click)="close()">
            <mat-icon matListItemIcon>school</mat-icon>
            <span matListItemTitle>Learn</span>
          </a>
        </mat-nav-list>

        <mat-divider></mat-divider>

        <mat-nav-list>
          <a mat-list-item>
            <mat-icon matListItemIcon>favorite_border</mat-icon>
            <span matListItemTitle>Favorites</span>
          </a>
          <a mat-list-item>
            <mat-icon matListItemIcon>mail_outline</mat-icon>
            <span matListItemTitle>Messages</span>
          </a>
        </mat-nav-list>
        
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styleUrls: ['./mobile-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenu {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  close() {
    this.closeMenu.emit();
  }

  onToggle(opened: boolean) {
    if (!opened) {
      this.closeMenu.emit();
    }
  }
}