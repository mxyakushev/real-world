import React, { FC } from 'react';
import { Box, Skeleton, Tag } from '@chakra-ui/react';

interface IProps {
  isLoaded: boolean;
  tagList: string[];
  large?: boolean;
}

export const TagList: FC<IProps> = ({ isLoaded, tagList, large }) => {
  return (
    <Box display="flex" justifyContent="end">
      <Skeleton isLoaded={isLoaded}>
        {tagList.map((tag) => (
          <Tag
            key={Math.random()}
            ml={large ? 5 : 2}
            mb={large ? 5 : 2}
            fontSize={large ? '34px' : '14px'}
            cursor="pointer"
          >
            {tag}
          </Tag>
        ))}
      </Skeleton>
    </Box>
  );
};
