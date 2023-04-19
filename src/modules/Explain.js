import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Heading, Well, LabeledValue} from '@adobe/react-spectrum';
import {Item, ListView} from '@adobe/react-spectrum';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';


function Explain(props){
        var items = props.explanations.map( (explanation, idx) => {return {text:explanation, id:idx}; } );

		return(
                <div >
                  <br/>
                    <Well>

                        <ContextualHelp variant="info">
                          <Heading>Model Explanations</Heading>
                          <Content>
                            <Text>
                              We use BERT-based NLP classifier model to detect political bias within the given news article.
                            </Text>
                          </Content>
                        </ContextualHelp>

                    <LabeledValue label="Why?" value={''} />

                    <ListView
                      items={items}
                      selectionMode="multiple"
                      maxWidth="size-6000"
                      maxHeight="200px"
                    >
                      {(item) => <Item>{item.text}</Item>}
                    </ListView>

                    <br/>
                    <Button variant="negative" style="outline" >Mark as incorrect</Button>
                    </Well>

                </div>
                )
}

export default Explain;
