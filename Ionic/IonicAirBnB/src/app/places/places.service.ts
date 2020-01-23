import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
    private _places: Place[] = [
        new Place('p2', 'French Mansion', 'Romantic place in Paris', 'https://images.squarespace-cdn.com/content/v1/54b30f27e4b07e1bade0f312/1428317526726-Q7LBI1GEG6A3VQE7EM0G/ke17ZwdGBToddI8pDm48kGCBa-cNsuCTEPoILOpZDLxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIjCrV-BKc_ZJBZG3K3zcF9mcZsWbI9otdigLtPkb27ZoKMshLAGzx4R3EDFOm1kBS/image-asset.jpeg', 189.99),
        new Place('p2', 'Foggy Palace', 'spooky for sure', 'https://live.staticflickr.com/7120/6942406024_99b2997b01_k.jpg', 500),
        new Place('p1', 'Manhatten Mansion', 'In NYC of course', 'https://imgs.6sqft.com/wp-content/uploads/2017/08/22120011/Cornelius-Vanderbilt-II-Mansion.jpg', 200),
    ];

    get places() {
        return [...this._places];
    }

    getPlace(id: string) {
        return {...this._places.find(p => p.id === id)};
    }

  constructor() { }
}
