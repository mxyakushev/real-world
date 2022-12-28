import React, { useEffect, useState } from 'react';
import {
  Box,
  Popover,
  PopoverBody,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';
import { useAppSelector, useAuth } from 'hooks';
import { tagsStateSelector } from 'app';
import { TagList } from 'components';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

export const HomeTemplate = () => {
  const user = useAuth();
  const { tabName } = useParams();
  const tags = useAppSelector(tagsStateSelector);
  const navigate = useNavigate();
  const [tagsArticles, setTagsArticles] = useState<null | string>(null);
  const activeTab = useParams();

  useEffect(() => {
    if (tabName === 'tag' && !tagsArticles) {
      navigate('/');
    }
  }, [navigate, tabName, tagsArticles]);

  return (
    <Box>
      <Box display="flex">
        <Box>
          <Box w="100vw" p={4} display="flex" justifyContent="space-between">
            <Box display="inline-block">
              <Link to="/articles/global" onClick={() => setTagsArticles(null)}>
                <Box
                  p={2}
                  display="inline-block"
                  backgroundColor={activeTab.tabName === 'global' ? 'red.200' : 'white'}
                >
                  Global feed
                </Box>
              </Link>
              {user && (
                <Link to="/articles/feed" onClick={() => setTagsArticles(null)}>
                  <Box
                    p={2}
                    display="inline-block"
                    backgroundColor={activeTab.tabName === 'feed' ? 'red.200' : 'white'}
                  >
                    Your feed
                  </Box>
                </Link>
              )}
              {tagsArticles && (
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
                  <TagList setTagsArticles={setTagsArticles} isLoaded tagList={tags || []} large />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Outlet context={tagsArticles} />
        </Box>
      </Box>
    </Box>
  );
};
