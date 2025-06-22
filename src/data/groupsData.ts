export interface GroupData {
  id: string;
  name: string;
  adminName: string;
  adminAvatarUrl?: string;
  dateCreated: string;
  totalMembers: number;
  groupType: 'Public' | 'Private';
}

export const groupsData: GroupData[] = [
  {
    id: '1',
    name: 'Photography Enthusiasts',
    adminName: 'Sarah Parker',
    adminAvatarUrl: 'https://source.unsplash.com/random/40x40?portrait=1',
    dateCreated: '2025-05-15',
    totalMembers: 1250,
    groupType: 'Public'
  },
  {
    id: '2',
    name: 'Digital Marketing Pro',
    adminName: 'John Mitchell',
    dateCreated: '2025-05-20',
    totalMembers: 850,
    groupType: 'Private'
  },
  {
    id: '3',
    name: 'Tech Innovation Hub',
    adminName: 'Mike Chen',
    adminAvatarUrl: 'https://source.unsplash.com/random/40x40?portrait=2',
    dateCreated: '2025-06-01',
    totalMembers: 2100,
    groupType: 'Public'
  },
  {
    id: '4',
    name: 'Creative Writers Club',
    adminName: 'Emma Watson',
    dateCreated: '2025-06-10',
    totalMembers: 640,
    groupType: 'Private'
  },
  {
    id: '5',
    name: 'Fitness & Wellness',
    adminName: 'David Kim',
    adminAvatarUrl: 'https://source.unsplash.com/random/40x40?portrait=3',
    dateCreated: '2025-06-15',
    totalMembers: 1580,
    groupType: 'Public'
  }
];
