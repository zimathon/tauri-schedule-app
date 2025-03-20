import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <Box bg="cyan.500" px={4} py={2} color="white">
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Time
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Expenses
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Projects
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Team
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Reports
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Invoices
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Manage
          </Button>
        </HStack>
        <HStack spacing={4}>
          <Button variant="ghost" color="white" _hover={{ bg: 'cyan.600' }}>
            Settings
          </Button>
          <Flex align="center" gap={2}>
            <Avatar
              size="sm"
              name="YS"
              bg="gray.700"
              color="white"
            />
            <Text>yusuke</Text>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
}; 