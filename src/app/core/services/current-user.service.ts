import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface CurrentUser {
  id?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private userSubject = new BehaviorSubject<CurrentUser | null>(null)
  public user$ = this.userSubject.asObservable();

  public setUser(user: CurrentUser | null) {
    this.userSubject.next(user);
  }

}
