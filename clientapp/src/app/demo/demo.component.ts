import { Component, OnInit } from '@angular/core';
import {DemoService} from "../services/demo.service";
import {FileType} from "../domain/file-type";
import {FileDefinition} from "../domain/file-definition";
import {BoolOption} from "../domain/bool-option";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  data: any;
  fileTypes: FileType[];
  boolOptions: BoolOption[];
  fileDefinition: FileDefinition;

  constructor(private demoService: DemoService) { }

  ngOnInit() {
    this.fileDefinition = new FileDefinition();

    this.boolOptions = [
      {
        name: "Yes",
        value: true
      },
      {
        name: "No",
        value: false
      }
    ];

    this.demoService.getFileTypes().subscribe(fileTypes => {
      this.fileTypes = fileTypes;
    });

    this.data = {
      "yourData": "Your data will display here",
      "dataElements": [
        {
          "name": "item 1",
          "value": "value 1"
        },
        {
          "name": "item 2",
          "value": "value 2"
        },
        {
          "name": "item 3",
          "value": "value 3"
        }
      ]
    }
  }

  submitFile(): void {
    this.demoService.submitFile().subscribe(fileDef => {
      this.fileDefinition = fileDef;
      this.data = fileDef;
    });

  }
}
