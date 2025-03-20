import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  tasks: string[];
}

interface TimeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: {
    project: string;
    task: string;
    notes: string;
    time: string;
  }) => void;
  date: Date;
}

export const TimeEntryModal: React.FC<TimeEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  date,
}) => {
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [notes, setNotes] = useState('');
  const [time, setTime] = useState('0:00');

  // サンプルプロジェクトデータ
  const projects: Project[] = [
    {
      id: '1',
      name: 'ESI オフグリッド住宅用メーター',
      tasks: ['Programming', 'Meeting', 'Documentation'],
    },
    {
      id: '2',
      name: 'Project B',
      tasks: ['Design', 'Development', 'Testing'],
    },
  ];

  const handleSubmit = () => {
    onSubmit({
      project,
      task,
      notes,
      time,
    });
    onClose();
    // フォームをリセット
    setProject('');
    setTask('');
    setNotes('');
    setTime('0:00');
  };

  const selectedProject = projects.find(p => p.name === project);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New time entry for {date.toLocaleDateString('ja-JP')}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Project / Task</FormLabel>
              <Select
                placeholder="Select project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                placeholder="Select task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                isDisabled={!selectedProject}
              >
                {selectedProject?.tasks.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Notes (optional)</FormLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes..."
              />
            </FormControl>

            <FormControl>
              <FormLabel>Time</FormLabel>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="0:00"
                pattern="[0-9]{1,2}:[0-9]{2}"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Start timer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}; 