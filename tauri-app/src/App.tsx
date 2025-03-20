import { Box } from '@chakra-ui/react';
import React from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { TimesheetLayout } from './components/Timesheet/TimesheetLayout';

const App: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Box p={4}>
        <TimesheetLayout />
      </Box>
    </Box>
  );
};

export default App; 