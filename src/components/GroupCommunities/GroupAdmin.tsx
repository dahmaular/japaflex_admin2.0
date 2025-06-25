import React from 'react';
import styles from './GroupAdmin.module.css';

interface GroupAdminProps {
  name: string;
  avatarUrl?: string;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const generatePastelColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const h = hash % 360;
  return `hsl(${h}, 70%, 85%)`;
};

const GroupAdmin: React.FC<GroupAdminProps> = ({ name, avatarUrl }) => {
  const initials = getInitials(name);
  const backgroundColor = generatePastelColor(name);

  return (
    <div className={styles.adminContainer}>
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt={`${name}'s avatar`} 
          className={styles.adminAvatar}
        />
      ) : (
        <div 
          className={styles.adminInitials}
          style={{ backgroundColor }}
          title={name}
        >
          {initials}
        </div>
      )}
      <span className={styles.adminName}>{name}</span>
    </div>
  );
};

export default GroupAdmin;
