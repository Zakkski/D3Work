import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
    loadedBookings: Booking[];
    bookingsSub: Subscription;

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
      this.bookingsSub = this.bookingService.bookings.subscribe(bookings => {
          this.loadedBookings = bookings;
      });
  }

    onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
        slidingEl.close();
        this.loadingCtrl.create({ message: 'Deleting booking...'}).then(loadingEl => {
            loadingEl.present();
            this.bookingService.cancelBooking(offerId).subscribe(() => {
                loadingEl.dismiss();
            });
        });
    }

    ngOnDestroy() {
        if (this.bookingsSub) {
            this.bookingsSub.unsubscribe();
        }
    }

}
