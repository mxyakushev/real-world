import React from 'react';
import { useAuth } from 'hooks';
import { TabList, Tab, TabPanels, TabPanel, Tabs } from '@chakra-ui/react';

export const Home = () => {
  const user = useAuth();
  return (
    <div>
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
            <p>global</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
