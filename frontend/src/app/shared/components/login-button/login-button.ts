import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './login-button.html',
  styleUrl: './login-button.scss'
})
export class LoginButton {
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  
  @Output() onLogin = new EventEmitter<void>();

  handleLogin(): void {
    if (!this.isLoading && !this.disabled) {
      this.onLogin.emit();
    }
  }
}
