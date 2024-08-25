import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(protected http:HttpClient) { }

  url="http://localhost:8000/api/students";


  getStudent():Observable<any>{
    return this.http.get(this.url);
  }

  deleteStudent(id:any):Observable<any>{
    return this.http.delete(this.url+"/"+id);
  }

  postStudent(data:any):Observable<any>{
    return this.http.post(this.url,data);
  }

  studentById(id:any):Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  updateStudent(id: number, students: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, students);
  }
}
