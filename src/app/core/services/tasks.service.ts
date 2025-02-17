import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface CreateTaskDto {
  title: string;
  description: string;
  createdAt?: string;
  completed: boolean;
}

export interface UpdateTaskDto {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = `${environment.BASE_API_URL}/tasks`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<TaskDto[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(note: CreateTaskDto): Observable<any> {
    return this.http.post<any>(this.baseUrl, note);
  }

  update(note: UpdateTaskDto): Observable<any> {
    return this.http.put<any>(this.baseUrl, note);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
