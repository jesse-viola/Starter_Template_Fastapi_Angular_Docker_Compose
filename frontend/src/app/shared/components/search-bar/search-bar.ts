// 🎯 LEARNING OBJECTIVE: Understanding Angular Component Architecture
// This component demonstrates key Angular concepts:
// 1. Component decorators and metadata
// 2. Input/Output properties for parent-child communication
// 3. Reactive forms with FormControl
// 4. RxJS operators for handling user input
// 5. Angular Material integration

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule, MatAutocomplete } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, tap, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface SearchSuggestion {
  id: string;
  text: string;
  category?: 'recent' | 'product' | 'user' | 'pattern';
  icon?: string;
  url?: string;
}

// 📖 COMPONENT DECORATOR: This tells Angular this is a component
@Component({
  selector: 'search-bar',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Allow global styling
  // 📦 IMPORTS: All the modules this component needs
  imports: [
    CommonModule,        // Basic Angular directives (If, For)
    ReactiveFormsModule, // For FormControl and reactive forms
    MatFormFieldModule,  // Material form field wrapper
    MatInputModule,      // Material input styling
    MatIconModule,       // Material icons
    MatButtonModule,     // Material button styling
    MatAutocompleteModule // Material autocomplete for suggestions
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') autoComplete!: MatAutocomplete;
  // 🔽 INPUT PROPERTIES: Data flows DOWN from parent to child
  // TODO FOR YOU: Add a new @Input() property called 'maxLength' with type number
  @Input() placeholder: string = 'Search...';           // Customizable placeholder text
  @Input() debounceMs: number = 300;                    // Delay before emitting search
  @Input() appearance: 'fill' | 'outline' = 'outline';  // Material form field style
  @Input() showButton: boolean = true;                  // Whether to show the search button
  @Input() suggestions: SearchSuggestion[] = [];       // Autocomplete suggestions
  @Input() enableSuggestions: boolean = true;          // Enable/disable suggestions

  // 🔼 OUTPUT PROPERTIES: Events flow UP from child to parent
  @Output() searchChange = new EventEmitter<string>();  // Emits on every change (debounced)
  @Output() searchSubmit = new EventEmitter<string>();  // Emits when user submits
  @Output() searchFocus = new EventEmitter<void>();
  @Output() mouseEntered = new EventEmitter<void>();
  @Output() mouseLeft = new EventEmitter<void>();
  @Output() suggestionSelected = new EventEmitter<SearchSuggestion>();

  private isHovered = false;
  private isFocused = false;
  private isTyping = false;
  private TYPE_TIMEOUT_MS = 1000;

  // 🎛️ REACTIVE FORM CONTROL: Angular's way to handle form input
  searchControl = new FormControl('');
  
  // 🔍 FILTERED SUGGESTIONS: Observable that filters suggestions based on user input
  filteredSuggestions!: Observable<SearchSuggestion[]>;
  
  // 📝 RECENT SEARCHES: Store recent search terms in localStorage
  private readonly RECENT_SEARCHES_KEY = 'search-recent';
  private readonly MAX_RECENT_SEARCHES = 5;

  ngOnInit() {
    // 🌊 REACTIVE STREAMS: Listen to form control changes
    this.searchControl.valueChanges
      .pipe(
        tap(value => console.log('User typed:', value)),
        debounceTime(this.debounceMs),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.searchChange.emit(value || '');
      });

    // 🔍 SETUP FILTERED SUGGESTIONS: Filter suggestions based on user input
    this.filteredSuggestions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSuggestions(value || ''))
    );
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

  // 🔍 SUGGESTION FILTERING: Filter suggestions based on user input
  private _filterSuggestions(value: string): SearchSuggestion[] {
    if (!this.enableSuggestions) {
      return [];
    }
    
    // If no input, show recent searches
    if (!value.trim()) {
      return this._getRecentSearches();
    }
    
    const filterValue = value.toLowerCase();
    const filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(filterValue)
    );
    
    // Combine recent searches that match with regular suggestions
    const matchingRecent = this._getRecentSearches().filter(recent =>
      recent.text.toLowerCase().includes(filterValue)
    );
    
    // Remove duplicates and prioritize recent searches
    const combined = [...matchingRecent, ...filteredSuggestions];
    const unique = combined.filter((item, index, arr) => 
      arr.findIndex(i => i.text === item.text) === index
    );
    
    return unique.slice(0, 8); // Limit to 8 suggestions
  }

  // 🎯 SUGGESTION SELECTION: Handle when user selects a suggestion
  onSuggestionSelected(suggestion: SearchSuggestion) {
    this.searchControl.setValue(suggestion.text);
    this._addToRecentSearches(suggestion.text);
    this.suggestionSelected.emit(suggestion);
    this.searchSubmit.emit(suggestion.text);
  }

  onSubmit() {
    const searchValue = this.searchControl.value || '';
    if (searchValue.trim()) {
      this._addToRecentSearches(searchValue);
      this.searchSubmit.emit(searchValue);
    }
  }

  // 📝 RECENT SEARCHES MANAGEMENT
  private _getRecentSearches(): SearchSuggestion[] {
    try {
      const recent = localStorage.getItem(this.RECENT_SEARCHES_KEY);
      if (recent) {
        const searches = JSON.parse(recent) as string[];
        return searches.map((text, index) => ({
          id: `recent-${index}`,
          text,
          category: 'recent',
          icon: 'history'
        }));
      }
    } catch (error) {
      console.warn('Error loading recent searches:', error);
    }
    return [];
  }

  private _addToRecentSearches(searchTerm: string): void {
    try {
      const recent = this._getRecentSearches().map(s => s.text);
      const updated = [searchTerm, ...recent.filter(term => term !== searchTerm)]
        .slice(0, this.MAX_RECENT_SEARCHES);
      localStorage.setItem(this.RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Error saving recent search:', error);
    }
  }

  // 🔧 UTILITY METHODS
  getCurrentValue(): string {
    return this.searchControl.value || '';
  }

  isSearchEmpty(): boolean {
    return !this.searchControl.value?.trim();
  }

  clearRecentSearches(): void {
    localStorage.removeItem(this.RECENT_SEARCHES_KEY);
  }
}
