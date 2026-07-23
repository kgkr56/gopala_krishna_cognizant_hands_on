import React from 'react';
import styles from './CohortDetails.module.css';

class CohortDetails extends React.Component {
  render() {
    const { cohortName, status, startDate, endDate, mentor } = this.props;

    // Inline style: green for "ongoing" cohorts, blue for everything else
    const headingStyle = {
      color: status.toLowerCase() === 'ongoing' ? 'green' : 'blue'
    };

    return (
      <div className={styles.box}>
        <h3 style={headingStyle}>{cohortName}</h3>
        <dl>
          <dt>Status</dt>
          <dd>{status}</dd>

          <dt>Mentor</dt>
          <dd>{mentor}</dd>

          <dt>Start Date</dt>
          <dd>{startDate}</dd>

          <dt>End Date</dt>
          <dd>{endDate}</dd>
        </dl>
      </div>
    );
  }
}

export default CohortDetails;
