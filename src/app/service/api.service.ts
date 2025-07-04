import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Restaurant } from '../restaurant.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  [x: string]: any;

  addRestaurent(restaurentModelObj: Restaurant) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient) {}

  postRestaurent(data: any) {
    const restaurant_url = `${environment.SERVER_URL}/posts`;
    return this._http.post<any>(restaurant_url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRestaurent() {
    const restaurant_url = `${environment.SERVER_URL}/posts`;
    return this._http.get<any>(restaurant_url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRestaurentById(id: string) {
    const restaurant_url = `${environment.SERVER_URL}/posts/`;
    return this._http.get<any>(restaurant_url + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteRestaurant(id: number) {
    const restaurant_url = `${environment.SERVER_URL}/posts/`;
    return this._http.delete<any>(restaurant_url + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateRestaurant(id: number, data: any) {
    const restaurant_url = `${environment.SERVER_URL}/posts/`;

    return this._http.put<any>(restaurant_url + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  login(data: any): Observable<any> {
    const login_url = `${environment.SERVER_URL}/admin`;

    return this._http.post<any>(login_url, data).pipe(
      map((response: any) => {
        const { user, token } = response;
        if (token) {
          localStorage.setItem('token', token);
        }
        return { message: 'Login successful', user, source: 'admin' };
      }),
      catchError((error) => {
        if (error.status === 404) {
          console.warn('Falling back to loginForCustomer due to 404');
          return this.loginForCustomer(data);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  loginForCustomer(data: any): Observable<any> {
    const loginForCustomer_url = `${environment.SERVER_URL}/user`;

    return this._http.post<any>(loginForCustomer_url, data).pipe(
      map((response: any) => {
        const { user, token } = response;
        if (token) {
          localStorage.setItem('token', token);
        }
        return { message: 'Login successful2', user, source: 'user' };
      }),
      catchError(() => {
        throw new Error('Invalid email or password');
      })
    );
  }

  signup(data: any): Observable<any> {
    return this._http
      .post<any>('http://localhost:3000/api/user/addUser', data)
      .pipe(
        map((response) => {
          const { token } = response;
          if (token) {
            localStorage.setItem('token', token);
          }
          return response;
        }),
        catchError((error) => {
          console.error('API Signup Error:', error);
          let errorMsg = 'Sign up failed';
          if (error.status === 409) {
            errorMsg = 'User already exists';
          } else if (error.error?.message) {
            errorMsg = error.error.message;
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }
}
