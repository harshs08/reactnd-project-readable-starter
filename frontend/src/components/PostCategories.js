import React from 'react'
import { fetchCategories } from '../utils/api'
import { Link} from 'react-router-dom'

class PostCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      categories: []
    }
  }

  componentWillMount() {
    this.getCategories()
  }

  getCategories() {
    fetchCategories().then((categories) => {
      this.setState({ loading: false, categories: categories })
    })
  }

  render() {
    let categories = this.state.categories

    if(this.state.loading){
      return <div>Loading...</div>
    }

    return (
      <ul id="categorieslist">
        <li><span className="categories-title">Categories</span></li>
        <li><Link to="/">all</Link></li>
          {
            categories.categories.map((item)=>(
              <li key={`${item.name}`}><Link to={`/${item.name}`}>{item.name}</Link></li>
            ))
          }
      </ul>
    )
  }
}

export default PostCategories