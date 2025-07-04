import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Restaurant, MenuItem } from '../restaurant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurent',
  templateUrl: './restaurent.component.html',
  styleUrls: ['./restaurent.component.css'],
})
export class RestaurentComponent implements OnInit {
  formValue!: FormGroup;
  restaurent!: any;
  allRestaurentData: any;
  showAdd: boolean = false;
  showBtn: boolean = false;

  menuItems: MenuItem[] = [];
  newMenuItem: MenuItem = { name: '', price: 0 };

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });

    this.getAllData();
  }

  clickAddResto() {
    this.formValue.reset();
    this.menuItems = [];
    this.newMenuItem = { name: '', price: 0 };
    this.showAdd = true;
    this.showBtn = false;
  }

  addMenuItem() {
    if (this.newMenuItem.name && this.newMenuItem.price > 0) {
      this.menuItems.push({ ...this.newMenuItem });
      this.newMenuItem = { name: '', price: 0 };
    }
  }

  removeMenuItem(index: number) {
    this.menuItems.splice(index, 1);
  }

  addRestaurent() {
    this.restaurent = {
      name: this.formValue.value.name,
      email: this.formValue.value.email,
      mobile: this.formValue.value.mobile,
      address: this.formValue.value.address,
      services: this.formValue.value.services,
      menus: this.menuItems
    };

    this.api.postRestaurent(this.restaurent).subscribe(
      (res) => {
        alert('Restaurant Added Successfully');
        this.formValue.reset();
        this.menuItems = [];
        document.getElementById('close')?.click();
        this.getAllData();
      },
      (err) => {
        console.error(err);
        alert('Restaurant Add Failed!');
      }
    );
  }

  getAllData() {
    this.api.getRestaurent().subscribe(
      (res) => {
        this.allRestaurentData = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  deleteResto(id: number) {
    this.api.deleteRestaurant(id).subscribe(
      (res) => {
        alert('Restaurant Deleted Successfully');
        this.getAllData();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showBtn = true;

    this.restaurent = {} as Restaurant;
    this.restaurent.id = data._id;

    this.menuItems = data.menus || [];

    this.formValue.patchValue({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      services: data.services
    });
  }

  updateResto() {
    this.restaurent.name = this.formValue.value.name;
    this.restaurent.email = this.formValue.value.email;
    this.restaurent.mobile = this.formValue.value.mobile;
    this.restaurent.address = this.formValue.value.address;
    this.restaurent.services = this.formValue.value.services;
    this.restaurent.menus = this.menuItems;

    this.api.updateRestaurant(this.restaurent.id, this.restaurent).subscribe(
      (res) => {
        alert('Restaurant Updated Successfully');
        this.formValue.reset();
        this.menuItems = [];
        document.getElementById('close')?.click();
        this.getAllData();
      },
      (err) => {
        console.error(err);
        alert('Update Failed');
      }
    );
  }

  logout() {
    localStorage.removeItem('users');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
