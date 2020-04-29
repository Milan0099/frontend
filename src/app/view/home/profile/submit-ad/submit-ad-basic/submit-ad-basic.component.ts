import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-submit-ad-basic',
  templateUrl: './submit-ad-basic.component.html',
  styleUrls: ['./submit-ad-basic.component.scss']
})
export class SubmitAdBasicComponent implements OnInit {

  constructor() { }
  @ViewChild('json', {static: true}) jsonElement?: ElementRef;
  public form: object = {components: []};

  ngOnInit(): void {
    this.form = {
      "components": [
        {
          "label": "Content",
          "editor": "ckeditor",
          "spellcheck": true,
          "tableView": true,
          "calculateServer": false,
          "key": "textArea",
          "type": "textarea",
          "input": true
        },
        {
          "type": "button",
          "label": "Submit",
          "key": "submit",
          "disableOnInvalid": true,
          "input": true,
          "tableView": false
        }
      ]
    };
    console.log('onInit---', this.form);
  }

  submitForm(event) {
    console.log('event --- ', event.data);
  }

}
