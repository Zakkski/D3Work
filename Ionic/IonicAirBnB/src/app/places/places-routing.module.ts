import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';
// Needs the tabs so that it loads the child within the parent
const routes: Routes = [
    {
        path: 'tabs',
        component: PlacesPage,
        children: [
            {
              path: 'discover',
              loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
            },
            {
              path: 'offers',
              loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
