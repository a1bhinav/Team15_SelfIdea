import React, { useState } from 'react';
import { Role } from '../../types';

interface CreateFormProps {
  onCreate: (name: string, email: string, role: Role) => void;
}

const CreatePersonForm: React.FC<CreateFormProps> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return alert('Please fill in all fields');
    onCreate(name, email, role);
    setName('');
    setEmail('');
    setRole('Student');
  };

  return (
    <form onSubmit={handleSubmit} className="create-person-form">
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
        <option value="Student">Student</option>
        <option value="Advisor">Advisor</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePersonForm;
