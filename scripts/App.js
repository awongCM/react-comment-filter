import React, { Component } from 'react';
import ArtworkCommentsList from './artwork-comments-list.js';
import TopWidgetBar from './top-widget-bar.js';
import {data} from './data/comment_data.js';
import styles from './css/styles.css';

export default class App extends Component {
  render() {
    return (
    	<div>
    		<TopWidgetBar data={data} />
      		<ArtworkCommentsList data={data} />		
    	</div>
    );
  }
}
