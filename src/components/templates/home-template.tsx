import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { GlobalInfo, FeedInfo } from 'components/organisms';
import { useAppSelector, useAuth } from 'hooks';
import { IArticles } from 'types';
import { tagsStateSelector } from 'app';
import { TagList } from 'components';

interface IProps {
  data: IArticles | undefined;
  dataFeed: IArticles | undefined;
  isLoading: boolean;
  isError: boolean;
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  setRange: Dispatch<SetStateAction<number>>;
  range: number;
}

export const HomeTemplate: FC<IProps> = ({
  data,
  dataFeed,
  isError,
  isLoading,
  setOffset,
  offset,
  setRange,
  range,
}) => {
  const user = useAuth();
  const tags = useAppSelector(tagsStateSelector);

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
            <Tab>Global feed</Tab>
            {user && <Tab>Your feed</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <GlobalInfo
                articles={data?.articles || []}
                numberOfArticles={data?.articlesCount || 0}
                isLoaded={!isLoading}
                setOffset={setOffset}
                offset={offset}
                setRange={setRange}
                range={range}
              />
            </TabPanel>
            {user && (
              <TabPanel>
                <FeedInfo
                  articles={dataFeed?.articles || []}
                  numberOfArticles={dataFeed?.articlesCount || 0}
                  isLoaded={!isLoading}
                  setOffset={setOffset}
                  offset={offset}
                  setRange={setRange}
                  range={range}
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
          <TagList isLoaded tagList={tags || []} large />
        </Box>
      </Box>
    </Box>
  );
};
