import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AjaxService {

  constructor(private http: Http) {

  }

      getAlbumsId(keyword: string){
        return this.http.get("https://api.spotify.com/v1/search?q=" + keyword + "*&type=album")
            .map(res => res.json());
    }

    getAlbums(ids:string){
        return this.http.get("https://api.spotify.com/v1/albums/?ids=" + ids)
            .map(res => res.json());
    }

}
