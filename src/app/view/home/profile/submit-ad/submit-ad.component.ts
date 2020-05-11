import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/auth/_services';

interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-submit-ad',
  templateUrl: './submit-ad.component.html',
  styleUrls: ['./submit-ad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmitAdComponent implements OnInit {

  map: any;
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

  @Input() myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService
  ) {

  }
  current_email: string;
  submit_ad: FormGroup;
  submitted = false;
  user_file: File;
  images = [];
  imageNames = [];
  multiImage = [];
  myVideo: File;
  ckeditor: string;

  ngOnInit() {
    this.current_email = localStorage.getItem('email');
    this.map = L.map('location_map').setView([46.204391, 6.143158], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.submit_ad = this.formBuilder.group({
      title: ['', Validators.required],
      tags: ['', ],
      featured_image: [''],
      price: ['', ],
      call_info: [false,],
      discounted_price: [''],
      phone_number: [''],
      location: ['', Validators.required],
      category: ['', Validators.required],
      ad_image: [''],
      ad_video: [''],
      acceptTerms: [false],
      make_featured: [false]
    })
  }
  get f() {
    return this.submit_ad.controls;
  }
  public onChange( event: CKEditor4.EventInfo ) {
    this.ckeditor = event.editor.getData();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  featuredImageUpload(ev) {
    console.log(ev.target.files[0]);
    this.user_file = ev.target.files[0];
  }

  advertiseImage(event) {
    if (event.target.files && event.target.files[0]) {
      let fileAmount = event.target.files.length;
      for (let i = 0; i < fileAmount; i++) {
        let reader = new  FileReader();
        reader.onload  = (event: any) => {
          this.images.push(event.target.result);

          this.submit_ad.patchValue({
            fileSource: this.images
          })
        };
        reader.readAsDataURL(event.target.files[i]);
        this.imageNames.push(event.target.files[i].name);
        this.multiImage.push(event.target.files[i]);
      }
    }
  }

  getVideoFile(event) {
    console.log(event.target.files[0].name);
    this.myVideo = event.target.files[0]
  }

  onSubmit() {
    this.submitted = true;
    if (this.submit_ad.invalid) {
      return;
    }

    this.submit_ad.value['email'] = this.current_email;
    this.submit_ad.value['ckeditor'] = this.ckeditor;
    this.submit_ad.value['featured_image'] = this.submit_ad.value['featured_image'].slice(12,100);
    this.submit_ad.value['ad_video'] = this.submit_ad.value['ad_video'].slice(12, 100);
    this.submit_ad.value['images'] = this.imageNames;

    this.userService.submit_adv(this.submit_ad.value).subscribe(res => {

      console.log(this.submit_ad.value);
      if (res.success === true) {
        if (this.submit_ad.value.featured_image) {
          this.userService.upload_advertise(this.user_file).subscribe(res => {
            console.log('successfully upload', res)
          });
        }
        if (this.submit_ad.value.images) {
          this.userService.multi_image(this.multiImage).subscribe(res => {
            console.log('successfully multi image uploaded', res)
          });
        }
        if (this.submit_ad.value.ad_video) {
          this.userService.upload_video(this.myVideo).subscribe(res => {
            console.log('video uploaded', res);
          })
        }
        alert(res['msg']);
        window.history.go(0)
      }
    });
  }

}
