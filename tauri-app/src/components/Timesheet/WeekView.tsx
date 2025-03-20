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
import { addDays, format, startOfWeek } from 'date-fns';
import { ja } from 'date-fns/locale';
import React, { useState } from 'react';
import { TimeEntryModal } from './TimeEntryModal';

interface TimeEntry {
  id: string;
  project: string;
  description: string;
  notes?: string;
  times: { [key: string]: string };
  total: string;
}

interface WeekViewProps {
  onViewModeChange: (mode: 'day' | 'week') => void;
}

export const WeekView: React.FC<WeekViewProps> = ({ onViewModeChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleAddEntry = (entry: {
    project: string;
    task: string;
    notes: string;
    time: string;
  }) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      project: entry.project,
      description: entry.task,
      notes: entry.notes,
      times: weekDays.reduce((acc, day) => {
        const key = format(day, 'yyyy-MM-dd');
        acc[key] = key === dateKey ? entry.time : '0';
        return acc;
      }, {} as { [key: string]: string }),
      total: entry.time,
    };
    setEntries([...entries, newEntry]);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    onOpen();
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Previous week"
            icon={<ChevronLeftIcon />}
            variant="ghost"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          />
          <Heading size="md">
            This week: {format(weekStart, 'd')} - {format(addDays(weekStart, 6), 'd MMM yyyy')}
          </Heading>
          <IconButton
            aria-label="Next week"
            icon={<ChevronRightIcon />}
            variant="ghost"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          />
        </Flex>
        <Flex gap={2}>
          <Button variant="outline" onClick={() => onViewModeChange('day')}>Day</Button>
          <Button variant="solid" colorScheme="orange">Week</Button>
        </Flex>
      </Flex>

      <Grid templateColumns="minmax(300px, 2fr) repeat(7, 1fr) auto auto" gap={2} mb={4}>
        <GridItem />
        {weekDays.map((day) => (
          <GridItem
            key={day.toString()}
            textAlign="center"
            cursor="pointer"
            onClick={() => handleDayClick(day)}
            _hover={{ bg: 'gray.50' }}
            p={2}
            borderRadius="md"
          >
            <Text fontWeight="medium">{format(day, 'EEE', { locale: ja })}</Text>
            <Text color={format(day, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd') ? 'orange.500' : 'gray.600'}>
              {format(day, 'd MMM')}
            </Text>
          </GridItem>
        ))}
        <GridItem textAlign="center">
          <Text fontWeight="medium">Week</Text>
          <Text>total</Text>
        </GridItem>
        <GridItem />
      </Grid>

      {entries.map((entry) => (
        <Grid
          key={entry.id}
          templateColumns="minmax(300px, 2fr) repeat(7, 1fr) auto auto"
          gap={2}
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
          {weekDays.map((day) => (
            <GridItem
              key={day.toString()}
              textAlign="center"
              cursor="pointer"
              onClick={() => handleDayClick(day)}
              _hover={{ bg: 'gray.100' }}
            >
              <Text>{entry.times[format(day, 'yyyy-MM-dd')]}</Text>
            </GridItem>
          ))}
          <GridItem>
            <Text fontWeight="bold">{entry.total}</Text>
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

      <Flex gap={2} mt={4}>
        <Button leftIcon={<AddIcon />} onClick={() => handleDayClick(currentDate)}>Track time</Button>
        <Button variant="solid" colorScheme="green">Save</Button>
      </Flex>

      <Button mt={8} variant="outline">Submit week for approval</Button>

      <TimeEntryModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddEntry}
        date={selectedDate}
      />
    </Box>
  );
}; 