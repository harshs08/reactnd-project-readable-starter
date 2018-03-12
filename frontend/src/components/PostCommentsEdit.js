import React from 'react'
import { editComment } from '../utils/api'
import { connect } from 'react-redux';
import { updateComment } from '../actions'
import { withRouter } from 'react-router-dom'

class PostCommentsEdit extends React.Component {
  constructor(props){
    super(props)
    this.state={
      commentBody:undefined,
      submitted:false
    }
  }

  handleBodyInput = (body) => {
    this.setState({ commentBody: body });
  }

  save(id) {
    const timestamp = Date.now();
    editComment(id, { timestamp: timestamp, body: this.state.commentBody }).then((response) => {
      this.props.updateComment(response);
      this.setState({submitted:true})
    })
  }

  render() {
    const comments = this.props.commentList.comment;
    const id = this.props.match.params.id;
    const filtered = comments.filter((item => item.id === id));
    const comment = filtered[0];

    if(comment===undefined){
      return <div className="form-container">No comment exist. <button className="button-form" onClick={() => this.props.history.goBack()}>DONE</button></div>
    }

    if (this.state.submitted) {
      return <div className="form-container">Comment updated successfully.
      <button className="button-form" onClick={() => this.props.history.goBack()}>DONE</button></div>
    }

    return (
      <div className="form-container">
        <div>Edit Comment</div>
        <div className="form-field">
          <textarea className="input-text"
            defaultValue={comment.body}
            onChange={(event) => this.handleBodyInput(event.target.value)}
          />
        </div>
        <div className="form-field">
          <button className="button-form" onClick={() => this.save(comment.id)}>SUBMIT</button>
          <button className="button-form" onClick={() => this.props.history.goBack()}>CANCEL</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (data) => {
      dispatch(updateComment(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCommentsEdit))