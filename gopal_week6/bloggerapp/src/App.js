import { useState } from 'react';
import './App.css';
import BookDetails from './BookDetails';
import BlogDetails from './BlogDetails';
import CourseDetails from './CourseDetails';

// A component that demonstrates "preventing a component from rendering"
// by returning null when there's nothing to show.
function SelectionNotice({ selected }) {
  if (!selected) {
    return null;
  }
  return <p className="selection-notice">You selected: <strong>{selected}</strong></p>;
}

// Object/map lookup technique: maps a key directly to the component to render
const componentMap = {
  book: <BookDetails />,
  blog: <BlogDetails />,
  course: <CourseDetails />
};

function App() {
  const [selected, setSelected] = useState(null);

  // ---------- Technique 1: if / else with an element variable ----------
  let ifElseContent;
  if (selected === 'book') {
    ifElseContent = <BookDetails />;
  } else if (selected === 'blog') {
    ifElseContent = <BlogDetails />;
  } else if (selected === 'course') {
    ifElseContent = <CourseDetails />;
  } else {
    ifElseContent = <p>Please select Book, Blog, or Course above.</p>;
  }

  // ---------- Technique 2: switch statement inside a function ----------
  function renderWithSwitch() {
    switch (selected) {
      case 'book':
        return <BookDetails />;
      case 'blog':
        return <BlogDetails />;
      case 'course':
        return <CourseDetails />;
      default:
        return <p>No category selected yet.</p>;
    }
  }

  // ---------- Technique 5: IIFE (Immediately Invoked Function Expression) ----------
  const iifeLabel = (() => {
    if (selected === 'book') return 'You are viewing Book Details';
    if (selected === 'blog') return 'You are viewing Blog Details';
    if (selected === 'course') return 'You are viewing Course Details';
    return 'Nothing selected yet';
  })();

  return (
    <div className="App">
      <h1>Blogger App</h1>

      <div className="button-group">
        <button onClick={() => setSelected('book')}>Book Details</button>
        <button onClick={() => setSelected('blog')}>Blog Details</button>
        <button onClick={() => setSelected('course')}>Course Details</button>
      </div>

      {/* Technique 3: Logical && operator - only renders when "selected" is truthy */}
      {selected && <p className="and-operator-demo">Category chosen using &amp;&amp; operator: {selected}</p>}

      {/* Technique 4: Ternary operator */}
      <p className="ternary-demo">
        {selected ? `Ternary says: a category IS selected (${selected})` : 'Ternary says: no category selected'}
      </p>

      {/* Component that returns null to prevent rendering */}
      <SelectionNotice selected={selected} />

      <hr />

      <h3>1. if / else (element variable)</h3>
      <div className="technique-output">{ifElseContent}</div>

      <h3>2. switch statement</h3>
      <div className="technique-output">{renderWithSwitch()}</div>

      <h3>3. Object / map lookup</h3>
      <div className="technique-output">
        {selected ? componentMap[selected] : <p>Select a category to see this technique in action.</p>}
      </div>

      <h3>4. IIFE (Immediately Invoked Function Expression)</h3>
      <p className="technique-output">{iifeLabel}</p>
    </div>
  );
}

export default App;
