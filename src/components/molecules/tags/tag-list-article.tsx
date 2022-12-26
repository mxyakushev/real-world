import React, { FC } from 'react';
import { Box, Tag, Skeleton } from '@chakra-ui/react';

interface IProps {
  isLoaded: boolean;
  tagList: string[];
  large?: boolean;
}

export const TagListArticle: FC<IProps> = ({ isLoaded, tagList, large }) => {
  return (
    <Box display="flex" justifyContent="end">
      <Skeleton isLoaded={isLoaded}>
        {tagList.map((tag) => (
          <Tag
            key={Math.random()}
            ml={large ? 3 : 2}
            mb={large ? 3 : 2}
            fontSize={large ? '18px' : '14px'}
          >
            {tag}
          </Tag>
        ))}
      </Skeleton>
    </Box>
  );
};
