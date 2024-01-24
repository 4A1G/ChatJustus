import { Button, Divider, Text } from '@nextui-org/react';
import React from 'react';
import { BoxIcon } from '../icons/BoxIcon';
import { FeatureIcon } from '../icons/FeatureIcon';
import { Flex } from '../styles/flex';

export const Features2 = () => {
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
                  gap: '0.5rem',
                  flexDirection: 'space-around',
                  px: '$16',
               },
               '@md': {
                  justifyContent: 'space-evenly',
               },
            }}
         >
            <Flex direction="column" align={'center'}>
               <Text span css={{ color: '$blue600' }}>
                  Show Case - Follow Ups
               </Text>
               <Text h2>Marco's Divorce Case</Text>
               <Text
                  span
                  css={{
                     maxWidth: '400px',
                     color: '$accents8',
                  }}
               >
                  In the meeting, Marco didn't jot down many notes and now worries about forgetting important stuff. Plus, he gets legal papers full of confusing jargon. To untangle it all, he turns to ChatJustus for help, hoping to clear up crucial meeting points and understand the tricky legal terms.
               </Text>

               <Flex
                  justify={'center'}
                  wrap={'wrap'}
                  css={{
                     py: '$10',
                  }}
               >
                  <Flex
                     css={{
                        py: '$10',
                        gap: '$5',
                     }}
                  >
                     <BoxIcon />
                     <Flex direction={'column'}>
                        <Text h4 weight={'medium'}>
                           1. Post-Meeting Summary Email
                        </Text>
                        <Text
                           span
                           css={{
                              maxWidth: '400px',
                              color: '$accents8',
                           }}
                        >
                           Marco will receive an email after the meeting, containing a summary of the discussion with the lawyer and a link to ChatJustus for follow-up questions.
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
                           2. High Frequent Follow Ups on ChatJustus
                        </Text>
                        <Text
                           span
                           css={{
                              maxWidth: '400px',
                              color: '$accents8',
                           }}
                        >
                           Marco can review key meeting points, pose questions, and seek clarification on legal terminology, with responses presented in bullet points and footnoted to reliable sources within the platform's law database.
                        </Text>
                     </Flex>
                     <BoxIcon />
                     <Flex direction={'column'}>
                        <Text h4 weight={'medium'}>
                           3. Schedule Additional Meetings With The Lawyer
                        </Text>
                        <Text
                           span
                           css={{
                              maxWidth: '400px',
                              color: '$accents8',
                           }}
                        >
                           If Marco has unresolved questions beyond ChatJustus, he has the option to schedule further meetings with the lawyer for more personalized assistance and actual legal advice.
                        </Text>
                     </Flex>
                  </Flex>
               </Flex>
            </Flex>
            <Flex align={'center'}>
               <div style={{ overflow: 'clip', borderRadius: '20px' }}>
                  <video autoPlay muted loop style={{ objectFit: 'cover', objectPosition: 'center', marginLeft: '-6%', marginRight: '-8%', marginBottom: '-2%', width: '114%' }}>
                     <source src="https://syncandshare.lrz.de/dl/fiMwkc6RJpgksXs1MoWTED/Demo_Part2.mp4" type="video/mp4" />
                  </video>
               </div>
            </Flex>
         </Flex>



         <Divider
            css={{ position: 'absolute', inset: '0p', left: '0', mt: '$15' }}
         />



      </>
   );
};

