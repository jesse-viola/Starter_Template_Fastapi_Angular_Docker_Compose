import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <mat-form-field appearance="fill">
        <mat-label>Enter Value</mat-label>
        <input matInput [(ngModel)]="inputValue">
      </mat-form-field>
      <button mat-raised-button (click)="onSubmit()">Get Items</button>
      <div *ngIf="items">
        <h2>Items:</h2>
        <ul>
          <li *ngFor="let item of items">{{ item }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      text-align: center;
      margin-top: 50px;
    }
    mat-form-field {
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  inputValue: string = '';
  items: any[] = [];

  constructor(private dataService: DataService) { }

  onSubmit() {
    let params = new HttpParams().set("param_type", this.inputValue);
    this.dataService.getItems(params).subscribe((data: any[]) => {
      console.log('Received items:', data); // Added for debugging purposes
      this.items = data;
    });
  }
}
