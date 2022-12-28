import React, { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { CustomError, CustomTextarea } from 'components/atoms';

interface IProps {
  control: Control<any>;
  errors: FieldErrors;
  name: string;
  placeholder: string;
}

export const FormTextarea: FC<IProps> = ({ control, errors, name, placeholder }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <CustomTextarea field={field} placeholder={placeholder} errors={errors} name={name} />
          <CustomError errors={errors} name={name} />
        </div>
      )}
    />
  );
};
