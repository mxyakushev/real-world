import { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { CustomError, CustomInput } from 'components/atoms';

export type InputType = 'email' | 'text' | 'password';

interface IProps {
  control: Control<any>;
  errors: FieldErrors;
  name: string;
  placeholder: string;
  type: InputType;
}

export const FormInput: FC<IProps> = ({ control, errors, name, placeholder, type }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <CustomInput
            field={field}
            placeholder={placeholder}
            type={type}
            errors={errors}
            name={name}
          />
          <CustomError errors={errors} name={name} />
        </div>
      )}
    />
  );
};
