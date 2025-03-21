import { CloseIcon } from '@chakra-ui/icons';
import { GridItem, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { BaseTimeEntry } from '../../types/timesheet';

interface TimeEntryItemProps {
  entry: BaseTimeEntry;
  onDelete: (id: string) => void;
}

export const TimeEntryItem: React.FC<TimeEntryItemProps> = ({ entry, onDelete }) => {
  return (
    <>
      <GridItem>
        <Text fontWeight="bold">{entry.project}</Text>
        <Text color="gray.600">{entry.description}</Text>
        {entry.notes && (
          <Text color="gray.500" fontSize="sm" mt={1}>
            {entry.notes}
          </Text>
        )}
      </GridItem>
    </>
  );
};

export const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => (
  <GridItem>
    <IconButton
      aria-label="Delete entry"
      icon={<CloseIcon />}
      size="sm"
      variant="ghost"
      onClick={onDelete}
    />
  </GridItem>
);