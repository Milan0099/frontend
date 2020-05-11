import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/auth/_services';

interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-profile-basic',
  templateUrl: './my-profile-basic.component.html',
  styleUrls: ['./my-profile-basic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyProfileBasicComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService
  ) {
    this.add_profile = this.formBuilder.group({
      secondFormGroup:
        this.formBuilder.group({ endpoints: new FormControl(''), })
    })
  }
  category: Categories[] = [
    {value: '1', viewValue: 'gardener'},
    {value: '2', viewValue: 'Artisan'},
    {value: '3', viewValue: 'Home help'},
    {value: '4', viewValue: 'childcare'},
    {value: '5', viewValue: 'Private Tutoring'},
    {value: '6', viewValue: 'Visualization'},
    {value: '7', viewValue: 'Other advice'},
    {value: '8', viewValue: 'Education and training'},
    {value: '9', viewValue: 'Business plan'},
  ];

  current_email: string;
  add_profile: FormGroup;
  submitted = false;
  loading = false;
  files: File[] = [];
  logoFile: File;
  logoName: string;
  myFlagForButtonToggle: String = "Private";
  endpointToggleOptions: Array<String> = ["Private", "Company"];

  ngOnInit(): void {
    this.current_email = localStorage.getItem('email' );

    this.add_profile = this.formBuilder.group({
      endpoints: [''],
      surname: [''],
      phoneNumber: [''],
      websiteAddress: [''],
      address: [''],
      postCode: [''],
      canton: ['']
    })
  }

  onSelect(event) {
    this.logoName = event.addedFiles[0].name;
    this.logoFile = event.addedFiles[0];
    console.log(this.logoFile)
    this.files.push(...event.addedFiles);
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  pNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  pCode(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f() {return this.add_profile.controls}
  onSubmit() {
    this.submitted = true;
    if (this.add_profile.invalid) {
      return;
    }
    this.add_profile.value['logoName'] = this.logoName;
    this.add_profile.value['email'] = this.current_email;
    console.log(this.add_profile.value);
    this.loading = true;
    this.userService.add_profile(this.add_profile.value).subscribe( res => {
      if (res.success === true) {
        if (this.logoName) {
          console.log('logo_file',this.logoFile);
          this.userService.companyLogo(this.logoFile).subscribe(res => {
            alert(res['status']);
            window.history.go(0)
          });
        }
      }
    })
  }
}
