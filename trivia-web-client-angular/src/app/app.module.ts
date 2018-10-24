import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { PlayerFormComponent } from './player-form/player-form.component';

const oktaConfig = {
  issuer: 'https://dev-354685.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oagk0vssioRGOgqI0h7'
};

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'trivia', component: TriviaGameComponent },
    { path: 'implicit/callback', component: OktaCallbackComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TriviaGameComponent,
    PlayerFormComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      RouterModule.forRoot(routes),
      OktaAuthModule.initAuth(oktaConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
