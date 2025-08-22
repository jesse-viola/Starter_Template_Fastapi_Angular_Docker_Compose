import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    return [
      'custom-btn',
      `custom-btn--${this.variant}`,
      `custom-btn--${this.size}`,
      this.fullWidth ? 'custom-btn--full-width' : '',
      this.loading ? 'custom-btn--loading' : ''
    ].filter(Boolean).join(' ');
  }

  get materialButtonType(): string {
    switch (this.variant) {
      case 'primary':
        return 'mat-raised-button';
      case 'secondary':
        return 'mat-stroked-button';
      case 'tertiary':
        return 'mat-button';
      default:
        return 'mat-raised-button';
    }
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}