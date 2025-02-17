import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export interface CreateUserDto {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.BASE_API_URL}/users`;

  constructor(private http: HttpClient) {
  }

  getByEmail(email: string): any {
    return this.http.get(`${this.baseUrl}/${email}`);
  }

  createUser(user: CreateUserDto): any {
    return this.http.post(`${this.baseUrl}`, user);
  }
}
