import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  form: FormGroup;

  @Output() searchedName = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      searchText: ['', Validators.required]
    })
  }

  handleSubmit() {
    if (this.form.valid) {
      this.searchedName.emit(this.form.value.searchText);
      this.form.reset();
    }
  }


}
