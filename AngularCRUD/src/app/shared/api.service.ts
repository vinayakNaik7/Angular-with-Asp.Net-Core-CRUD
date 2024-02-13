import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmploye(data: any) {
    return this.http.post<any>("http://localhost:3000/posts", data);
  }

  getEmployee() {
    return this.http.get("http://localhost:3000/posts");
  }

  deleteEmployee(data:any) {
    return this.http.delete<number>("http://localhost:3000/posts" + "/" + data);
  }

  updateEmployee(data: any, id:number) {
    return this.http.put<any>("http://localhost:3000/posts" + "/"+id,data);
  }



  /* For Student Table */

  getStudent() {
    return this.http.get("http://localhost:4058/api/Student/Get");
  }

  postStudent(data: any) {
    return this.http.post<any>("http://localhost:4058/api/Student/Post", data);
  }

  updateStudent(data: any, id: number) {
    return this.http.put<any>("http://localhost:4058/api/Student/Put", data);
  }

  deleteStudent(id: number) {
    return this.http.delete<number>("http://localhost:4058/api/Student/Delete" + "/" + id);
  }

  /* For Student Table */

  postData(data: any) {
    return this.http.post<any>("http://localhost:4058/api/Data/Post", data);
  }
}
