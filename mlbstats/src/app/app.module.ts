import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from '@services/api.service';
import { PlayerComponent } from '@components/player/player.component';
import { TeamComponent } from '@components/team/team.component';
import { StandingsComponent } from '@components/standings/standings.component';
import { StatsComponent } from '@components/stats/stats.component';
import { HomeComponent } from '@components/home/home.component';
import { TopbarComponent } from '@components/topbar/topbar.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { Card, CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PlayerstatsComponent } from './components/playerstats/playerstats.component';




@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    TeamComponent,
    StandingsComponent,
    StatsComponent,
    HomeComponent,
    TopbarComponent,
    PlayerstatsComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    TableModule,
    DropdownModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ProgressSpinnerModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
