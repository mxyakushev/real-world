import React from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { setSelectedTag, tagSelectedStateSelector } from 'app';
import { TagList } from 'components';
import { Link, Outlet, useParams } from 'react-router-dom';

export const HomeTemplate = () => {
  const user = useAuth();
  const { tabName } = useParams();
  const dispatch = useAppDispatch();
  const tagsArticles = useAppSelector(tagSelectedStateSelector);
  const activeTab = useParams();

  const handleTagSelect = () => {
    dispatch(setSelectedTag(''));
  };

  return (
    <Box>
      <Box display="flex">
        <Box>
          <Box w="100vw" p={4} display="flex" justifyContent="space-between">
            <Box display="inline-block">
              <Link to="/articles/global" onClick={handleTagSelect}>
                <Box
                  p={2}
                  display="inline-block"
                  backgroundColor={activeTab.tabName === 'global' ? 'red.200' : 'white'}
                >
                  Global feed
                </Box>
              </Link>
              {user && (
                <Link to="/articles/feed" onClick={handleTagSelect}>
                  <Box
                    p={2}
                    display="inline-block"
                    backgroundColor={activeTab.tabName === 'feed' ? 'red.200' : 'white'}
                  >
                    Your feed
                  </Box>
                </Link>
              )}
              {tagsArticles.length > 0 && tabName === 'tag' && (
                <Link to="/articles/tag">
                  <Box
                    p={2}
                    display="inline-block"
                    backgroundColor={activeTab.tabName === 'tag' ? 'red.200' : 'white'}
                  >
                    #{tagsArticles}
                  </Box>
                </Link>
              )}
            </Box>
            <Popover>
              {/* eslint-disable-next-line react/no-unused-prop-types */}
              {({ onClose }: { onClose: () => void }) => (
                <>
                  <PopoverTrigger>
                    <Button borderRadius={0} minWidth="120px">
                      Popular tags
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent mr={6}>
                    <PopoverArrow />
                    <PopoverCloseButton size="lg" />
                    <PopoverHeader py={3} fontSize="20px">
                      Tags
                    </PopoverHeader>
                    <PopoverBody>
                      <TagList isLoaded large onClose={onClose} />
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </Box>
          <Outlet context={tagsArticles} />
        </Box>
      </Box>
    </Box>
  );
};
