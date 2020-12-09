export class FileDefinition {
  hasHeader: boolean;
  fileType: string;
  delimiter: string;
  recordXmlElement: string;
  fieldDefinitions: FieldDefinition[]
}

export class FieldDefinition {
  fieldName: string;
}
