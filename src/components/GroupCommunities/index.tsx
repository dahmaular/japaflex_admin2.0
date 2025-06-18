import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import styles from './GroupCommunities.module.css';

interface GroupData {
  id: string;
  name: string;
  adminName: string;
  adminAvatarUrl?: string;
  dateCreated: string;
  totalMembers: number;
  groupType: 'Public' | 'Private';
}

interface GroupAdminProps {
  name: string;
  avatarUrl?: string;
}

const GroupAdmin: React.FC<GroupAdminProps> = ({ name, avatarUrl }) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  const getBackgroundColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 85%)`;
  };

  return (
    <div className={styles.adminContainer}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.adminAvatar} />
      ) : (
        <div 
          className={styles.adminInitials}
          style={{ backgroundColor: getBackgroundColor(name) }}
          title={name}
        >
          {initials}
        </div>
      )}
      <span className={styles.adminName}>{name}</span>
    </div>
  );
};

interface GroupCommunitiesProps {
  data: GroupData[];
}

const GroupCommunities: React.FC<GroupCommunitiesProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'groups' | 'communities'>('groups');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map(group => group.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (selectedRows.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'groups' ? styles.active : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'communities' ? styles.active : ''}`}
          onClick={() => setActiveTab('communities')}
        >
          Communities
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.size === data.length}
                  className={styles.checkbox}
                  aria-label="Select all rows"
                />
              </th>
              <th>Group Name</th>
              <th>Group Admin</th>
              <th>Date Created</th>
              <th>Total Members</th>
              <th>Group Type</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group.id}>
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(group.id)}
                    onChange={() => handleSelectRow(group.id)}
                    className={styles.checkbox}
                    aria-label={`Select ${group.name}`}
                  />
                </td>
                <td className={styles.nameCell}>{group.name}</td>
                <td>
                  <GroupAdmin
                    name={group.adminName}
                    avatarUrl={group.adminAvatarUrl}
                  />
                </td>
                <td>{formatDate(group.dateCreated)}</td>
                <td>{group.totalMembers.toLocaleString()}</td>
                <td>
                  <span className={`${styles.groupType} ${styles[group.groupType.toLowerCase()]}`}>
                    {group.groupType}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                  <button
                    className={styles.actionButton}
                    aria-label="More options"
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupCommunities;
