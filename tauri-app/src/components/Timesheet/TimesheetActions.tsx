import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { ViewMode } from '../../types/timesheet';

interface TimesheetActionsProps {
  viewMode: ViewMode;
  onTrackTime: () => void;
  onSave: () => void;
  onSubmit: () => void;
}

export const TimesheetActions: React.FC<TimesheetActionsProps> = ({
  viewMode,
  onTrackTime,
  onSave,
  onSubmit,
}) => {
  return (
    <>
      <Flex gap={2} mt={4}>
        <Button leftIcon={<AddIcon />} onClick={onTrackTime}>
          Track time
        </Button>
        <Button variant="solid" colorScheme="green" onClick={onSave}>
          Save
        </Button>
      </Flex>

      <Button mt={8} variant="outline" onClick={onSubmit}>
        Submit {viewMode} for approval
      </Button>
    </>
  );
};