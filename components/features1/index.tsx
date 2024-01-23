import {Divider, Grid, Text} from '@nextui-org/react';
import React from 'react';
import {BoxIcon} from '../icons/BoxIcon';
import {FeatureIcon} from '../icons/FeatureIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const Features1 = () => {
   return (
      <>
         <Flex
            direction={'column'}
            css={{
               'gap': '1rem',
               'pt': '$20',
               'justifyContent': 'center',
               'alignItems': 'center',
               'px': '$6',
               '@sm': {
                  justifyContent: 'space-around',
                  px: '$32',
                  flexDirection: 'row',
               },
               '@md': {
                  px: '$64',
               },
            }}
         >
            <Flex direction="column">
               <Text span css={{color: '$blue600'}}>
                  Show Case - First Contact
               </Text>
               <Text h3>Marco's Divorce Case</Text>
               <Text
                  span
                  css={{
                     maxWidth: '400px',
                     color: '$accents8',
                  }}
               >
                  Exhausted and frustrated from searching for a divorce lawyer and waiting for replies, Marco hits a dead end. However, a silver lining appears when he discovers a website with ChatJustus. Finding a suitable lawyer becomes effortlessly simple, infusing a fresh sense of ease as he navigates the complexities of his divorce concerns.
               </Text>

               <Flex
                  css={{
                     py: '$10',
                     gap: '$5',
                  }}
               >
                  <BoxIcon />
                  <Flex direction={'column'}>
                     <Text h4 weight={'medium'}>
                        1. Simple Communication
                     </Text>
                     <Text
                        span
                        css={{
                           maxWidth: '400px',
                           color: '$accents8',
                        }}
                     >
                        Marco initiates contact with ChatJustus to discuss his legal problem. The conversation is designed to be straightforward, allowing Marco to easily communicate his concerns without any complicated processes.
                     </Text>
                  </Flex>
               </Flex>
               <Flex
                  css={{
                     py: '$10',
                     gap: '$5',
                  }}
               >
                  <BoxIcon />
                  <Flex direction={'column'}>
                     <Text h4 weight={'medium'}>
                     2. Efficient Inquiry Submission
                     </Text>
                     <Text
                        span
                        css={{
                           maxWidth: '400px',
                           color: '$accents8',
                        }}
                     >
                        Marco is required to provide his contact information after a brief understanding of his legal issue. This serves as a simplified contact form, allowing for an efficient submission of the legal inquiry without requiring extensive details at this initial stage.
                     </Text>
                  </Flex>
               </Flex>
               <Flex
                  css={{
                     py: '$10',
                     gap: '$5',
                  }}
               >
                  <BoxIcon />
                  <Flex direction={'column'}>
                     <Text h4 weight={'medium'}>
                        3. Facilitated Lawyer Matching
                     </Text>
                     <Text
                        span
                        css={{
                           maxWidth: '400px',
                           color: '$accents8',
                        }}
                     >
                        Once Marco discribed his problem, ChatJustus uses this data to match him with a suitable lawyer within the law firm. This process ensures that Marco is connected with the right legal professional who can address his specific needs, setting the stage for a subsequent meeting between Marco and the chosen lawyer.
                     </Text>
                  </Flex>
               </Flex>
            </Flex>
            <Flex align={'center'}>
            <video autoPlay muted loop width='750px'>
               <source src="Demo_Part1.mp4" type="video/mp4"/>

            </video>

            </Flex>
         </Flex>
         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
         />
      </>
   );
};
