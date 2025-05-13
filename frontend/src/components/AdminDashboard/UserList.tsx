import React from 'react';
import { Person, Role } from '../../types';

interface UserListProps {
  users: Person[];
  onSetRole: (id: number, role: Role) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSetRole, onDelete }) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.personID}>
          <strong>{user.name}</strong> ({user.role}) - {user.email}
          <select
            value={user.role}
            onChange={(e) => onSetRole(user.personID, e.target.value as Role)}
          >
            <option value="Student">Student</option>
            <option value="Advisor">Advisor</option>
            <option value="Admin">Admin</option>
          </select>
          <button onClick={() => onDelete(user.personID)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
