import './App.css';
import CohortDetails from './CohortDetails';

function App() {
  const cohorts = [
    {
      cohortName: 'React Fundamentals',
      status: 'Ongoing',
      mentor: 'Priya Sharma',
      startDate: '01-Jun-2026',
      endDate: '30-Jul-2026'
    },
    {
      cohortName: 'Java Full Stack',
      status: 'Completed',
      mentor: 'Arun Kumar',
      startDate: '01-Jan-2026',
      endDate: '31-Mar-2026'
    },
    {
      cohortName: 'Cloud DevOps',
      status: 'Ongoing',
      mentor: 'Neha Reddy',
      startDate: '15-Jun-2026',
      endDate: '15-Sep-2026'
    },
    {
      cohortName: 'Data Analytics',
      status: 'Completed',
      mentor: 'Sanjay Mehta',
      startDate: '01-Oct-2025',
      endDate: '31-Dec-2025'
    }
  ];

  return (
    <div className="App">
      <h1>My Academy Cohort Dashboard</h1>
      {cohorts.map((cohort, index) => (
        <CohortDetails
          key={index}
          cohortName={cohort.cohortName}
          status={cohort.status}
          mentor={cohort.mentor}
          startDate={cohort.startDate}
          endDate={cohort.endDate}
        />
      ))}
    </div>
  );
}

export default App;
