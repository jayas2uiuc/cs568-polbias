import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Well, LabeledValue} from '@adobe/react-spectrum';
import {Item, ListView} from '@adobe/react-spectrum';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';


function RelatedNews(props){
        var items = props.relatedNews.map( (news, idx) => {return {title:news.title, url:news.url, src:news.source, id:idx}; } );

		return(
                <div >
                  <br/>
                    <Well>

                    <LabeledValue label="Newsfeed" value={''} />

                    <ListView
                      items={items}
                      selectionMode="multiple"
                      maxWidth="size-6000"
                      maxHeight="200px"
                      onAction={(key) => window.open(props.relatedNews[key].url)}
                    >
                      {(item) => <Item>{'(Source: '+item.src+') '+ item.title}</Item>}
                    </ListView>

                    <br/>
                    <Button variant="negative" style="outline" >Mark as unrelated</Button>


                    <br/>
                    </Well>

                </div>
                )
}

export default RelatedNews;
