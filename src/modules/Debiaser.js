import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Heading, Well, LabeledValue, Flex} from '@adobe/react-spectrum';
import GlobeCheck from '@spectrum-icons/workflow/GlobeCheck';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';

function Debiaser(props){

        var highlightedText = props.highlightedText;
        const [debiasedText, setDebiasedText] = React.useState('');

        function debias(){
            setDebiasedText(highlightedText);
        }

		return(
                <div >

                     <ContextualHelp variant="info">
                      <Heading>Neutral Text Generation</Heading>
                      <Content>
                        <Text>
                          We use LLM-based models to generate neutral content version.
                        </Text>
                      </Content>
                    </ContextualHelp>

                    <LabeledValue label="Debiaser tool" value={''} />

                    <Flex direction="column"  >
                      <Well>
                        <LabeledValue label="Highlighted Text" value={highlightedText} />
                      </Well>

                      <Button variant="primary" onClick={debias}>
                         <Text>Debias</Text>
                       </Button>

                       <Well>
                           <LabeledValue label="Debiased Text" value={debiasedText} />
                        </Well>
                    </Flex>
                </div>
                )
}

export default Debiaser;
