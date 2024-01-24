import { Button, Divider, Grid, Text } from '@nextui-org/react';
import React from 'react';
import { AcmeLogo } from '../navbar/logo';
import { Flex } from '../styles/flex';

export const Trusted = () => {
   return (
      <>
         <Flex
            direction={'column'}
            align={'center'}
            css={{
               'pt': '$20',
               'px': '$6',
               '@md': {
                  px: '$64',
               },
            }}
         >
            <Text h2 css={{ textAlign: 'center', fontFamily: 'serif' }}>
               Example Legal Cases
            </Text>
            <Text
               css={{
                  color: '$accents8',
                  maxWidth: '800px',
                  textAlign: 'center',
               }}
               weight="normal"
               size={'$lg'}
            >
               Take a look of our example conversations between the clients and ChatJustus
            </Text>

            <Grid.Container
               gap={6}
               alignItems="center"
               justify="center"
               css={{
                  'width': '100%',
                  '@sm': {
                     width: '100%',
                  },
                  '&  span': {
                     whiteSpace: 'pre',
                  },
               }}
            >
               <Grid sm={3} justify="center">
                  <Flex align={'center'} justify={'center'}>
                     <Button as="a" auto flat href="http://34.90.113.6:42069/ChatJustus/demo-first-contact?case_id=a93be7b7-20b2-49db-8c92-e083bc25f85b">Merger</Button>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <Button as="a" auto flat href="http://34.90.113.6:42069/ChatJustus/demo-first-contact?case_id=4be445c2-f6a9-49e8-afdf-d3c798538059">Loud Neighbors</Button>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <Button as="a" auto flat href="http://34.90.113.6:42069/ChatJustus/demo-first-contact?case_id=438f6b6d-1a92-483c-b020-7d4b668e4200">Teddy Bear</Button>
                  </Flex>
               </Grid>

               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                     <Button
                        as="a"
                        auto
                        flat
                        href="http://34.90.113.6:42069/ChatJustus/cases.html"
                        css={{
                           backgroundColor: '$gray500',
                           color: '$white100',
                        }}
                     >
                        See All
                     </Button>
                  </Flex>
               </Grid>

            </Grid.Container>
         </Flex>

         <Divider
            css={{ position: 'absolute', inset: '0p', left: '0', mt: '$5' }}
         />
      </>
   );
};
