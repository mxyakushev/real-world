import { FC } from 'react';
import { ControllerRenderProps, FieldErrors, FieldValues } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

type InputType = 'email' | 'text' | 'password';

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  errors: FieldErrors;
  name: string;
  placeholder: string;
  type: InputType;
}

export const CustomInput: FC<IProps> = ({ field, errors, name, placeholder, type }) => {
  return (
    <Input
      {...field}
      placeholder={placeholder}
      type={type}
      size="md"
      isInvalid={!!errors[name]}
      errorBorderColor="red.500"
      focusBorderColor={errors[name] ? 'red.500' : 'blue.500'}
      autoComplete="off"
      mb={2}
      borderRadius={0}
    />
  );
};
