import {Button, Divider, Grid, Text} from '@nextui-org/react';
import React from 'react';
import {AcmeLogo} from '../navbar/logo';
import {Flex} from '../styles/flex';

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
            <Text h2 css={{textAlign: 'center'}}>
               Sample Cases
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
               Take a look of our sample conversations between the clients and ChatJustus
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
                  <Button as="a" auto flat href="http://34.90.113.6:42069/ChatJustus/first-contact">Example 1</Button>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                  <Button as="a" auto flat href="http://34.90.113.6:42069/ChatJustus/first-contact">Example 2</Button>
                  </Flex>
               </Grid>
               <Grid sm={3} justify="center">
                  <Flex align={'center'}>
                  <Button as="a" auto flat href="http://34.90.113.6:42069/ChatJustus/first-contact">Example 3</Button>
                  </Flex>
               </Grid>
               
            </Grid.Container>
         </Flex>

         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
         />
      </>
   );
};
