import { AddIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { addDays, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import React, { useState } from 'react';
import { TimeEntryModal } from './TimeEntryModal';

interface TimeEntry {
  id: string;
  project: string;
  description: string;
  notes?: string;
  time: string;
}

interface DayViewProps {
  onViewModeChange: (mode: 'day' | 'week') => void;
}

export const DayView: React.FC<DayViewProps> = ({ onViewModeChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleAddEntry = (entry: {
    project: string;
    task: string;
    notes: string;
    time: string;
  }) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      project: entry.project,
      description: entry.task,
      notes: entry.notes,
      time: entry.time,
    };
    setEntries([...entries, newEntry]);
  };

  const totalTime = entries.reduce((total, entry) => {
    const [hours, minutes] = entry.time.split(':').map(Number);
    return total + hours * 60 + minutes;
  }, 0);

  const formatTotal = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Previous day"
            icon={<ChevronLeftIcon />}
            variant="ghost"
            onClick={() => setCurrentDate(addDays(currentDate, -1))}
          />
          <Heading size="md">
            Today: {format(currentDate, 'EEEE, dd MMM', { locale: ja })}
          </Heading>
          <IconButton
            aria-label="Next day"
            icon={<ChevronRightIcon />}
            variant="ghost"
            onClick={() => setCurrentDate(addDays(currentDate, 1))}
          />
        </Flex>
        <Flex gap={2}>
          <Button variant="solid" colorScheme="orange">Day</Button>
          <Button variant="outline" onClick={() => onViewModeChange('week')}>Week</Button>
        </Flex>
      </Flex>

      <Grid templateColumns="minmax(300px, 2fr) 1fr auto" gap={4} mb={4}>
        <GridItem>
          <Text fontWeight="bold">Project & Description</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" textAlign="center">Time</Text>
        </GridItem>
        <GridItem />
      </Grid>

      {entries.map((entry) => (
        <Grid
          key={entry.id}
          templateColumns="minmax(300px, 2fr) 1fr auto"
          gap={4}
          alignItems="center"
          mb={2}
          p={2}
          bg="gray.50"
          borderRadius="md"
        >
          <GridItem>
            <Text fontWeight="bold">{entry.project}</Text>
            <Text color="gray.600">{entry.description}</Text>
            {entry.notes && (
              <Text color="gray.500" fontSize="sm" mt={1}>
                {entry.notes}
              </Text>
            )}
          </GridItem>
          <GridItem>
            <Text textAlign="center">{entry.time}</Text>
          </GridItem>
          <GridItem>
            <IconButton
              aria-label="Delete entry"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={() => handleDeleteEntry(entry.id)}
            />
          </GridItem>
        </Grid>
      ))}

      <Grid templateColumns="minmax(300px, 2fr) 1fr auto" gap={4} mt={4}>
        <GridItem>
          <Text fontWeight="bold">Total</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" textAlign="center">{formatTotal(totalTime)}</Text>
        </GridItem>
        <GridItem />
      </Grid>

      <Flex gap={2} mt={4}>
        <Button leftIcon={<AddIcon />} onClick={onOpen}>Track time</Button>
        <Button variant="solid" colorScheme="green">Save</Button>
      </Flex>

      <Button mt={8} variant="outline">Submit day for approval</Button>

      <TimeEntryModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddEntry}
        date={currentDate}
      />
    </Box>
  );
}; 