import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

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
      if (this.myForm.valid) {
        this.serv.postStudent(this.myForm.value).subscribe(
          response => {
            // Assuming response.status is handled by your API correctly
            if (response.status === 200) {
              console.log("Form submitted successfully:", response);

              this.myForm.reset(); // Reset form after successful submission
              this.viewStudent();  // Call the viewStudent method to refresh the data
            } else {
              console.error("Unexpected response status:", response);
            }
          },
          error => {
            console.error('Error submitting form:', error);

            if (error.status === 422) {
              // This is where you handle validation errors
              const validationErrors = error.error.errors;
              console.log('Validation errors:', validationErrors);
              // Here you can display the errors to the user
            } else {
              // Handle other types of errors
              console.error('An unexpected error occurred:', error.message);
            }
          }
        );
      } else {
        console.log('Form is invalid');
      }
    }


     ngOnInit(): void {
   this.viewStudent();


   this.myForm = this.fb.group({
     firstname: ['', Validators.required],
     lastname: ['', Validators.required],
     phone: ['', Validators.required],
     email: ['', Validators.required],
   });

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
       this.router.navigate(['/edit', studentId]);
       console.log(studentId);
     }

   }

