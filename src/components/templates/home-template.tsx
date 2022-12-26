import React, { FC, useState } from 'react';
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ArticlesHome } from 'components/organisms';
import { useAppSelector, useAuth } from 'hooks';
import { IArticles } from 'types';
import { tagsStateSelector } from 'app';
import { TagList } from 'components';

interface IProps {
  data: IArticles | undefined;
  dataFeed: IArticles | undefined;
  dataTags: IArticles | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const HomeTemplate: FC<IProps> = ({ data, dataFeed, dataTags, isError, isLoading }) => {
  const user = useAuth();
  const tags = useAppSelector(tagsStateSelector);
  const [tagsArticles, setTagsArticles] = useState<null | string>(null);

  const [globalOffset, setGlobalOffset] = useState(0);
  const [globalRange, setGlobalRange] = useState(5);

  const [feedOffset, setFeedOffset] = useState(0);
  const [feedRange, setFeedRange] = useState(5);

  const [tagOffset, setTagOffset] = useState(0);
  const [tagRange, setTagRange] = useState(5);

  if (isError) {
    return (
      <Box width="100%" height="90vh" display="flex" justifyContent="center" alignItems="center">
        <Heading>Something went wrong :(</Heading>
      </Box>
    );
  }
  return (
    <Box>
      <Box display="flex">
        <Tabs size="md">
          <TabList w="80vw">
            <Tab onClick={() => setTagsArticles(null)}>Global feed</Tab>
            {user && <Tab onClick={() => setTagsArticles(null)}>Your feed</Tab>}
            {tagsArticles && <Tab>#{tagsArticles}</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <ArticlesHome
                articles={data?.articles || []}
                numberOfArticles={data?.articlesCount || 0}
                isLoaded={!isLoading}
                setOffset={setGlobalOffset}
                offset={globalOffset}
                setRange={setGlobalRange}
                range={globalRange}
                articlesType="global"
                maxRangeNumber={(data && Math.ceil(data.articlesCount / 10)) || 0}
              />
            </TabPanel>
            {user && (
              <TabPanel>
                <ArticlesHome
                  articles={dataFeed?.articles || []}
                  numberOfArticles={dataFeed?.articlesCount || 0}
                  isLoaded={!isLoading}
                  setOffset={setFeedOffset}
                  offset={feedOffset}
                  setRange={setFeedRange}
                  range={feedRange}
                  articlesType="your"
                  maxRangeNumber={(dataFeed && Math.ceil(dataFeed.articlesCount / 10)) || 0}
                />
              </TabPanel>
            )}
            {tagsArticles && (
              <TabPanel>
                <ArticlesHome
                  articles={dataTags?.articles || []}
                  numberOfArticles={dataTags?.articlesCount || 0}
                  isLoaded={!isLoading}
                  setOffset={setTagOffset}
                  offset={tagOffset}
                  setRange={setTagRange}
                  range={tagRange}
                  articlesType="tag"
                  maxRangeNumber={(dataTags && Math.ceil(dataTags.articlesCount / 10)) || 0}
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
        <Box
          maxWidth="20vw"
          w="100%"
          height="100%"
          p={5}
          borderLeftWidth={2}
          borderBottomWidth={2}
          backgroundColor="#fafafa"
        >
          <Heading mb={5}>Popular tags</Heading>
          <TagList setTagsArticles={setTagsArticles} isLoaded tagList={tags || []} large />
        </Box>
      </Box>
    </Box>
  );
};
