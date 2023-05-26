import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
  Player,
} from '@livepeer/react';
import { H1, ParMd, Button } from '@daohaus/ui';
import { NEXT_PUBLIC_STUDIO_API_KEY } from '../utils/hub';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { VIDEOS } from '../utils/constants';

const client = createReactClient({
  provider: studioProvider({ apiKey: NEXT_PUBLIC_STUDIO_API_KEY }),
});

// const PosterImage = () => {
//   return <Image src={''} height={'100%'} objectFit="cover" alt="Creative Warrior" placeholder="blur" />
// }

export const HomeNotConnected = () => {
  return (
    <LivepeerConfig client={client}>
      <Flex
        align="center"
        justify={{ base: 'center', sm: 'center', md: 'space-between', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap={'wrap'}
        minH="70vh"
        px={8}
        mb={10}
      >
        <Stack
          spacing={5}
          w={{ base: '80%', md: '50%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
          mr={50}
          mb={10}
        >
          <H1 color="primary.800">{'CREATIVE ProjeX'}</H1>
          <ParMd color="primary.800">
            {'Empower Your Creative Vision: Unleash the DAOvolution!'}
          </ParMd>
          <Button href="/" size="lg">
            {'Summon'}
          </Button>
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            No credit card required.
          </Text>
        </Stack>
        <Box
          w={{ base: '80%', sm: '60%', md: '50%' }}
          h={'auto'}
          mb={{ base: 12, md: 0 }}
        >
          <Player
            title="Metro Boomin"
            playbackId={VIDEOS.FEATURED}
            showPipButton
            autoPlay
            loop
            showTitle={false}
            aspectRatio="16to9"
            controls={{
              autohide: 3000,
            }}
            theme={{
              borderStyles: { containerBorderStyle: 'solid' },
              colors: {
                accent: '#EC407A',
              },
              radii: { containerBorderRadius: '10px' },
            }}
          />
        </Box>
      </Flex>
    </LivepeerConfig>
  );
};
