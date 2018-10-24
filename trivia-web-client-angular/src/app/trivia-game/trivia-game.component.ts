import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Player, PlayerService } from '../player.service';
import { TriviaService } from '../trivia.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

    players: Player[];
    question: any;
    errorMessage: string;
    isLoading: boolean = true;

    constructor(private playerService: PlayerService,
                private triviaService: TriviaService,
                private oktaAuth: OktaAuthService) { }

    async ngOnInit() {
        await this.oktaAuth.getAccessToken();
        this.getPlayers();
        this.getQuestion();
    }

    getPlayers() {
        this.playerService
            .getPlayers()
            .subscribe(
                players => {
                    this.players = players
                    this.isLoading = false
                },
                error => {
                    this.errorMessage = <any>error
                    this.isLoading = false
                }
            );
    }

    getQuestion() {
        this.triviaService
            .getQuestion()
            .subscribe(
                question => this.question = question,
                error => this.errorMessage = <any>error
            );
    }

    findPlayer(id): Player {
        return this.players.find(player => player.id === id);
    }

    isUpdating(id): boolean {
        return this.findPlayer(id).isUpdating;
    }

    appendPlayer(player: Player) {
        this.players.push(player);
    }

    deletePlayer(id) {
        let player = this.findPlayer(id)
        player.isUpdating = true
        this.playerService
            .deletePlayer(id)
            .subscribe(
                response => {
                    let index = this.players.findIndex(player => player.id === id)
                    this.players.splice(index, 1)
                    player.isUpdating = false
                },
                error => {
                    this.errorMessage = <any>error
                    player.isUpdating = false
                }
            );
    }

    rightAnswer(id) {
        let data = {
            correct: true
        }
        this.answer(id, data)
    }

    wrongAnswer(id) {
        let data = {
            correct: false
        }
        this.answer(id, data)
    }

    answer(id, data) {
        let player = this.findPlayer(id)
        player.isUpdating = true
        this.playerService
            .answer(id, data)
            .subscribe(
                response => {
                    player.answers = response.answers
                    player.points = response.points
                    player.isUpdating = false
                },
                error => {
                    this.errorMessage = <any>error
                    player.isUpdating = false
                }
            );
    }
}
