import { Component } from '@angular/core';
import { AjaxService } from './ajax.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AjaxService ]
})
export class AppComponent {
  keyword: string;
    response: {};
    ids: string[];
    albums: string[];
    moreInfo: {};
    tracks: {}[];
    bindAlbums: {};
    getInfo: {};
    closeModal: {};

    searchable: boolean = true;
   
    slideLeft: {};
    slideRight: {};
    margin: number;
    farLeft: boolean;
    farRight: boolean = true;

    albumInfo: boolean = false;

    imgSize: number;
    containerWidth: number;
    albumFrame: number;

    newSearch: {};

    constructor(private ajaxService: AjaxService){
        
        this.ids = [];
        this.tracks = [];
        this.albums = [];

        this.imgSize = (window.innerHeight/2);
        this.albumFrame = this.imgSize * 1.07;
        
        this.margin = 0;

// Initial request for album covers
        this.bindAlbums = function(keyword: string){

            this.searchable = false;

            this.ajaxService.getAlbumsId(keyword).subscribe((response: {}) => {
                this.response = response;

                if(this.response.albums.items.length === 0){
                    this.noInfo = true;
                }else{
                    this.containerWidth = this.albumFrame * this.response.albums.items.length;
                    
                    for(var i = 0; i < this.response.albums.items.length; i++){
                        this.ids.push(this.response.albums.items[i].id);
                        this.albums.push(this.response.albums.items[i].images[0].url);
                    }
                }
            })
        }

// request for additional album info
        this.getInfo = function(i: string){
                this.ajaxService.getAlbums(this.ids[i]).subscribe((response: {}) => {
                    this.response = response;
                    console.log(response)
                    this.albumInfo = true;

                        //var allTracks: {}[] = [];
                        //this.tracks.push(allTracks);
                        this.tracks = [];
                        this.album = {
                            name: this.response.albums[0].name,
                            artist: this.response.albums[0].artists[0].name,
                            albumArt: this.response.albums[0].images[1].url,
                            tracks: this.tracks,
                            releaseDate: this.response.albums[0].release_date,
                            link: this.response.albums[0].external_urls.spotify
                        };
                        
                        for(var i = 0; i < this.response.albums[0].tracks.items.length; i++){
        
                            this.album.tracks.push({
                                track: this.response.albums[0].tracks.items[i].name,
                                duration: this.response.albums[0].tracks.items[i].duration_ms,
                                preview: this.response.albums[0].tracks.items[i].preview_url,
                                link: this.response.albums[0].link
                            })
                        }
                        this.moreInfo = this.album;
                        console.log(this.moreInfo)
                })
        }

// slider functions
        this.slideLeft = function(){
            this.margin -= this.albumFrame * .973;
            this.farLeft = true;

            if(this.margin <= -(this.albums.length * (this.albumFrame * .857))){
                this.margin = -(this.albums.length * (this.albumFrame * .85705))
                this.farRight = false;
            }
        }

        this.slideRight = function(){
            this.margin += this.albumFrame * .973;
            this.farRight = true;

            if(this.margin >= 0){
                this.margin = 0;
                this.farLeft = false;
            }
        }

// start new search
        this.newSearch = function(){
            this.searchable = true;
            this.albumInfo = false;
            this.margin = 0;
            this.farLeft = false;
            this.farRight = true;
            this.albums = [];
            this.ids = [];
            
        }

// close modal       
        this.closeModal = function(){
            this.albumInfo = false;
            this.moreInfo = {};
        }
    }
}
