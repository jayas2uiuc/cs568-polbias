import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Heading, Well, LabeledValue, Flex} from '@adobe/react-spectrum';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';
import CheckmarkCircleOutline from '@spectrum-icons/workflow/CheckmarkCircleOutline';
import ThumbDownOutline from '@spectrum-icons/workflow/ThumbDownOutline';


function Prediction(props){
        var bias = props.bias;
        var conf = props.confidence

        var badgeVariant = 'info'
        if (bias == 'RIGHT-WING'){
            badgeVariant = 'negative'
        }else if(bias == 'MODERATE'){
            badgeVariant = 'yellow'
        }

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
                            <Badge variant={badgeVariant}>{bias}</Badge>
                        </Well>
                            <br/> <br/>
                        <Well>
                            <Meter label="Confidence" variant="positive" value={conf*100} />
                        </Well>


                    </Flex>
                </div>
                )
}

export default Prediction;
