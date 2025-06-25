import React from 'react';
import GroupCommunities from '../../../components/GroupCommunities';
import { groupsData } from '../../../data/groupsData';
import styles from './styles.module.css';

const GroupCommunitiesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Group & Communities</h1>
      <GroupCommunities data={groupsData} />
    </div>
  );
};

export default GroupCommunitiesPage;
