import {
  Box,
  Flex,
  Text,
  Image,
  Container,
  Link,
  Card,
} from '@chakra-ui/react';

export default function Home() {
  const cards = [
    {
      title: 'World Map',
      description:
        'This sofa is perfect for modern tropical spaces, baroque inspired spaces.',
      imageUrl:
        'https://originalmap.co.uk/wp-content/uploads/2019/08/Beautiful-World-Map_Original-Map-1.jpg',
    },
    {
      title: 'Forest Map',
      description:
        'A cozy armchair that fits perfectly in any living room or study.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDuCZF08JeIYIYtzEY3GC-wjpBJj1FeDAVA&s',
    },
    {
      title: 'City Map',
      description:
        'A stylish coffee table that complements modern and classic interiors.',
      imageUrl:
        'https://developers.google.com/static/maps/images/landing/hero_mobile_maps_sdks_new_colors.png',
    },
  ];

  return (
    <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
      {/* Üst Kısım */}
      <Box mt={{ base: 6, md: 10 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={{ base: 6, md: 0 }}
        >
          {/* Metin Kısmı */}
          <Box
            width={{ base: '100%', md: '1/2' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="orange.600"
              fontWeight="semibold"
            >
              It s very easy to choose a location
            </Text>
            <Text
              fontSize={{ base: '4xl', md: '7xl' }}
              color="gray.900"
              fontWeight="bold"
              my={{ base: 4, md: 7 }}
            >
              Free location adding app start now
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400">
              Built Wicket longer admire do barton vanity itself do in it.
              Preferred to sportsmen it engrossed listening. Park gate sell they
              west hard for the.
            </Text>
            <Link
              mt={{ base: 6, md: 10 }}
              href="/add-location"
              px={4}
              py={2}
              bg="gray.900"
              color="white"
              rounded="md"
              _hover={{ bg: 'gray.200', color: 'gray.900', borderRadius: 'md' }}
              display="inline-block"
            >
              Add Location
            </Link>
          </Box>

          {/* Resim Kısmı */}
          <Image
            src="https://media.istockphoto.com/id/535913739/vector/vector-map-with-pin-pointer-illustration.jpg?s=612x612&w=0&k=20&c=k70y-GYfXRUiuSdq7ie_BF9Mvry6XlgZV3ENFR-TDJk="
            alt="App Logo"
            boxSize={{ base: '300px', md: '500px' }}
            mb={6}
          />
        </Flex>
      </Box>

      {/* Kartlar */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        gap={{ base: 6, md: 4 }}
        mt={{ base: 6, md: 10 }}
      >
        {cards.map((card, index) => (
          <Card.Root
            key={index}
            maxW={{ base: '100%', md: 'sm' }}
            overflow="hidden"
          >
            <Image
              src={card.imageUrl}
              alt={card.title}
              boxSize={{ base: '100%', md: '380px' }}
              objectFit="cover"
            />
            <Box p={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {card.title}
              </Text>
              <Text fontSize="md" color="gray.600">
                {card.description}
              </Text>
            </Box>
          </Card.Root>
        ))}
      </Flex>
    </Container>
  );
}
