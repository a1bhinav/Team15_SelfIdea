import React, { useEffect, useState } from 'react';
import CreatePersonForm from './CreatePersonForm';
import UserList from './UserList';
import { Person, Role } from '../../types';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Person[]>([]);
  const [advisors, setAdvisors] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const [studentRes, advisorRes] = await Promise.all([
        fetch('/api/admin/students'),
        fetch('/api/admin/advisors'),
      ]);

      if (!studentRes.ok || !advisorRes.ok) throw new Error('Failed to fetch users');

      const studentData = await studentRes.json();
      const advisorData = await advisorRes.json();

      setStudents(studentData);
      setAdvisors(advisorData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const setRole = async (id: number, role: Role) => {
    try {
      const res = await fetch(`/api/admin/set-role/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error('Failed to set role');
      await fetchAllUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error setting role';
      setError(message);
    }
  };

  const createPerson = async (name: string, email: string, role: Role) => {
    try {
      const res = await fetch('/api/admin/create-person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });
      if (!res.ok) throw new Error('Failed to create person');
      await fetchAllUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error creating person';
      setError(message);
    }
  };

  const deletePerson = async (personID: number) => {
    try {
      const res = await fetch(`/api/admin/delete-person/${personID}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete person');
      await fetchAllUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error deleting person';
      setError(message);
    }
  };

  return (
    <div className={styles['admin-dashboard']}>
      <h1>Admin Dashboard</h1>
      {loading && <p>{loading && <p className={styles['loading']}>Loading users...</p>}</p>}
      {error && <p className={styles['error']}>{error}</p>}
  
      {!loading && (
        <>
          <section>
            <h2>Create New Person</h2>
            <CreatePersonForm onCreate={createPerson} />
          </section>
  
          <section>
            <h2>Students</h2>
            <UserList users={students} onSetRole={setRole} onDelete={deletePerson} />
          </section>
  
          <section>
            <h2>Advisors</h2>
            <UserList users={advisors} onSetRole={setRole} onDelete={deletePerson} />
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
