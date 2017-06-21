import React, { Component } from 'react';

export default class ArtworkCommentsList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		data: props.data
  	}
  }

  handleChange(item_id, e){
  	e.preventDefault();
  	
  	this.setState((prev_state) => {
		return {
			data: prev_state.data.map((item) => {
				return  {
					...item,
					acknowledged: item.id === item_id ? !item.acknowledged : item.acknowledged
				}
			})
		}
  	});
  }

  componentDidUpdate() {
  	PubSub.publish('acknowledgement', this.state.data);
  }

  render() {
    
    let itemsList = this.state.data.map((item) => 
      <ArtworkCommentItem key={item.id} data={item} handleChange={this.handleChange.bind(this)} />
    );

    return (
      <div className="main-list">
      	<ul>{itemsList}</ul>
      </div>
    );
  }
}

class ArtworkCommentItem extends Component {
	render() {
		let commentItem = this.props.data;
		return (
			<li>
				<div className="item-container">
					<div className="media">
						<img src={commentItem.user.image.square_url} />
					</div>
					<div className="description">
						<span className="content">{commentItem.user.full_name}</span>
						<span className="content">{commentItem.body}</span>
						<span className="content">{commentItem.dates.created.date_time}
								<span onClick={(e) => this.props.handleChange(commentItem.id, e)} 
									className={"acknowledge-message " + (commentItem.acknowledged ? 'hidden':'')}> | Mark as seen </span>
						</span>
					</div>
					
				</div>
			</li>
		);
	}
}