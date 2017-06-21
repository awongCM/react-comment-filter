import React, { Component } from 'react';

export default class TopWidgetBar extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      allAcknowledged: this.areAllAcknowledged(props.data)
    }
  }

  areAllAcknowledged(obj){
    let isAllAcknowledged = obj.every((item) => {
      if(item.acknowledged) {return item;}
    });
    return isAllAcknowledged;
  }

  componentWillMount() {
    this.token = PubSub.subscribe('acknowledgement', (topic, obj) => {
      //do something here;
      this.setState({allAcknowledged: this.areAllAcknowledged(obj)});
    });
  }

  componentWillUnMount() {
    PubSub.unsubscribe(this.token);
  }
 
  render() {
    return (
      <div className="top-widget-bar">
          <div className="share-container"><i className="fa fa-envelope" aria-hidden="true"></i>Share Proof</div>
          <div className="zoom-container">
            <span><i className="fa fa-minus" aria-hidden="true"></i></span>
            <span>150%</span>
            <span><i className="fa fa-plus" aria-hidden="true"></i></span>
          </div>
          <div className={"notification-container " + (this.state.allAcknowledged ? 'read-all': 'unread') }><i className="fa fa-bell" aria-hidden="true"></i></div>
      </div>
    );
  }
}

