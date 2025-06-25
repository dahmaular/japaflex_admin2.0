import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import GroupAdmin from './GroupAdmin';
import { GroupData } from '../../data/groupsData';
import './GroupCommunitiesTable.css';

interface GroupCommunitiesTableProps {
  data: GroupData[];
}

const GroupCommunitiesTable: React.FC<GroupCommunitiesTableProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map(group => group.id)));
      setSelectAll(true);
    } else {
      setSelectedRows(new Set());
      setSelectAll(false);
    }
  };

  const handleSelectRow = (groupId: string) => {
    const newSelected = new Set(selectedRows);
    if (selectedRows.has(groupId)) {
      newSelected.delete(groupId);
      setSelectAll(false);
    } else {
      newSelected.add(groupId);
      if (newSelected.size === data.length) {
        setSelectAll(true);
      }
    }
    setSelectedRows(newSelected);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatMembers = (count: number): string => {
    return count.toLocaleString();
  };

  return (
    <div className="table-container">
      <div className="table-tabs">
        <button className="tab active">Groups</button>
        <button className="tab">Communities</button>
      </div>
      
      <div className="table-wrapper">
        <table className="groups-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  aria-label="Select all groups"
                />
              </th>
              <th>Group Name</th>
              <th>Group Admin</th>
              <th>Date Created</th>
              <th>Total Members</th>
              <th>Group Type</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {data.map(group => (
              <tr key={group.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(group.id)}
                    onChange={() => handleSelectRow(group.id)}
                    aria-label={`Select ${group.name}`}
                  />
                </td>
                <td>{group.name}</td>
                <td>
                  <GroupAdmin
                    name={group.adminName}
                    avatarUrl={group.adminAvatarUrl}
                  />
                </td>
                <td>{formatDate(group.dateCreated)}</td>
                <td>{formatMembers(group.totalMembers)}</td>
                <td>
                  <span className={`group-type ${group.groupType.toLowerCase()}`}>
                    {group.groupType}
                  </span>
                </td>
                <td>
                  <button className="action-button" aria-label="More options">
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

export default GroupCommunitiesTable;
