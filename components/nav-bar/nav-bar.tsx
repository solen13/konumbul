'use client';
import React from 'react';
import {
  Flex,
  Box,
  Link,
  Button,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react';

import { usePathname } from 'next/navigation'; // Next.js 14'te usePathname hook'u
import { IoClose } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';

const Navbar = () => {
  const pathname = usePathname(); // usePathname hook'u ile mevcut rotayı al
  const [isOpen, setIsOpen] = React.useState(false); // Mobil menü durumu
  const isMobile = useBreakpointValue({ base: true, md: false }); // Mobil ekran kontrolü

  // Aktif link stilini belirle
  const isActive = (path: string) => {
    return pathname === path
      ? { color: 'black', fontWeight: 'bold' }
      : { color: 'gray.600' };
  };

  // Mobil menüyü aç/kapat
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      align="center"
      justify={{ base: 'space-between', md: 'space-around ' }}
      wrap="wrap"
      padding={{ base: 4, md: '1.5rem' }}
      bg="orange.50"
      color="white"
    >
      <Box>
        <Link
          href="/"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ textDecoration: 'none' }}
          color="gray.900"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/128/854/854894.png"
            alt="App Logo"
            boxSize={{ base: '60px', md: '60px' }} // Mobilde küçük, masaüstünde büyük
            mb={6}
          />
        </Link>
      </Box>

      {isMobile && (
        <Button
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={toggleMenu}
          variant="ghost"
        >
          {isOpen ? <IoClose /> : <IoMdMenu />}
        </Button>
      )}

      {/* Linkler (Masaüstü) */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexDirection={{ base: 'column', md: 'row' }}
        mt={{ base: 4, md: 0 }}
      >
        <Link
          href="/route-lines"
          px={4}
          py={2}
          _hover={{ bg: 'gray.200', borderRadius: 'md' }}
          style={isActive('/route-lines')}
          color="gray.900"
          textAlign={{ base: 'center', md: 'left' }}
          width={{ base: '100%', md: 'auto' }}
        >
          Route Lines
        </Link>
        <Link
          href="/list-locations"
          px={4}
          py={2}
          _hover={{ bg: 'gray.200', borderRadius: 'md' }}
          style={isActive('/list-locations')}
          color="gray.900"
          textAlign={{ base: 'center', md: 'left' }}
          width={{ base: '100%', md: 'auto' }}
        >
          Location List
        </Link>
      </Box>

      {/* Add Location Butonu */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        textAlign={{ base: 'center', md: 'left' }}
        width={{ base: '100%', md: 'auto' }}
        mt={{ base: 4, md: 0 }}
      >
        <Link
          px={4}
          py={2}
          _hover={{ bg: 'gray.200', color: 'gray.900', borderRadius: 'md' }}
          bg="gray.500"
          borderRadius="md"
          color="white"
          href="/add-location"
          display="inline-block"
          width={{ base: '100%', md: 'auto' }}
        >
          Add Location
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
