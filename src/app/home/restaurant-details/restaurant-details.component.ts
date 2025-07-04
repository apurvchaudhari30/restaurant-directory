import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent {
  selectedRestaurant: any = null;
  restaurantId: string = '';

  constructor(private route: ActivatedRoute,private api:ApiService, public router: Router) {}

  ngOnInit(): void {
     this.restaurantId = this.route.snapshot.paramMap.get('id') || '';

    if (this.restaurantId) {
      this.api.getRestaurentById(this.restaurantId).subscribe(
        (res: any) => {
          this.selectedRestaurant = res;
        },
        (err: any) => {
          console.error('Failed to load restaurant:', err);
          alert('Could not find restaurant');
          this.router.navigate(['/restaurants']);
        }
      );
    } else {
      alert('Invalid restaurant ID');
      this.router.navigate(['/restaurants']);
    }
  }

  goBack(){
    this.router.navigate(["/home"]);
  }
}
