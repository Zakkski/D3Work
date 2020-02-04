import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';
import { PlaceLocation } from 'src/app/places/location.model';
import { of } from 'rxjs';

@Component({
    selector: 'app-location-picker',
    templateUrl: './location-picker.component.html',
    styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
    selectedLocationImage: string;
    isLoading = false;
    @Output() locationPick = new EventEmitter<PlaceLocation>();

    constructor(private modalCtrl: ModalController, private http: HttpClient) { }

    ngOnInit() { }


    onPickLocation() {
        this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
            modalEl.onDidDismiss().then(data => {
                if (!data.data) {
                    return;
                }
                const pickedLocation: PlaceLocation = {
                    lat: data.data.lat,
                    lng: data.data.lng,
                    address: null,
                    staticMapImageUrl: null
                };
                this.isLoading = true;
                this.getAddress(data.data.lat, data.data.lng).pipe(switchMap(address => {
                    pickedLocation.address = address;
                    return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14));
                })).subscribe(staticMapImageUrl => {
                    pickedLocation.staticMapImageUrl = staticMapImageUrl;
                    this.selectedLocationImage = staticMapImageUrl;
                    this.isLoading = false;
                    this.locationPick.emit(pickedLocation);
                });
            });
            modalEl.present();
        });
    }

    private getAddress(lat: number, lng: number) {
        return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`)
            .pipe(map((geoData: any) => {
                if (!geoData || !geoData.results || geoData.results.lenght === 0) {
                    return null;
                }
                return geoData.results[0].formatted_address;
            }));
    }

    private getMapImage(lat: number, lng: number, zoom: number) {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap&markers=color:red%7Clabel:PlaceC%7C${lat},${lng}&key=${environment.googleMapsAPIKey}`;
    }
}
