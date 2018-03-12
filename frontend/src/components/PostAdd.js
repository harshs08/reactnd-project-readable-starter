import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {randId} from '../utils/helper.js'
import {newPost} from '../utils/api.js'
import { addPost} from '../actions'

class PostAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted:false,
      title: undefined,
      body: undefined,
      author: undefined
    }
  }

  handleTitleInput = (title) => {
    this.setState({ title: title })
  }

  handleBodyInput = (body) => {
    this.setState({ body: body })
  }

  handleAuthorInput = (author) => {
    this.setState({ author: author })
  }

  save() {
    const timestamp = Date.now()
    const uid = randId()
    const post = {
      id:uid,
      timestamp:timestamp,
      title:this.state.title,
      body:this.state.body,
      author:this.state.author,
      category:this.props.match.params.category
    }

    newPost(post).then((response)=>{
      this.props.addPost(response)
      this.setState({submitted:true})
    })
  }

  render() {
    if(this.state.submitted){
      return <div className="form-container">Post added successfully. <button className="button-form" onClick={() => this.props.history.goBack()}>DONE</button></div>
    }

    return (
      <div className="form-container">
        <div>Add Post</div>
        <div className="form-field">Category {this.props.match.params.category}</div>
        <div className="form-field">
          <input type="text" placeholder="Title" className="input-text"
            onChange={(event) => this.handleTitleInput(event.target.value)}
          />
        </div>
        <div className="form-field">
          <textarea className="input-text" placeholder="Body"
            onChange={(event) => this.handleBodyInput(event.target.value)}
          />
        </div>
        <div className="form-field"><input type="text" placeholder="Author" className="input-text"
          onChange={(event) => this.handleAuthorInput(event.target.value)}
          /></div>
        <div className="form-field">
          <button className="button-form" onClick={()=>this.save()}>SUBMIT</button>
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
    addPost: (data) => 
    {
      dispatch(addPost(data))
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostAdd))