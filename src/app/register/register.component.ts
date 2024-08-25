import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  editForm!: FormGroup;
  studentId: any;
  constructor(private serv:StudentService,
    private fb: FormBuilder,
    private router:Router,
   private route:ActivatedRoute
  ){

  }


  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: ['']
    });

    this.studentId = this.route.snapshot.paramMap.get('id');
    this.loadStudentData();

  }
  loadStudentData(): void {
    this.serv.studentById(this.studentId).subscribe(data => {
      this.editForm.patchValue(data.message);
      console.log(data)
    });
  }
  onSubmit(): void {
    this.serv.updateStudent(this.studentId, this.editForm.value).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }

}
