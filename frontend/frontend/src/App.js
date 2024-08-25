import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route path="/" element={<PostList />} />
        </Route>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path="/posts/:id" element={<PostDetail />} />
        </Route>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path="/create-post" element={<PostForm />} />
        </Route>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path="/create-post/:id" element={<PostForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;