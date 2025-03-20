import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { DayView } from './DayView';
import { WeekView } from './WeekView';

type ViewMode = 'day' | 'week';

export const TimesheetLayout: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('day');

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <Box>
      <Tabs variant="line" colorScheme="blue">
        <TabList>
          <Tab>Timesheet</Tab>
          <Tab>Pending approval</Tab>
          <Tab>Unsubmitted</Tab>
          <Tab>Approved</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {viewMode === 'day' ? (
              <DayView onViewModeChange={handleViewModeChange} />
            ) : (
              <WeekView onViewModeChange={handleViewModeChange} />
            )}
          </TabPanel>
          <TabPanel>
            <p>Pending approval content</p>
          </TabPanel>
          <TabPanel>
            <p>Unsubmitted content</p>
          </TabPanel>
          <TabPanel>
            <p>Approved content</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}; 