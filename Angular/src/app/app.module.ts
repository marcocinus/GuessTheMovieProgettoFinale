import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './@shared/components/login/login.component';
import { LogoutComponent } from './@shared/components/logout/logout.component';
import { RegisterComponent } from './@shared/components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './@shared/components/navbar/navbar.component';

import { ProfileComponent } from './components/profile/profile.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './@shared/modules/angular-material/angular-material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HeroContentComponent } from './components/hero-content/hero-content.component';
import { FooterComponent } from './@shared/components/footer/footer.component';
import { RulesComponent } from './components/rules/rules.component';
import { CardComponent } from './components/card/card.component';
import { TimerComponent } from './components/timer/timer.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { PolaroidCardComponent } from './components/polaroid-card/polaroid-card.component';
import { ReviewComponent } from './components/review/review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayComponent } from './components/play/play.component';
import { InsertTitleComponent } from './components/insert-title/insert-title.component';
import { MenuComponent } from './@shared/components/menu/menu.component';
import { GameComponent } from './components/game/game.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    LogoutComponent,
    NavbarComponent,
    ProfileComponent,
    RankingsComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    HeroContentComponent,
    RulesComponent,
    CardComponent,
    TimerComponent,
    AddReviewComponent,
    PolaroidCardComponent,
    ReviewComponent,
    PlayComponent,
    InsertTitleComponent,
    MenuComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule
  ],
 exports: [CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }