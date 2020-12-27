import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Book} from './book';
import {Subject} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  subjectBooks: Subject<Book[]> = new Subject<Book[]>();
  subjectBook: Subject<Book> = new Subject<Book>();
  books: Book[] = new Array();

  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get(baseUrl);
    return this.subjectBooks.next(this.books);
  }

  get(id) {
    // return this.http.get(`${baseUrl}/${id}`);
    return this.subjectBook.next(this.books.find(book => book.id === id));
  }

  create(data) {
    // return this.http.post(baseUrl, data);
    this.books.push(data);
    return this.subjectBook.next(this.books.find(book => book.id === data.id));
  }

  update(id, data) {
    // return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    // return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    // return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    // return this.http.get(`${baseUrl}?title=${title}`);
  }
}
