import { Component, OnInit } from '@angular/core';
import {DemoService} from "../services/demo.service";
import {FileType} from "../domain/file-type";
import {FieldDefinition, FileDefinition, FileDefinitionValidationResult} from "../domain/file-definition";
import {BoolOption} from "../domain/bool-option";
import {ValidationService} from "../services/validation.service";
import {MatListIconCssMatStyler} from "@angular/material/list";

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
  fileDefinitionValidation: FileDefinitionValidationResult;
  showAddField: boolean;
  displayFileType: boolean;
  file: File;
  isFileInvalid: boolean;

  constructor(private demoService: DemoService, private validationService: ValidationService) { }

  ngOnInit() {
    this.fileDefinition = new FileDefinition();
    this.fileDefinition.fieldDefinitions = [];
    this.fileDefinitionValidation = new FileDefinitionValidationResult();

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
    this.fileDefinitionValidation = this.validationService.validateFileDefinition(this.file, this.fileDefinition);

    if (!this.fileDefinitionValidation.isFieldDefinitionListInvalid
        && !this.fileDefinitionValidation.isRecordXmlElementInvalid
        && !this.fileDefinitionValidation.isDelimiterInvalid
        && !this.fileDefinitionValidation.isHasHeaderInvalid
        && !this.fileDefinitionValidation.isFileTypeInvalid
        && !this.fileDefinitionValidation.isFileInvalid) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('fileDefinition', JSON.stringify(this.fileDefinition));

      this.demoService.submitFile(formData).subscribe(fileDef => {
        this.data = {
          fileDefinition: fileDef
        };
      });
    }
  }

  addFile(files: FileList) {
    this.file = files.item(0);
  }

  toggleDialog() {
    if (!this.fileDefinition.fileType) {
      this.displayFileType = true;
      return;
    }
    this.showAddField = !this.showAddField;
  }

  addField(fieldDef: FieldDefinition) {
    if (fieldDef) {
      this.fileDefinition.fieldDefinitions.push(fieldDef);
    }
    this.toggleDialog();
  }

  deleteField(fieldDef: FieldDefinition) {
    const index = this.fileDefinition.fieldDefinitions.indexOf(fieldDef)
    this.fileDefinition.fieldDefinitions.splice(index, 1);
  }
}
