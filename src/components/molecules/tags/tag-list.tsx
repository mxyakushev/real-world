import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks';
import { getArticlesByTag } from 'app';

interface IProps {
  isLoaded: boolean;
  tagList: string[];
  large?: boolean;
  setTagsArticles: Dispatch<SetStateAction<string | null>>;
}

export const TagList: FC<IProps> = ({ isLoaded, tagList, large, setTagsArticles }) => {
  const dispatch = useAppDispatch();
  return (
    <Box display="flex" justifyContent="end">
      <Skeleton isLoaded={isLoaded}>
        {tagList.map((tag) => (
          <Button
            key={Math.random()}
            onClick={async () => {
              await dispatch(getArticlesByTag({ limit: 10, offset: 0, tag }));
              setTagsArticles(tag);
            }}
            ml={large ? 3 : 2}
            mb={large ? 3 : 2}
            fontSize={large ? '18px' : '14px'}
            cursor="pointer"
          >
            {tag}
          </Button>
        ))}
      </Skeleton>
    </Box>
  );
};
