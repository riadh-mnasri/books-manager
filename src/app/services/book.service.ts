import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './book';
import {Observable, Subject} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
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
    return new Observable<Book[]>(subscriber => subscriber.next(this.books));
  }

  get(id) {
    // return this.http.get(`${baseUrl}/${id}`);
    console.log('>>>> book id input', id)
    // tslint:disable-next-line:triple-equals
    const foundBook = this.books.find(book => book.id == id);
    console.log('>>>> book found', foundBook)
    return new Observable(subscriber => subscriber.next(foundBook));
    // return Observable.of(foundBook);
  }

  create(data) {
    // return this.http.post(baseUrl, data);
    this.books.push(data);
    return new Observable(subscriber => subscriber.next(data));
  }

  update(id, data) {
    // return this.http.put(`${baseUrl}/${id}`, data);
    const foundBook = this.books.find(book => book.id === id);
    const returnedTarget = Object.assign(foundBook, data);
    this.books.push(returnedTarget);
    return new Observable(subscriber => subscriber.next(returnedTarget));
  }

  delete(id) {
    // return this.http.delete(`${baseUrl}/${id}`);
    this.books.splice(id, 1);
    return new Observable(subscriber => subscriber.next(this.books));
  }

  deleteAll() {
    // return this.http.delete(baseUrl);
    this.books.splice(0, this.books.length - 1);
    return new Observable(subscriber => subscriber.next(this.books));
  }

  findByTitle(title) {
    // return this.http.get(`${baseUrl}?title=${title}`);
    // tslint:disable-next-line:triple-equals
    if(title == 'undefined' || title == '') {
      return new Observable<Book[]>(subscriber => subscriber.next(this.books));
    }
    const foundBook = this.books.find(book => book.title === title);
    return new Observable<Book[]>(subscriber => subscriber.next(Array.of(foundBook)));
    // return Observable.of(foundBook);
  }
}
