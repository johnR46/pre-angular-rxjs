import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  private baseUrl2 = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  getPostById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }
  getUserById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/${id}`);
  }
}
