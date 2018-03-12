import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

import {
  listPost,
  removePost,
  listPostByCategory,
  sortPostByVoteAsc, 
  sortPostByVoteDesc,
  upVote,
  downVote
} from '../actions'
import {
  fetchPost,
  fetchPostByCategory,
  deletePostById,
  vote
} from '../utils/api'

import PostCategories from './PostCategories'

class PostList extends React.Component {
  componentDidMount() {
    const category = this.props.match.params.category

    if (category !== undefined) {
        this.getPostByCategory(category)
    } else {
        this.getAllPost()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getPostByCategory(nextProps.match.params.category)
    }
  }

  getPostByCategory(category) {
    fetchPostByCategory(category).then((posts) => {
      this.props.listPostByCategory(posts);
    })
  }

  getAllPost() {
    fetchPost().then((posts) => {
      this.props.listPost(posts)
    })
  }

  removePost(id){
    deletePostById(id).then((response)=> {
      this.props.removePost(response)
    })
  }


  vote(id, type) {
    vote(id, type).then((resp) => {
      type === 'upVote' ? this.props.upVote(resp) : this.props.downVote(resp)
    })
  }

  sortVoteScoreAsc(posts) {
    this.props.sortByVoteAsc(posts)
    this.setState({ posts: this.props.post })
  }

  sortVoteScoreDesc(posts) {
    this.props.sortByVoteDesc(posts)
    this.setState({ posts: this.props.post })
  }

  getPath(){
    const category = this.props.match.params.category
    if (category!==undefined){
      return category+'/post/add'
    } else {
      return 'all/post/add'
    }
  }


  render() {
    const posts = this.props.postList.post;

    if (posts === undefined) {
      return (<div>loading...</div>)
    }


    if (posts.length === 0) {
      return (
        <div>
          <div className='action-container'>
            <PostCategories />
          </div>
          <div className='action-container'>
            <div className="button-container">No posts.</div>
            <div className="button-container"><button className="button">Add Post</button></div>
          </div>
        </div>
      )
    }

    if (!Array.isArray(posts)) {
      return <div />
    }

    return (
      <div>
        <div className='action-container'>
          <PostCategories />
        </div>
        <div className='action-container'>
          <div className="button-container">
            <button
                className="button"
                onClick={() => this.props.history.push(this.getPath())}
            >
              Add Post</button></div>
          <div className="button-container"><button className="button" onClick={() => { this.sortVoteScoreAsc(posts) }}>Sort Vote Score Asc</button></div>
          <div className="button-container"><button className="button" onClick={() => { this.sortVoteScoreDesc(posts) }}>Sort Vote Score Desc</button></div>
        </div>
        <ul className='contact-list'>
          {posts.map((item) => (
            <li key={item.id} className='contact-list-item'>
              <div className='contact-details'>
                <Link to={`/${item.category}/${item.id}`} state={{ detail: true }}> {item.title}</Link>
              </div>
              <div className='post-list-sub'>
                <div> <span className="post-subtitle">Author</span> {item.author}</div>
                <div className="post-subitem"><span className="post-subtitle">Comments</span> {item.commentCount}</div>
                <div className="post-subitem"><span className="post-subtitle">Vote score</span> {item.voteScore}</div>
                <div className="post-subitem"><button onClick={() => this.vote(item.id, "upVote")}>Like</button></div>
                <div className="post-subitem"><button onClick={() => this.vote(item.id, "downVote")}>Dislike</button></div>
                <div className="post-subitem"><button>Edit</button></div>
                <div className="post-subitem">
                  <button onClick={()=>this.removePost(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
    listPostByCategory: (data) => dispatch(listPostByCategory(data)),
    sortByVoteAsc: (data) => dispatch(sortPostByVoteAsc(data)),
    sortByVoteDesc: (data) => dispatch(sortPostByVoteDesc(data)),
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data)),
    removePost:(data)=>dispatch(removePost(data))
  }
}



export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))