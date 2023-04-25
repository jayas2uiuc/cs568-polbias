import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Heading, Well, LabeledValue, Flex} from '@adobe/react-spectrum';
import GlobeCheck from '@spectrum-icons/workflow/GlobeCheck';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';
import {ProgressCircle} from '@adobe/react-spectrum';

function Debiaser(props){

        var highlightedText = props.highlightedText;
//        var highlightedText = "The only crime that has been discussed in this case is an unprecedented attempt to revive a misdemeanor for falsifying business documents that expired years ago. If that is still the basis of Thursday’s indictment, Bragg could not have raised a weaker basis to prosecute a former president. If reports are accurate, he may attempt to \"bootstrap\" the misdemeanor into a felony (and longer statute of limitations) by alleging an effort to evade federal election charges."

        var bias = props.bias;
        const [debiasedText, setDebiasedText] = React.useState('');

        function debias(){
            if(debiasedText)
                return
            makeDebiasApiCall(highlightedText, bias).then(response => setDebiasedText(response.debiased));
        }

        async function makeDebiasApiCall(highlightedText, newsBias) {
            console.log("One more api call", JSON.stringify({text: highlightedText, bias: newsBias}))
            setDebiasedText('Loading');
            const response = await fetch('http://127.0.0.1:5000/debias', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",},
                body: JSON.stringify({text: highlightedText, bias: newsBias})
              })
            return await response.json();
        }

		return(
                <div >

                    <br/>

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

                      <br/>

                      <Button variant="primary" onClick={debias}>
                         <Text>Debias</Text>
                       </Button>

                       <br/>

                       <Well>
                            <Debiased debiasedText={debiasedText} />
                        </Well>
                    </Flex>
                </div>
                )
}


function Debiased(props){
    var debiasedText = props.debiasedText;

    if(debiasedText != 'Loading'){
        return <LabeledValue label="Debiased Text" value={debiasedText} />
    }else{
        return  (
                       <div >
                           <br/>
                           <ProgressCircle isIndeterminate />
                       </div>
                       )
    }
}

export default Debiaser;
