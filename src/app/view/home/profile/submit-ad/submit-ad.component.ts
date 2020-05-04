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
  myVideo = [];
  ckeditor: string;

  ngOnInit() {
    this.current_email = localStorage.getItem('email');

    this.submit_ad = this.formBuilder.group({
      title: ['', Validators.required],
      tags: ['', Validators.required],
      featured_image: ['', Validators.required],
      price: ['', Validators.required],
      call_info: [false, Validators.requiredTrue],
      discounted_price: ['',Validators.required],
      phone_number: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      ad_image: ['', Validators.required],
      ad_video: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      make_featured: [false, Validators.requiredTrue]
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

  tabClick(tab) {
    let checkStatus = document.getElementsByClassName('location_map leaflet-container leaflet-fade-anim leaflet-grab leaflet-touch-drag').length;
    if (tab.index === 1 && checkStatus != 1) {
      this.map = L.map('location_map').setView([46.204391, 6.143158], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  }

  featuredImageUpload(ev) {
    console.log(ev.target.files[0].name);
    this.user_file = ev.target.files[0].name;
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
        console.log('multi-upload',event.target.files[i]);
        this.imageNames.push(event.target.files[i].name);
      }
    }
    console.log(this.imageNames);
  }

  getVideFile(event) {
    console.log(event.target.files[0].name);
  }

  onSubmit() {
    this.submitted = true;
    if (this.submit_ad.invalid) {
      return;
    }
    this.submit_ad.value['email'] = this.current_email;
    this.submit_ad.value['ckeditor'] = this.ckeditor;
    this.submit_ad.value['featured_image'] = this.submit_ad.value['featured_image'].slice(12, 100);
    this.submit_ad.value['ad_image'] = this.submit_ad.value['ad_image'].slice(12, 100);
    this.submit_ad.value['ad_video'] = this.submit_ad.value['ad_video'].slice(12, 100);
    this.submit_ad.value['images[]'] = this.imageNames;

    console.log(this.submit_ad.value);
    this.userService.submit_adv(this.submit_ad.value)
  }
}
