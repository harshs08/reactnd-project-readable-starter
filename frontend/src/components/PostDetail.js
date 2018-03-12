import React from 'react'
import { connect } from 'react-redux';
import { fetchPost, deletePostById,updatePostById, vote } from '../utils/api'
import { listPost,updatePost, removePost,upVote, downVote } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import PostComments from './PostComments'


class PostDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      title: undefined,
      body: undefined,
      isEdit: false,
      removed:false
    }
  }

  vote(id, type) {
    vote(id, type).then((resp) => {
      type === 'upVote' ? this.props.upVote(resp) : this.props.downVote(resp)
    })
  }

  save(id) {
    if (this.state.title !== undefined || this.state.body !== undefined) {
      updatePostById(id, { title: this.state.title, body: this.state.body }).then((response) => {
        this.props.editPost(response)
      })
    } else {
      this.setState({isEdit:false})
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.getPost(id);
  }

  handleTitleInput = (title) => {
    this.setState({ title: title })
  }

  handleBodyInput = (body) => {
    this.setState({ body: body })
  }

  removePost(id){
    deletePostById(id).then((response)=>{
      this.props.removePost(response)
      this.setState({removed:true})
    })
  }

  getPost(id) {
    const postList = this.props.postList.post;
    if (postList.length === 0) {
      fetchPost().then((posts) => {
        this.props.listPost(posts)
        this.setState({ loading: false })
      })
    }
  }

  edit() {
    this.setState({ isEdit: true });
  }

  render() {
    const postList = this.props.postList.post;
    const filtered = postList.filter((item => item.id === this.props.match.params.id));
    const post = filtered[0];
    const isEdit = this.state.isEdit;

    if(post === undefined){
      return <div className="form-container">No post exist. <button className="button-form" onClick={() => this.props.history.goBack()}>DONE</button></div>
    }

    return (
      <div>
        <div className="header">
          <div><Link to="/">Back</Link></div>
        </div>
        <div className="form-container">
          <div className="form-field">
            {isEdit ? <div><button onClick={() => this.save(post.id)}>Save</button></div> : <div><button onClick={() => this.edit()}>Edit</button></div>}
            <div className="post-subitem">
              <button onClick={()=>this.removePost(post.id)}>Remove</button>
            </div>
            <div className="post-subitem"><button onClick={() => this.vote(post.id, "upVote")}>Like</button></div>
            <div className="post-subitem"><button onClick={() => this.vote(post.id, "downVote")}>Dislike</button></div>
          </div>
          <div className="form-field">
            {isEdit ? <div className="form-post-title">
                <input className="input-text" type="text" defaultValue={post.title} onChange={(event) => this.handleTitleInput(event.target.value)} /></div>
                : <div className="form-post-title">{post.title}</div>}
          </div>
          <div className="form-field">
            <div className="post-detail-sub">
              <div><span className="post-subtitle">Author</span> {post.author}</div>
              <div><span className="post-subtitle">Category</span> {post.category}</div>
              <div><span className="post-subtitle">Vote</span> {post.voteScore}</div>
              <div><span className="post-subtitle">Comments</span> {post.commentCount}</div>
            </div>
          </div>
          <div className="form-field">
            {isEdit ? <div className="form-post-body">
              <textarea className="input-text" defaultValue={post.body} onChange={(event) => this.handleBodyInput(event.target.value)} />
            </div> : <div className="form-post-body">{post.body}</div>}
          </div>
          <PostComments id={post.id} />
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
    listPost: (data) => dispatch(listPost(data)),
    editPost:(data)=>dispatch(updatePost(data)),
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    removePost:(data)=>dispatch(removePost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))

