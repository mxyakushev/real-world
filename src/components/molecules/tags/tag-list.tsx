import React, { FC, useCallback } from 'react';
import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setSelectedTag, tagsStateSelector } from 'app';

interface IProps {
  isLoaded: boolean;
  large?: boolean;
  onClose: () => void;
}

export const TagList: FC<IProps> = ({ isLoaded, large, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tagList = useAppSelector(tagsStateSelector);

  const onTagSelected = useCallback(
    async (tag: string) => {
      onClose();
      navigate('/articles/tag');
      dispatch(setSelectedTag(tag));
    },
    [dispatch, navigate, onClose]
  );
  return (
    <Box display="flex" justifyContent="end">
      <Skeleton isLoaded={isLoaded}>
        {(tagList ?? []).map((tag) => (
          <Button
            key={Math.random()}
            onClick={() => onTagSelected(tag)}
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
