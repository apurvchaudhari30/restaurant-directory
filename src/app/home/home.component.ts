import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
userEmail: string | null = null;
  userRole: string | null = null;
  allRestaurentData: any[] = [];
  selectedRestaurant: any = null;

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.userEmail = localStorage.getItem('userEmail');
    this.getUserRestaurants();
  }

  getUserRestaurants(): void {
    this.api.getRestaurent().subscribe(
      (res: any[]) => {
        this.allRestaurentData = res;
  
      },
      (err) => {
        console.error('Failed to fetch restaurant data:', err);
      }
    );
  }

  showDetails(restaurant: any): void {
    // this.selectedRestaurant = restaurant;
  this.router.navigate(['/restaurant-details', restaurant._id]);

  }

  closeDetails(): void {
    this.selectedRestaurant = null;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
