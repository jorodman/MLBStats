import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl!: string;
  backendurl!: string;

  constructor(
    private http: HttpClient
  ) 
  { 
    this.baseurl = 'https://lookup-service-prod.mlb.com/json';

    const prod = environment.production;
    console.log("Running in prod: ", prod);

    if(prod)
    {
      this.backendurl = 'https://3.22.56.148:8000'
    }
    else {
      this.backendurl = 'http://127.0.0.1:8000';
    }
  }

  getArticles(): Observable<any>
  {
    const url: string = `${this.backendurl}/articles`;
    return this.http.get(url); 
  }

  getFastcastUrl(): Observable<any>
  {
    const url: string = `${this.backendurl}/fastcast`;
    return this.http.get(url); 
  }


  searchForPlayers(input: string, active: boolean): Observable<any> {
    let searchUrl: string = `${this.baseurl}/named.search_player_all.bam?sport_code='mlb'&active_sw='${active ? 'Y' : 'N'}'&name_part='${input}%25'`;
    return this.http.get(searchUrl);
  }
 
  // team_all_season.queryResults.row
  /*
  *active_sw: "Y"
address: "401 East Jefferson Street&#xa;Phoenix, AZ  85004"
address_city: "Phoenix"
address_country: ""
address_intl: "N"
address_line1: "401 East Jefferson Street"
address_line2: ""
address_line3: ""
address_province: ""
address_state: "AZ"
address_zip: "85004"
all_star_sw: "N"
base_url: ""
bis_team_code: "ARI"
city: "Phoenix"
division: "W"
division_abbrev: "NLW"
division_full: "National League West"
division_id: "203"
file_code: "ari"
first_year_of_play: "1996"
franchise_code: "ARI"
home_opener: "2022-04-07T00:00:00"
home_opener_time: "9:40:00 PM"
last_year_of_play: "2022"
league: "NL"
league_abbrev: "NL"
league_full: "National League"
league_id: "104"
mlb_org: "Arizona Diamondbacks"
mlb_org_abbrev: "ARI"
mlb_org_brief: "D-backs"
mlb_org_id: "109"
mlb_org_short: "Arizona"
name: "D-backs"
name_abbrev: "ARI"
name_display_brief: "D-backs"
name_display_full: "Arizona Diamondbacks"
name_display_long: "Arizona Diamondbacks"
name_display_short: "Arizona"
name_short: "Arizona"
phone_number: "(602) 462-6500"
season: "2022"
sport_code: "mlb"
sport_code_display: "Major League Baseball"
sport_code_name: "MLB"
sport_id: "1"
spring_league: "CL"
spring_league_abbrev: "CL"
spring_league_full: "Cactus League"
spring_league_id: "114"
state: "AZ"
store_url: ""
team_code: "ari"
team_id: "109"
time_zone: "MST"
time_zone_alt: "America/Phoenix"
time_zone_generic: "MST"
time_zone_num: "-7"
time_zone_text: "MST"
venue_id: "15"
venue_name: "Chase Field"
venue_short: "Chase Field"
website_url: ""
  */
  getTeams(year: string): Observable<any> {
    let teamsUrl: string = `${this.baseurl}/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season=${year}`;
    return this.http.get(teamsUrl);
  }

  /*
   * roster_team_alltime.queryResults.row
  active_sw: "Y"
bats: "R"
birth_date: "1990-03-15T00:00:00"
current_sw: "Y"
forty_man_sw: "Y"
height_feet: "6"
height_inches: "2"
jersey_number: "13"
name_first_last: "Nick Ahmed"
name_last_first: "Ahmed, Nick"
name_sort: "AHMED, NICK"
player_first_last_html: "Nick Ahmed"
player_html: "Ahmed, Nick"
player_id: "605113"
position_desig: "INFIELDER"
primary_position: "SS"
primary_position_cd: "6"
roster_years: ""
stat_years: ""
status_short: "60-day IL"
team_id: "109"
throws: "R"
weight: "201"
   */
  getTeamRoster(teamId: string, year: string): Observable<any> {
    let rosterUrl = `${this.baseurl}/named.roster_team_alltime.bam?start_season=${year}&end_season=${year}&team_id=${teamId}`;
    return this.http.get(rosterUrl);
  }

  /*
   * player_info.queryResults.row
  active_sw: "Y"
age: "32"
bats: "R"
birth_city: "Hickory"
birth_country: "USA"
birth_date: "1989-08-01T00:00:00"
birth_state: "NC"
college: ""
death_city: ""
death_country: ""
death_date: ""
death_state: ""
end_date: ""
file_code: "ari"
gender: "M"
height_feet: "6"
height_inches: "4"
high_school: "South Caldwell, Hudson, NC"
jersey_number: "40"
name_display_first_last: "Madison Bumgarner"
name_display_first_last_html: "Madison Bumgarner"
name_display_last_first: "Bumgarner, Madison"
name_display_last_first_html: "Bumgarner, Madison"
name_display_roster: "Bumgarner"
name_display_roster_html: "Bumgarner"
name_first: "Madison"
name_full: "Bumgarner, Madison"
name_last: "Bumgarner"
name_matrilineal: ""
name_middle: "Kyle"
name_nick: "Mad-Bum"
name_prefix: ""
name_title: ""
name_use: "Madison"
player_id: "518516"
primary_position: "1"
primary_position_txt: "P"
primary_sport_code: "mlb"
primary_stat_type: "pitching"
pro_debut_date: "2009-09-08T00:00:00"
start_date: "2019-12-17T00:00:00"
status: "Active"
status_code: "A"
status_date: "2021-07-16T00:00:00"
team_abbrev: "ARI"
team_code: "ari"
team_id: "109"
team_name: "Arizona Diamondbacks"
throws: "L"
twitter_id: ""
weight: "257"
   */
  getPlayerDetails(playerId: string): Observable<any> {
    let url: string = `${this.baseurl}/named.player_info.bam?sport_code='mlb'&player_id='${playerId}'`;
    return this.http.get(url);
  }

  getRandomPlayer(): Observable<any> {
    const minId = 0;
    const maxId = 624413;
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    let url: string = `${this.baseurl}/named.player_info.bam?sport_code='mlb'&player_id='${randomId}'`;
    return this.http.get(url);
  }

  /*
   * sport_hitting_tm.queryResults.row
  ab: "39"
ao: "5"
avg: ".103"
babip: ".364"
bb: "9"
cs: "0"
d: "1"
end_date: "2022-06-27T00:00:00"
g: "25"
gidp: "0"
gidp_opp: "2"
go: "4"
go_ao: "0.80"
h: "4"
hbp: "1"
hfly: "1"
hgnd: "0"
hldr: "3"
hpop: "0"
hr: "0"
ibb: "0"
league: "NL"
league_full: "National League"
league_id: "104"
league_short: "National"
lob: "31"
np: "242"
obp: ".280"
ops: ".408"
player_id: "518516"
ppa: "4.65"
r: "3"
rbi: "3"
roe: "0"
sac: "2"
sb: "0"
season: "2021"
sf: "1"
slg: ".128"
so: "29"
sport: "MLB"
sport_code: "mlb"
sport_id: "1"
t: "0"
tb: "5"
team_abbrev: "ARI"
team_full: "Arizona Diamondbacks"
team_id: "109"
team_seq: "1.0"
team_short: "Arizona"
tpa: "52"
wo: "0"
xbh: "1"
   */
  getPlayerHittingStats(playerId: string, year: string): Observable<any> {
    let url: string = `${this.baseurl}/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${playerId}'`;
    return this.http.get(url);
  }

  /* 
   * sport_pitching_tm.queryResults.row
ab: "553"
ao: "188"
avg: ".242"
babip: ".267"
bb: "39"
bb9: "2.40"
bk: "1"
bq: "3"
bqs: "0"
cg: "1"
cs: "4"
db: "33"
end_date: "2022-06-27T00:00:00"
er: "76"
era: "4.67"
g: "26"
gf: "0"
gidp: "6"
gidp_opp: "67"
go: "117"
go_ao: "0.62"
gs: "26"
h: "134"
h9: "8.24"
hb: "11"
hfly: "38"
hgnd: "32"
hld: "0"
hldr: "64"
hpop: "0"
hr: "24"
hr9: "1.48"
ibb: "2"
ip: "146.1"
ir: "0"
irs: "0"
k9: "7.63"
kbb: "3.18"
l: "10"
league: "NL"
league_full: "National League"
league_id: "104"
league_short: "National"
np: "2294"
obp: ".302"
ops: ".741"
pgs: "88.2"
pip: "15.7"
pk: "1"
player_id: "518516"
ppa: "3.74"
qs: "10"
r: "82"
rs9: "4.61"
s: "1548"
sac: "3"
sb: "11"
season: "2021"
sf: "7"
sho: "1"
slg: ".439"
so: "124"
spct: "67.5"
sport: "MLB"
sport_code: "mlb"
sport_id: "1"
sv: "0"
svo: "0"
tbf: "613"
team_abbrev: "ARI"
team_full: "Arizona Diamondbacks"
team_id: "109"
team_seq: "1.0"
team_short: "Arizona"
tr: "2"
w: "7"
whip: "1.18"
wp: "2"
wpct: ".412"
   */
  getPlayerPitchingStats(playerId: string, year: string): Observable<any> {
    let url: string = `${this.baseurl}/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${playerId}'`;
    return this.http.get(url);
  }

  /*
   * leader_hitting_repeater.leader_hitting_mux.queryResults.row
  ab: "620"
ao: "153"
avg: ".273"
babip: ".298"
bats: "R"
bb: "28"
cs: "0"
d: "24"
g: "161"
gdp: "14"
gidp: "14"
gidp_opp: "118"
go: "132"
go_ao: "0.86"
h: "169"
hbp: "13"
hr: "48"
ibb: "4"
last_name: "Perez"
league: "AL"
league_id: "103"
lob: "278"
minimum_qualifier: "502"
name_display_first_last: "Salvador Perez"
name_display_last_first: "Perez, Salvador"
name_display_last_init: "Perez, S"
name_display_roster: "Perez, Salvador"
name_first: "Salvador"
name_last: "Perez"
np: "2392"
obp: ".316"
ops: ".859"
player_id: "521692"
player_qualifier: "665"
pos: "C"
qualifies: "Y"
r: "88"
rank: "1"
rbi: "121"
roe: "6"
sac: "0"
sb: "1"
sf: "4"
slg: ".544"
so: "170"
sport: "MLB"
sport_id: "1"
t: "0"
tb: "337"
team: "kca"
team_abbrev: "KC"
team_brief: "Royals"
team_id: "118"
team_name: "Kansas City Royals"
tpa: "665"
wo: "3"
xbh: "72"
   */
  getHittingLeaders(year: string, category: string, numresults: string): Observable<any> {
    let url = `${this.baseurl}/named.leader_hitting_repeater.bam?sport_code='mlb'&results=${numresults}&game_type='R'&season='${year}'&sort_column='${category}'`;
    return this.http.get(url);
  }

  /*
   * leaer_pitching_repeater.leader_pitching_mux.queryResults.row
  ab: "612"
ao: "121"
avg: ".201"
babip: ".309"
bb: "34"
bb_9: "1.83"
bk: "0"
bq: "15"
bqs: "3"
cg: "0"
cs: "2"
d: "17"
er: "45"
era: "2.43"
g: "28"
gdp: "7"
gf: "0"
gidp: "7"
gidp_opp: "65"
go: "139"
go_ao: "1.15"
gs: "28"
h: "123"
h_9: "6.63"
hb: "6"
hld: "0"
hr: "7"
hr9: "0.38"
ibb: "0"
ip: "167.0"
ir: "0"
irs: "0"
k_9: "12.61"
k_bb: "6.88"
l: "5"
last_name: "Burnes"
league: "NL"
league_id: "104"
minimum_qualifier: "162.0"
name_display_first_last: "Corbin Burnes"
name_display_last_first: "Burnes, Corbin"
name_display_last_init: "Burnes, C"
name_display_roster: "Burnes, Corbin"
name_last: "Burnes"
np: "2594"
obp: ".248"
ops: ".521"
p_ip: "15.53"
pa: "657"
pip: "15.5"
pk: "0"
player_id: "669203"
player_qualifier: "167.0"
qs: "18"
qualifies: "Y"
r: "47"
rank: "1"
rs9: "4.58"
s: "1722"
sac: "1"
sb: "18"
sf: "4"
sho: "0"
slg: ".273"
so: "234"
sport: "MLB"
sport_id: "1"
sv: "0"
svo: "0"
t: "3"
tb: "167"
tbf: "657"
team: "mil"
team_abbrev: "MIL"
team_id: "158"
team_name: "Milwaukee Brewers"
throws: "R"
w: "11"
whip: "0.94"
wp: "5"
wpct: ".688"
   */
  getPitchingLeaders(year: string, category: string, numresults: string): Observable<any> {
    let url = `${this.baseurl}/named.leader_pitching_repeater.bam?sport_code='mlb'&results=${numresults}&game_type='R'&season='${year}'&sort_column='${category}'`;
    return this.http.get(url);
  }

  /* 
   * search_player_all.queryResults.row
     active_sw: "Y"
bats: "L"
birth_city: "Holguin"
birth_country: "Cuba"
birth_date: "1988-02-28T00:00:00"
birth_state: ""
college: ""
height_feet: "6"
height_inches: "4"
high_school: ""
league: "AL"
name_display_first_last: "Aroldis Chapman"
name_display_last_first: "Chapman, Aroldis"
name_display_roster: "Chapman, A"
name_first: "Aroldis"
name_last: "Chapman"
name_use: "Aroldis"
player_id: "547973"
position: "P"
position_id: "1"
pro_debut_date: "2010-08-31T00:00:00"
service_years: ""
sport_code: "mlb"
team_abbrev: "NYY"
team_code: "nya"
team_full: "New York Yankees"
team_id: "147"
throws: "L"
weight: "218"
   */
  searchForPlayer(name: string, active: boolean): Observable<any> {
    let url = `${this.baseurl}/named.search_player_all.bam?sport_code='mlb'&active_sw='${active ? 'Y' : 'N'}'&name_part='${name}%25'`
    return this.http.get(url);
  }

}
