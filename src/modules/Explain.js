import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Heading, Well, LabeledValue} from '@adobe/react-spectrum';
import {Item, ListView} from '@adobe/react-spectrum';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';
import {ProgressCircle} from '@adobe/react-spectrum'


function Explain(props){

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
                        <ExplainTable explanations={props.explanations} />
                    </Well>
                </div>
                )
}

function ExplainTable(props){

    if(props.explanations != ''){
        var items = props.explanations.map( (explanation, idx) => {return {text:explanation, id:idx}; } );

        return (
        <div >
            <ListView
              items={items}
              selectionMode="multiple"
              maxWidth="size-6000"
              maxHeight="400px"
              overflowMode="wrap">

              {(item) => <Item>{'\"' + item.text}</Item>}
            </ListView>
            <br/>
            <Button variant="negative" style="outline" >Mark as incorrect</Button>
        </div>
        )
    }else{
        return (
        <div >
            <br/>
            <ProgressCircle isIndeterminate />
        </div>
        )
    }

}

export default Explain;
