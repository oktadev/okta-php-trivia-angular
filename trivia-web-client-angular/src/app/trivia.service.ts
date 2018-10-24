import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const TRIVIA_ENDPOINT: string = 'http://jservice.io/api/random?count=1';

@Injectable({
    providedIn: 'root'
})
export class TriviaService {

    constructor(private http: Http) { }

    getQuestion() {
        return this.http.get(TRIVIA_ENDPOINT)
        .map(res => res.json()[0]);
    }
}
