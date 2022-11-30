import React, { FC } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { Box } from '@chakra-ui/react';

interface IProps {
  errors: FieldErrors;
  name: string;
}

export const CustomError: FC<IProps> = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) =>
        message && (
          <Box color="red.500" display="flex" mb={2}>
            <MdErrorOutline size={22} />
            <Box display="inline" ml={1}>
              {message}
            </Box>
          </Box>
        )
      }
    />
  );
};
