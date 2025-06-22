import React from 'react';
import './GroupAdmin.css';
import photo25 from '../../assets/photo25.png';

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
    <div className="group-admin">
      {avatarUrl ? (
        <img 
          src={photo25} 
          alt={`${name}'s avatar`} 
          className="admin-avatar"
        />
      ) : (
        <div 
          className="admin-initials"
          style={{ backgroundColor }}
        >
          {initials}
        </div>
      )}
      <span className="admin-name">{name}</span>
    </div>
  );
};

export default GroupAdmin;
