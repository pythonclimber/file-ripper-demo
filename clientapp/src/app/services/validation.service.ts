import { Injectable } from '@angular/core';
import {
  FieldDefinition,
  FieldDefinitionValidationResult,
  FileDefinition,
  FileDefinitionValidationResult
} from "../domain/file-definition";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateFieldDefinition(fileType: string, fieldDefinition: FieldDefinition): FieldDefinitionValidationResult {
    const validationResult = new FieldDefinitionValidationResult();

    if (!fieldDefinition.fieldName) {
      validationResult.isFieldNameInvalid = true;
    }

    if (fileType == "FIXED" && !fieldDefinition.startPosition) {
      validationResult.isStartPositionInvalid = true;
    }

    if (fileType == "FIXED" && !fieldDefinition.fieldLength) {
      validationResult.isFieldLengthInvalid = true;
    }

    return validationResult;
  }

  validateFileDefinition(file: any, fileDefinition: FileDefinition): FileDefinitionValidationResult {
    const validationResult = new FileDefinitionValidationResult();

    if (!fileDefinition.fileType) {
      validationResult.isFileTypeInvalid = true;
    }

    if (!file) {
      validationResult.isFileInvalid = true;
    }

    if (fileDefinition.hasHeader == null || fileDefinition.hasHeader == undefined) {
      validationResult.isHasHeaderInvalid = true;
    }

    if (!fileDefinition.delimiter && fileDefinition.fileType == 'DELIMITED') {
      validationResult.isDelimiterInvalid = true;
    }

    if (!fileDefinition.recordXmlElement && fileDefinition.fileType == 'XML') {
      validationResult.isRecordXmlElementInvalid = true;
    }

    if (fileDefinition.fieldDefinitions.length < 1) {
      validationResult.isFieldDefinitionListInvalid = true;
    }

    return validationResult;
  }
}
