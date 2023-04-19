import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Heading, Well, LabeledValue, Flex} from '@adobe/react-spectrum';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';
import CheckmarkCircleOutline from '@spectrum-icons/workflow/CheckmarkCircleOutline';
import ThumbDownOutline from '@spectrum-icons/workflow/ThumbDownOutline';


function Prediction(props){
        var prediction = props.prediction;
		return(
                <div >

                    <Well>
                        <LabeledValue label="Title" value={props.title} />
                        <br/>
                        <LabeledValue label="Source" value={props.domain} />
                    </Well>
                    <br/>
                    <Flex direction="row" justifyContent='space-evenly'>

                        <Well>

                            <ContextualHelp variant="info">
                              <Heading>Bias Prediction</Heading>
                              <Content>
                                <Text>
                                  We use BERT-based NLP classifier model to detect political bias within the given news article.
                                </Text>
                              </Content>
                            </ContextualHelp>

                            <LabeledValue label="Bias Detection" value={''} />:
                            &ensp;
                            <Badge variant={prediction.bias == 'RIGHT' ? 'negative':'info'}>{prediction.bias}-WING</Badge>
                        </Well>
                            <br/> <br/>
                        <Well>
                            <Meter label="Confidence" variant="positive" value={prediction.value*100} />
                        </Well>


                    </Flex>
                </div>
                )
}

export default Prediction;
