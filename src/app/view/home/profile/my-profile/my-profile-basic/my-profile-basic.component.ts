import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/auth/_services';

@Component({
  selector: 'app-my-profile-basic',
  templateUrl: './my-profile-basic.component.html',
  styleUrls: ['./my-profile-basic.component.scss']
})
export class MyProfileBasicComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService
  ) { }
  current_email: string;
  add_profile: FormGroup;
  submitted = false;
  loading = false;

  ngOnInit(): void {
    this.current_email = localStorage.getItem('email' );

    this.add_profile = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      yourCity: ['', Validators.required],
      email: ['']
    })
  }

  get f() {return this.add_profile.controls}
  onSubmit() {
    this.submitted = true;
    if (this.add_profile.invalid) {
      return;
    }
    const profile: {firstName: string; lastName: string; yourCity: string;}[] = [
      {
        'firstName': this.f.firstName.value,
        'lastName': this.f.lastName.value,
        'yourCity': this.f.yourCity.value,
      }
    ];
    this.loading = true;
    profile[0]['email'] = this.current_email;
    this.userService.add_profile(profile).subscribe( res => {
      if (res.success === true) {
        alert(res.msg)
      }
    })
  }

}
