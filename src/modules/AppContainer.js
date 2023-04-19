import React, {useEffect} from 'react';
import {Button} from '@adobe/react-spectrum';
import Prediction from './Prediction';
import Explain from './Explain';
import RelatedNews from './RelatedNews';
import Debiaser from './Debiaser';
import {Item, TabList, TabPanels, Tabs} from '@adobe/react-spectrum'


function AppContainer(){

        const [highlightedText, setHighlightedText] = React.useState('');
        const [newsUrl, setNewsUrl] = React.useState('');
        const [domain, setDomain] = React.useState('');

        useEffect( () => {
            chrome.tabs && chrome.tabs.query(
                {active:true, currentWindow:true},
            tabs => {
                        setNewsUrl(tabs[0].url);
                        var url = new URL(tabs[0].url);
                        setDomain(url.hostname);
                        chrome.tabs.executeScript({code: "window.getSelection().toString();"},
                                                    function(selection) {setHighlightedText(selection[0])})
                      })
        });

        const biasInfo = makeApiCall(newsUrl);

		return(
                <div id="appContainer">
                        <Tabs>
                          <TabList>
                            <Item key="t1">Main</Item>
                            <Item key='t2'>Related News</Item>
                            <Item key="t3">Debiaser</Item>
                          </TabList>

                          <TabPanels>
                            <Item key="t1">
                              <Prediction title={biasInfo.title} prediction={biasInfo.prediction} domain={domain} />
                              <Explain explanations={biasInfo.explanations} />
                            </Item>

                            <Item key="t2">
                              <RelatedNews relatedNews={biasInfo.relatedNews} />
                            </Item>

                            <Item key="t3">
                              <Debiaser highlightedText={highlightedText}/>
                            </Item>
                          </TabPanels>
                        </Tabs>
                </div>
                )
}

function makeApiCall(url){
    return {title: "French Finance Minister: Changes needed to ensure prosperity",
            prediction: {bias: "RIGHT", value: 0.85},
            explanations: ["Expl 1", "Expl 2"],
            relatedNews: [{"source": "cnn.com", title:"Related news title 1", url:"https://www.cnn.com/"},
                            {"source": "fox.com", "title":"Related news title 2", url:"www.google.com"},
                            {"source": "nyt.com", "title":"Related news title 3", url:"www.google.com"}]}
}

export default AppContainer;
