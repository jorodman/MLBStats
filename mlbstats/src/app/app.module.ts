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
import { StatsComponent } from '@components/stats/stats.component';
import { HomeComponent } from '@components/home/home.component';
import { TopbarComponent } from '@components/topbar/topbar.component';
import { PlayerstatsComponent } from '@components/playerstats/playerstats.component';
import { SortablestatsComponent } from '@components/sortablestats/sortablestats.component';
import { PlayersearchComponent } from '@components/playersearch/playersearch.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    StatsComponent,
    HomeComponent,
    TopbarComponent,
    PlayerstatsComponent,
    SortablestatsComponent,
    PlayersearchComponent,
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
    CheckboxModule,
    ProgressBarModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
