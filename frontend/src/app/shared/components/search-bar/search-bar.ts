// 🎯 LEARNING OBJECTIVE: Understanding Angular Component Architecture
// This component demonstrates key Angular concepts:
// 1. Component decorators and metadata
// 2. Input/Output properties for parent-child communication
// 3. Reactive forms with FormControl
// 4. RxJS operators for handling user input
// 5. Angular Material integration

/**
 * 📚 USAGE EXAMPLES: How to use this SearchBar component
 * 
 * Basic usage:
 * <app-search-bar 
 *   (searchChange)="onSearchChange($event)"
 *   (searchSubmit)="onSearchSubmit($event)">
 * </app-search-bar>
 * 
 * Customized usage:
 * <app-search-bar 
 *   placeholder="Search products..."
 *   appearance="fill"
 *   [debounceMs]="500"
 *   (searchChange)="onSearchChange($event)"
 *   (searchSubmit)="onSearchSubmit($event)">
 * </app-search-bar>
 * 
 * In your parent component.ts:
 * onSearchChange(searchTerm: string) {
 *   console.log('User is typing:', searchTerm);
 *   // TODO FOR YOU: Implement live search here
 * }
 * 
 * onSearchSubmit(searchTerm: string) {
 *   console.log('User submitted:', searchTerm);
 *   // TODO FOR YOU: Navigate to search results or trigger API call
 * }
 */

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

// 📖 COMPONENT DECORATOR: This tells Angular this is a component
@Component({
  selector: 'search-bar',
  standalone: true,
  // 📦 IMPORTS: All the modules this component needs
  imports: [
    CommonModule,        // Basic Angular directives (If, For)
    ReactiveFormsModule, // For FormControl and reactive forms
    MatFormFieldModule,  // Material form field wrapper
    MatInputModule,      // Material input styling
    MatIconModule,       // Material icons
    MatButtonModule      // Material button styling
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;
  // 🔽 INPUT PROPERTIES: Data flows DOWN from parent to child
  // TODO FOR YOU: Add a new @Input() property called 'maxLength' with type number
  @Input() placeholder: string = 'Search...';           // Customizable placeholder text
  @Input() debounceMs: number = 300;                    // Delay before emitting search
  @Input() appearance: 'fill' | 'outline' = 'outline';  // Material form field style
  @Input() showButton: boolean = true;                  // Whether to show the search button

  // 🔼 OUTPUT PROPERTIES: Events flow UP from child to parent
  @Output() searchChange = new EventEmitter<string>();  // Emits on every change (debounced)
  @Output() searchSubmit = new EventEmitter<string>();  // Emits when user submits
  @Output() searchFocus = new EventEmitter<void>();
  @Output() mouseEntered = new EventEmitter<void>();
  @Output() mouseLeft = new EventEmitter<void>();

  private isHovered = false;
  private isFocused = false;
  private isTyping = false;
  private TYPE_TIMEOUT_MS = 1000;

  // 🎛️ REACTIVE FORM CONTROL: Angular's way to handle form input
  // TODO FOR YOU: Try initializing this with a default value like new FormControl('test')
  searchControl = new FormControl('');

  ngOnInit() {
    // 🌊 REACTIVE STREAMS: Listen to form control changes
    this.searchControl.valueChanges
      .pipe(
        tap(value => console.log('User typed:', value)), // Added as requested
        debounceTime(this.debounceMs),    // Wait for user to stop typing
        distinctUntilChanged()            // Only emit if value actually changed
      )
      .subscribe(value => {
        // 📡 EMIT TO PARENT: Send the search term up the component tree
        this.searchChange.emit(value || '');
      });
  }

  // 🎯 USER ACTIONS: Handle form submission
  onSubmit() {
    const searchValue = this.searchControl.value || '';
    // TODO FOR YOU: Add validation here - don't submit if search is empty or too short
    this.searchSubmit.emit(searchValue);
  }

  // 🧹 UTILITY METHOD: Clear the search and notify parent
  clearSearch() {
    this.searchControl.setValue('');
    // TODO FOR YOU: Should we emit searchSubmit here too? Think about UX
    this.searchChange.emit('');
  }

  onMouseEnter() {
    this.isHovered = true;
    this.inputRef.nativeElement.focus();
    this.mouseEntered.emit();
  }

  onMouseLeave() {
    this.isHovered = false;
    this.mouseLeft.emit();
  }

  onFocus() {
    this.isFocused = true;
    this.searchFocus.emit();
  }

  onInput() {
    this.isTyping = true;
    // reset if typing is paused
    setTimeout(() => {
      this.isTyping = false
    }, this.TYPE_TIMEOUT_MS);
  }

  // TODO FOR YOU: Add a method called 'getCurrentValue()' that returns the current search value
  // TODO FOR YOU: Add a method called 'isSearchEmpty()' that returns boolean
}
