function CourseDetails() {
  const courses = [
    { id: 1, title: 'React Fundamentals', duration: '6 weeks' },
    { id: 2, title: 'Full Stack JavaScript', duration: '12 weeks' },
    { id: 3, title: 'Cloud DevOps Essentials', duration: '8 weeks' },
    { id: 4, title: 'Data Structures & Algorithms', duration: '10 weeks' }
  ];

  return (
    <div className="details-card">
      <h2>Course Details</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> — {course.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
