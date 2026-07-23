import React from 'react';
import Post from './Post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasError: false,
      errorMessage: ''
    };
  }

  // Fetches posts from the API and stores them in component state
  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const posts = data.map(
          (item) => new Post(item.id, item.title, item.body)
        );
        this.setState({ posts: posts });
      })
      .catch((error) => {
        // Update state so componentDidCatch style handling / render can react to it
        alert('Error while fetching posts: ' + error.message);
      });
  }

  // Lifecycle hook: called right after the component is mounted to the DOM
  componentDidMount() {
    this.loadPosts();
  }

  // Lifecycle hook: catches errors thrown anywhere in this component's tree during rendering
  componentDidCatch(error, info) {
    this.setState({ hasError: true, errorMessage: error.toString() });
    alert('Something went wrong while rendering Posts: ' + error.toString());
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong while loading the posts.</h2>;
    }

    return (
      <div className="posts-container">
        <h1>Blog Posts</h1>
        {this.state.posts.length === 0 && <p>Loading posts...</p>}
        {this.state.posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
