import React, {useEffect} from 'react';
import {Button, Meter, Badge, Divider, Well, LabeledValue} from '@adobe/react-spectrum';
import {Item, ListView} from '@adobe/react-spectrum';
import {ContextualHelp, Content, Text} from '@adobe/react-spectrum';
import {Cell, Column, Row, TableView, TableBody, TableHeader} from '@adobe/react-spectrum'



function RelatedNews(props){
        var items = props.relatedNews.map( (news, idx) => {return {title:news.title, url:news.url,
                                                src:news.publisher.title, date: news['published date'], id:idx}; } );
        let columns = [
          {name: 'Title', uid: 'title'},
          {name: 'Source', uid: 'src'},
          {name: 'Date', uid: 'date'}
        ];

		return(
                <div >
                  <br/>
                    <Well>

                    <LabeledValue label="Newsfeed" value={''} />


                    <TableView
                      maxWidth="size-6000"
                      selectionMode="multiple"
                      overflowMode="wrap">
                      <TableHeader columns={columns}>
                        {column => (
                          <Column
                            key={column.uid}
                            align={column.uid === 'date' ? 'end' : 'start'}>
                            {column.name}
                          </Column>
                        )}
                      </TableHeader>
                      <TableBody items={items}>
                        {item => (
                          <Row>
                            {columnKey => <Cell>{item[columnKey]}</Cell>}
                          </Row>
                        )}
                      </TableBody>
                    </TableView>


                    <br/>
                    <Button variant="negative" style="outline" >Mark as unrelated</Button>


                    <br/>
                    </Well>

                </div>
                )
}

export default RelatedNews;
