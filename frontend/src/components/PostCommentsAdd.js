import React from 'react'
import { newComment } from '../utils/api'
import { connect } from 'react-redux'
import { addComment } from '../actions';
import { randId } from '../utils/helper.js'
import { withRouter } from 'react-router-dom'

class PostCommentsAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentBody: {},
      author: {},
      submitted: false
    }
  }

  handleBodyInput = (body) => {
    this.setState({ commentBody: body })
  }

  handleAuthorInput = (author) => {
    this.setState({ author: author })
  }

  save() {
    const timestamp = Date.now()
    const uid = randId()

    const comment = {
      id: uid,
      timestamp: timestamp,
      body: this.state.commentBody,
      author: this.state.author,
      parentId:this.props.match.params.parentId
    }

    newComment(comment).then((response) => {
        this.setState({submitted:true})
        this.props.addComment(response)
    })
  }

  render() {
    if (this.state.submitted) {
      return <div className="form-container">Comment added successfully.
        <button className="button-form" onClick={() => this.props.history.goBack()}>DONE</button></div>
    }

    return (
      <div className="form-container">
        <div>Add Comment</div>
        <div className="form-field">
          <textarea className="input-text" placeholder="Body"
            onChange={(event) => this.handleBodyInput(event.target.value)}
          />
        </div>
        <div className="form-field"><input type="text" placeholder="Author" className="input-text"
          onChange={(event) => this.handleAuthorInput(event.target.value)}
        /></div>
        <div className="form-field">
          <button className="button-form" onClick={() => this.save()}>SUBMIT</button>
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
    addComment: (data) => {
      dispatch(addComment(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCommentsAdd))