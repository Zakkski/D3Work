import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
    offers: Place[];
    isLoading = false;
    // because you don't want memory leaks you have to unsub from when page is destroy
    private placesSub: Subscription;
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
      // don't use take(1) because then I continue to get updates
      this.placesSub = this.placesService.places.subscribe(places => {
          this.offers = places;
      });
  }

  ionViewWillEnter() {
      this.isLoading = true;
      this.placesService.fetchPlaces().subscribe(() => {
          this.isLoading = false;
      });
  }

  ngOnDestroy() {
      if (this.placesSub) {
          this.placesSub.unsubscribe();
      }
  }

  onEdit(item: IonItemSliding) {
      item.close();
  }
}
