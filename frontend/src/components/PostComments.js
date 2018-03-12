import React from 'react'
import { fetchComments, deleteComment, voteComment } from '../utils/api'
import { connect } from 'react-redux';
import { removeComment, likeComment, dislikeComment,listComment } from '../actions'
import { withRouter } from 'react-router-dom'

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      comments: []
    }
  }

  componentDidMount() {
    let id = this.props.id
    this.getComments(id)
  }

  removeComment(id) {
    deleteComment(id).then((response) => {
      this.props.removeComment(response)
    })
  }

  getComments(postId) {
    fetchComments(postId).then((comments) => {
      this.props.listComment(comments)
      this.setState({ loading: false })
    })
  }

  vote(id, voteType) {
    voteComment(id, voteType).then((response) => {
      if (voteType === 'upVote') {
        this.props.likeComment(response);
      } else {
        this.props.dislikeComment(response);
      }
    })
  }


  render() {
    let comments = this.props.commentList.comment;
    return (
      <div>
        <div className="form-field">
          <div className="comments-title">Comments</div>
          <div className="post-subitem"><button onClick={()=>this.props.history.push('/posts/comments/'+this.props.id)}>Add Comment</button></div>
        </div>
        <div>
          <ul className="comments-list">
            {
              comments.map((comment) => (
                <li key={comment.id} className="comments-list-item">
                  <div className="comments-body"> {comment.body}</div>
                  <div className='post-list-sub'>
                    <div> <span className="post-subtitle">Author</span> {comment.author}</div>
                    <div className="post-subitem"><span className="post-subtitle">Vote</span> {comment.voteScore}</div>
                    <div className="post-subitem"><button onClick={() => this.vote(comment.id, "upVote")}>Like</button></div>
                    <div className="post-subitem"><button onClick={() => this.vote(comment.id, "downVote")}>Dislike</button></div>
                    <div className="post-subitem"><button onClick={()=>this.props.history.push('/posts/comments/edit/'+comment.id)}>Edit</button></div>
                    <div className="post-subitem"><button onClick={() => this.removeComment(comment.id)}>Remove</button></div>
                  </div>
                </li>
              ))
            }
          </ul>
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
    removeComment: (data) => {
      dispatch(removeComment(data))
    },
    likeComment: (data) => dispatch(likeComment(data)),
    dislikeComment: (data) => dispatch(dislikeComment(data)),
    listComment:(data)=>dispatch(listComment(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostComments))