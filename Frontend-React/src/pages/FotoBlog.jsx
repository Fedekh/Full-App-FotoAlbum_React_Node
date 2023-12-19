import { Link, NavLink } from 'react-router-dom';
import { BlogProvider } from '../contexts/BlogContext';
import FotoList from '../components/FotoList'


export default function Fotoblog() {
  return (
    <BlogProvider>

      <FotoList />

    </BlogProvider>
  );
};