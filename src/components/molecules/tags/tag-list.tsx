import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isLoaded: boolean;
  tagList: string[];
  large?: boolean;
  setTagsArticles: Dispatch<SetStateAction<string | null>>;
  onClose: () => void;
}

export const TagList: FC<IProps> = ({ isLoaded, tagList, large, setTagsArticles, onClose }) => {
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="end">
      <Skeleton isLoaded={isLoaded}>
        {tagList.map((tag) => (
          <Button
            key={Math.random()}
            onClick={async () => {
              onClose();
              navigate('/articles/tag');
              setTagsArticles(tag);
            }}
            ml={large ? 3 : 2}
            mb={large ? 3 : 2}
            fontSize={large ? '18px' : '14px'}
            cursor="pointer"
            borderRadius={0}
          >
            {tag}
          </Button>
        ))}
      </Skeleton>
    </Box>
  );
};
