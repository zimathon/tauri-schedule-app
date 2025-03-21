import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, IconButton } from '@chakra-ui/react';
import React from 'react';
import { ViewMode } from '../../types/timesheet';

interface TimesheetHeaderProps {
  title: string;
  currentView: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const TimesheetHeader: React.FC<TimesheetHeaderProps> = ({
  title,
  currentView,
  onViewModeChange,
  onPrevious,
  onNext,
}) => {
  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Flex align="center" gap={2}>
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          variant="ghost"
          onClick={onPrevious}
        />
        <Heading size="md">{title}</Heading>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          variant="ghost"
          onClick={onNext}
        />
      </Flex>
      <Flex gap={2}>
        <Button
          variant={currentView === 'day' ? 'solid' : 'outline'}
          colorScheme={currentView === 'day' ? 'orange' : 'gray'}
          onClick={() => onViewModeChange('day')}
        >
          Day
        </Button>
        <Button
          variant={currentView === 'week' ? 'solid' : 'outline'}
          colorScheme={currentView === 'week' ? 'orange' : 'gray'}
          onClick={() => onViewModeChange('week')}
        >
          Week
        </Button>
      </Flex>
    </Flex>
  );
};