import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private EUROPE_API = "https://restcountries.com/v2/region/europe";
  private ASIA_API = "https://restcountries.com/v2/region/asia";

  constructor(private httpClient: HttpClient) { }

  private getServer(name){
      if (name == "Europe")
        return this.EUROPE_API;
        else
        return this.ASIA_API;
  }
  public sendGetRequest(name){
    return this.httpClient.get(this.getServer(name));
  }

}