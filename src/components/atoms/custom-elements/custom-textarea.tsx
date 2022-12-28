import React, { FC } from 'react';
import { ControllerRenderProps, FieldErrors, FieldValues } from 'react-hook-form';
import { Textarea } from '@chakra-ui/react';

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  errors: FieldErrors<FieldValues>;
  name: string;
  placeholder: string;
}

export const CustomTextarea: FC<IProps> = ({ field, errors, name, placeholder }) => {
  return (
    <Textarea
      {...field}
      placeholder={placeholder}
      isInvalid={!!errors[name]}
      errorBorderColor="red.500"
      focusBorderColor={errors[name] ? 'red.500' : 'blue.500'}
      maxHeight="200px"
      autoComplete="off"
      mb={2}
      borderRadius={0}
    />
  );
};
