export interface MenuItem {
  name: string;
  price: number;
}

export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  mobile: number;
  email: string;
  services: string;
  imageUrl: string;
  menus?: MenuItem[];
}
