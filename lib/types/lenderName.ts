export interface Field {
  name: string;
  required?: boolean;
  type?: 'text' | 'select' | 'checkbox';
  options?: string[];
}

export interface FormFieldProps extends Field {
  onChange?: (event: any) => void;
  value?: any;
}
