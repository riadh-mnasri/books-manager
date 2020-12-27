import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './book';
import {Subject} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private subjectBooks: Subject<Book[]> = new Subject<Book[]>();
  private subjectBook: Subject<Book> = new Subject<Book>();
  private books: Book[] = [{
    id: 0,
    title: 'Programming Kotlin',
    description: 'Code in Kotlin'
  },
    {
      id: 1,
      title: 'Effective Java',
      description: 'Best practises in Java'
    }
  ];

  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get(baseUrl);
    this.subjectBooks.next(this.books)
    return this.subjectBooks;
  }

  get(id) {
    // return this.http.get(`${baseUrl}/${id}`);
    const foundBook = this.books.find(book => book.id === id);
    this.subjectBook.next(foundBook);
    return this.subjectBook;
    // return Observable.of(foundBook);
  }

  create(data) {
    // return this.http.post(baseUrl, data);
    this.books.push(data);
    this.subjectBook.next(data);
    return this.subjectBook;
  }

  update(id, data) {
    // return this.http.put(`${baseUrl}/${id}`, data);
    const foundBook = this.books.find(book => book.id === id);
    const returnedTarget = Object.assign(foundBook, data);
    this.books.push(returnedTarget);
    this.subjectBook.next(returnedTarget);
    return this.subjectBook;
  }

  delete(id) {
    // return this.http.delete(`${baseUrl}/${id}`);
    this.books.splice(id, 1);
    return this.subjectBook;
  }

  deleteAll() {
    // return this.http.delete(baseUrl);
    this.books.splice(0, this.books.length - 1);
    return this.subjectBooks;
  }

  findByTitle(title) {
    // return this.http.get(`${baseUrl}?title=${title}`);
    const foundBook = this.books.find(book => book.title === title);
    this.subjectBook.next(foundBook);
    return this.subjectBook;
    // return Observable.of(foundBook);
  }
}
