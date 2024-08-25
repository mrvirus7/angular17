import { Component, OnInit } from '@angular/core';
import { StudentService } from './services/student.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{





 formHeader="StudentForm";
 showForm=false;
//  firstname="";
//  lastname="";
//  phone="";
//  email="";


  data: any;
  resp:any;
  myForm!: FormGroup;


  studentId!: number;
  snapshot: any;

  constructor(private fb: FormBuilder,
    private serv:StudentService,private router: Router
   ){ }

  saveForm() {
   this.serv.postStudent(this.myForm.value).subscribe(
      response => {
        if (response.status === 200) {
          console.log("Form submitted successfully:", response);

          this.myForm.reset();
          this.viewStudent();
        } else {
          console.error("Server returned an error:", response);
        }
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }


  ngOnInit(): void {
this.viewStudent();


this.myForm = this.fb.group({
  firstname: '',
  lastname: '',
  phone: '',
  email: ''
});

// this.studentForm = this.fb.group({
//   firstname: [''],
//   lastname: [''],
//   email: [''],
//   phone: ['']
// });

// this.route.paramMap.subscribe(params => {
//   this.studentId = !params.get('id'); // Get the student ID from the route
//   this.loadStudent();
// });

  }

  loadStudent(): void {
    // this.serv.studentById(this.studentId).subscribe(data => {
    //   this.studentForm.patchValue(data);
    // });
  }

  onSubmit(): void {
    console.log('hi');
    // this.serv.updateStudent(this.studentId, this.studentForm.value).subscribe((response) => {
    //   if (response.status === 200) {
    //     console.log("Form submitted successfully:", response);
    //     // Optionally, reset the form after successful submission
    //     this.myForm.reset();
    //     this.viewStudent();
    //   } else {
    //     console.error("Server returned an error:", response);
    //   }

    // });
  }

  viewStudent(){
    this.serv.getStudent().subscribe(response=>{
       this.data=response.message;
     //  console.log(this.data);
    }

  );
}

studel(id:any){
 // alert("done");
 console.log(id);
  this.serv.deleteStudent(id).subscribe(
    (resp)=>{
      this.viewStudent();

  });
}

openForm() {
 this.showForm=true
  }


  editStudent(studentId: any): void {
    // Navigate to the edit form component with the student ID as a parameter
    this.router.navigateByUrl('edit',studentId);
    console.log(studentId);
  }

}
