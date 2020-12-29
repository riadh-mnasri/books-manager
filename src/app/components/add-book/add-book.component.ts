import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book = {
    title: '',
    description: ''
  };
  submitted = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  saveBook() {
    const data = {
      title: this.book.title,
      description: this.book.description
    };

    this.bookService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBook() {
    this.submitted = false;
    this.book = {
      title: '',
      description: ''
    };
  }

}
