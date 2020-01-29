import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
    private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([
            new Place('p1',
                'French Mansion',
                'Romantic place in Paris',
                'https://images.squarespace-cdn.com/content/v1/54b30f27e4b07e1bade0f312/1428317526726-Q7LBI1GEG6A3VQE7EM0G/ke17ZwdGBToddI8pDm48kGCBa-cNsuCTEPoILOpZDLxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIjCrV-BKc_ZJBZG3K3zcF9mcZsWbI9otdigLtPkb27ZoKMshLAGzx4R3EDFOm1kBS/image-asset.jpeg',
                189.99,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                'abc'),
            new Place('p2',
                'Foggy Palace',
                'spooky for sure',
                'https://live.staticflickr.com/7120/6942406024_99b2997b01_k.jpg',
                500, new Date('2019-01-01'),
                new Date('2019-12-31'),
                'xyz'),
            new Place('p3',
                'Manhatten Mansion',
                'In NYC of course',
                'https://imgs.6sqft.com/wp-content/uploads/2017/08/22120011/Cornelius-Vanderbilt-II-Mansion.jpg',
                200,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                'xyz'),
        ]);

    get places() {
        return this._places.asObservable();
    }

    constructor(private authService: AuthService) {}

    getPlace(id: string) {
        return this.places.pipe(take(1), map(places => {
            return {...places.find(p => p.id === id)};
        }));
    }

    addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'https://live.staticflickr.com/7120/6942406024_99b2997b01_k.jpg',
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );
        // pipe(take(1)) only takes one output from subject before canceling
        // tap acts on the data without consuming the observable
        // delay pauses the obs chain
        return this.places.pipe(take(1), delay(1000), tap(places => {
            // Emits from the subject the passed value
            this._places.next(places.concat(newPlace));
        }));
    }

    updateOffer(placeId: string, title: string, description: string) {
        return this.places.pipe(take(1), delay(1000), tap(places => {
            const updatePlaceIndex = places.findIndex(pl => pl.id === placeId);
            const updatedPlaces = [...places];
            const oldPlace = updatedPlaces[updatePlaceIndex];
            updatedPlaces[updatePlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imgURL, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
            this._places.next(updatedPlaces);
        }))
    }
}
