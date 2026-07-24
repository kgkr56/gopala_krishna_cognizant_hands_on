function BlogDetails() {
  const blogs = [
    { id: 1, title: 'Getting Started with React Hooks', author: 'Priya Sharma' },
    { id: 2, title: '10 Tips for Clean CSS', author: 'Arun Kumar' },
    { id: 3, title: 'Understanding the Virtual DOM', author: 'Neha Reddy' },
    { id: 4, title: 'Why ES6 Changed JavaScript Forever', author: 'Sanjay Mehta' }
  ];

  return (
    <div className="details-card">
      <h2>Blog Details</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> — {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogDetails;
