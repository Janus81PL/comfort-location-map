import { Routes } from '@angular/router';
import { LocationMapComponent } from './main/location/location-map/location-map.component';
import { ManagementComponent } from './main/management/management.component';

export const routes: Routes = [
    {path: '', redirectTo: 'location-map', pathMatch: 'full'},
    {path: 'location-map', component: LocationMapComponent},
    {path: 'management', component: ManagementComponent}
];
