import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import MetalLiquidEffect from './MetalLiquidEffect';

// const DARK_BG_COLOR = '#A8B5B5';

const Homepage = () => {
  return (
    <Box position='relative' minH='100vh' w='full' overflow='hidden'>
      <Box position='fixed' top={0} left={0} w='full' h='100vh' zIndex={0}>
        <MetalLiquidEffect />
      </Box>
      <Flex
        as='section'
        position='absolute'
        top={0}
        left={0}
        minH='100vh'
        w='full'
        // bg='transparent'
        direction='column'
        justify='space-between'
        p={{ base: 8, md: 16 }}
        // align='flex-start'
        zIndex={1}
      >
        <Flex w='full' justify='space-between' align='flex-start'>
          {/* TOP-LEFT: Name */}
          <Box flexShrink={0} pt={1}>
            <Heading
              as='h1'
              fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
              fontWeight='bold'
              color='#767676'
              lineHeight='1.1'
            >
              JENNIFER STONE
            </Heading>
          </Box>
          {/* RIGHT SIDE GROUP: Description and Kanji */}
          <Flex align='flex-start' gap={{ base: 4, md: 8, lg: 16 }} ml='auto'>
            <Box
              maxW={{ base: '300px', md: '450px' }}
              mt={{ base: '2rem', md: '4rem', lg: '8rem' }} // Increased margin to push it down
            >
              <Text
                fontSize={{ base: '1.2rem', md: '1.4rem', lg: '1.6rem' }}
                fontWeight='light'
                color='#767676'
                lineHeight='1.5'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam.
              </Text>
            </Box>
            {/* TOP-RIGHT: Vertical Kanji */}
            <VStack flexShrink={0} align='flex-end' gap={0}>
              <Heading
                fontSize={{ base: '10vh', md: '12vh', lg: '15vh' }} // Slightly larger font size
                fontWeight='light'
                color='#767676'
                lineHeight='1'
                children='巧'
              />
              <Heading
                fontSize={{ base: '10vh', md: '12vh', lg: '15vh' }} // Slightly larger font size
                fontWeight='light'
                color='#767676'
                lineHeight='1'
                children='柔'
              />
            </VStack>
          </Flex>
        </Flex>
        {/* Skills and Title Container (Bottom Left) */}
        <VStack
          flexGrow={0}
          alignSelf='flex-start'
          gap={{ base: 4, md: 8, lg: 12 }}
        >
          <Box alignSelf='flex-start'>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} color='#767676'>
              HTML / CSS / JAVASCRIPT / REACT / WORDPRESS / SQUARESPACE
            </Heading>
          </Box>
          {/* Bottom-Left Container: Role/Title */}
          <Box alignSelf='flex-start'>
            <Heading
              fontSize={{ base: '6xl', md: '8xl' }}
              fontWeight='extrabold'
              color='#767676'
              lineHeight='1'
            >
              FRONT-END WEB DEVELOPER
            </Heading>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Homepage;
