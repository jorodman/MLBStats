import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { StandingsComponent } from './standings/standings.component';
import { StatsComponent } from './stats/stats.component';
import { HomeComponent } from './home/home.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { Card, CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TopbarComponent } from './topbar/topbar.component';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';




@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    TeamComponent,
    StandingsComponent,
    StatsComponent,
    HomeComponent,
    TopbarComponent
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
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
