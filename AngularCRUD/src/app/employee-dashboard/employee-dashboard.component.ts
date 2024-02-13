import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel, StudentModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  formValue1!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel;
  StudentModelObj: StudentModel = new StudentModel;
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  StudentData: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10)]],
      salary: ['', [Validators.required, Validators.maxLength(10)]],
    });


    /*for student table*/
    this.formValue1 = this.formBuilder.group({
      FullName: ['', [Validators.required, Validators.maxLength(10)]],
      Class: ['', [Validators.required, Validators.maxLength(10)]],
    });

    this.getAllEmployee();

    this.getStudent();


  }

  clickAddEmploye() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert('Employee added successfully')
      let cancleBtn = document.getElementById('cancle');
      cancleBtn?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      err => {
        alert('Something went wrong!')
      })
  }


  get firstName() {
    return this.formValue.get('firstName')
  }
  get lastName() {
    return this.formValue.get('lastName')
  }
  get email() {
    return this.formValue.get('email')
  }
  get mobileNumber() {
    return this.formValue.get('mobileNumber')
  }
  get salary() {
    return this.formValue.get('salary')
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployees(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert('Employee Deleted');
      this.getAllEmployee();
    });
  }

  onEdit(row: any) {
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['salary'].setValue(row.salary);
    this.showAdd = false;
    this.showUpdate = true;
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert('Updated Successfully.');
      let cancleBtn = document.getElementById('cancle');
      cancleBtn?.click();
      this.formValue.reset();
      this.getAllEmployee();
    });
  }



  /* ******************* CRUD Operation with api *********************** */


  /* View Data*/
  getStudent() {
    this.api.getStudent().subscribe(res => {
      this.StudentData = res;
      console.warn(this.StudentData);
    })
  }

  clickAddStudent() {
    this.formValue1.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  /* Add Data*/
  postStudents() {

    this.StudentModelObj.FullName = this.formValue1.value.FullName;
    this.StudentModelObj.Class = this.formValue1.value.Class;

    this.api.postStudent(this.StudentModelObj).subscribe(res => {
      console.log(res);
      alert('Employee added successfully')
      let cancleBtn = document.getElementById('cancle1');
      cancleBtn?.click();
      this.formValue1.reset();
      this.getStudent();
    },
      err => {
        alert('Something went wrong!')
      })
  }



  /* Edit Data*/
  onEdit1(row: any) {
    debugger
    this.StudentModelObj.StudentId = row.StudentId;
    this.formValue1.controls['FullName'].setValue(row.FullName);
    this.formValue1.controls['Class'].setValue(row.Class);
    this.showAdd = false;
    this.showUpdate = true;
  }


  updateStudent() {
    debugger
    this.StudentModelObj.FullName = this.formValue1.value.FullName;
    this.StudentModelObj.Class = this.formValue1.value.Class

    this.api.updateStudent(this.StudentModelObj, this.StudentModelObj.StudentId).subscribe(res => {
      alert('Updated Successfully.');
      let cancleBtn = document.getElementById('cancle1');
      cancleBtn?.click();
      this.formValue1.reset();
      this.getStudent();
    });
  }


  /* Delete Data*/

  deleteStudent(row: any) {
    debugger
    this.api.deleteStudent(row.StudentId).subscribe(res => {
      alert('Employee Deleted');
      this.getStudent();
    });
  }

  data: any;
  /* **************************** */
  userLogin(data: any) {
    this.data = data
    console.warn(this.data);
  }


  postData(data: any) {
    debugger
    this.api.postData(this.data).subscribe(res => {
      console.log(res);
    });
  }
}
