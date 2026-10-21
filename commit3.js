import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useFetch } from './useFetch';

const MOCK_API_URL = 'https://600000000000000000000000.mockapi.io/students';

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: fetchedStudents, loading, error } = useFetch(MOCK_API_URL);
  
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGpa, setNewGpa] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (fetchedStudents) setStudents(fetchedStudents);
  }, [fetchedStudents]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleAdd = () => {
    const gpa = parseFloat(newGpa);
    if (gpa < 0 || gpa > 4 || isNaN(gpa)) {
      alert('GPA phải nằm trong khoảng từ 0 đến 4');
      return;
    }
    const newStudent = { id: Date.now(), name: newName, gpa };
    setStudents([...students, newStudent]);
    setNewName('');
    setNewGpa('');
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appStyle = {
    background: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <div style={appStyle}>
      <h1>Quản lý sinh viên</h1>
      <button onClick={toggleTheme}>Đổi Theme ({theme})</button>

      <div>
        <input 
          placeholder="Tìm kiếm theo tên..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      <div>
        <input placeholder="Tên SV" value={newName} onChange={e => setNewName(e.target.value)} />
        <input placeholder="GPA (0-4)" type="number" value={newGpa} onChange={e => setNewGpa(e.target.value)} />
        <button onClick={handleAdd}>Thêm sinh viên</button>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p>Lỗi: {error}</p>}
      
      <ul>
        {filteredStudents.map(s => (
          <li key={s.id}>
            {s.name} - GPA: {s.gpa} 
            <button onClick={() => handleDelete(s.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
