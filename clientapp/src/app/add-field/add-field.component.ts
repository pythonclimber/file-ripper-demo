import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldDefinition, FieldDefinitionValidationResult} from "../domain/file-definition";
import {ValidationService} from "../services/validation.service";

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit{
  @Input() fileType: string;
  @Input() showAddField: boolean;
  @Output() submit = new EventEmitter<FieldDefinition>();
  fieldDefinition: FieldDefinition;
  fieldDefinitionValidation: FieldDefinitionValidationResult;

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    this.initializeDialog();
  }

  initializeDialog(): void {
    this.fieldDefinition = new FieldDefinition();
    this.fieldDefinitionValidation = new FieldDefinitionValidationResult();
  }

  toggleModal(): void {
    this.showAddField = !this.showAddField;
    this.submit.emit(null);
  }

  onSubmit() {
    this.fieldDefinitionValidation = this
      .validationService
      .validateFieldDefinition(this.fileType, this.fieldDefinition);

    if (!this.fieldDefinitionValidation.isFieldNameInvalid
        && !this.fieldDefinitionValidation.isStartPositionInvalid
        && !this.fieldDefinitionValidation.isFieldNameInvalid) {
      this.submit.emit(this.fieldDefinition);
      this.showAddField = !this.showAddField;
    }
  }
}
