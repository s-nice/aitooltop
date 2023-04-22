import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiUrl = 'https://api.256s.com/v1/ac/about';

    constructor(private http: HttpClient) { }

    getArticle(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}?id=${id}`);
    }
}