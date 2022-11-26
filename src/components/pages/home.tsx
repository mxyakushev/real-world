import React, { useState } from 'react';
import { useAuth } from 'hooks';
import { TabList, Tab, TabPanels, TabPanel, Tabs } from '@chakra-ui/react';
import { useGetArticlesQuery } from 'app';
import { GlobalInfo } from 'components/organisms';

export const Home = () => {
  const user = useAuth();
  const [offset, setOffset] = useState(0);
  const { data } = useGetArticlesQuery({ limit: 20, offset });
  return (
    <div className="p-3">
      <Tabs size="md">
        <TabList>
          {user && <Tab>Your feed</Tab>}
          <Tab>Global feed</Tab>
        </TabList>
        <TabPanels>
          {user && (
            <TabPanel>
              <p>your</p>
            </TabPanel>
          )}
          <TabPanel>
            <h2>Page: {offset + 1}</h2>
            <GlobalInfo articles={data?.articles || []} setOffset={setOffset} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
