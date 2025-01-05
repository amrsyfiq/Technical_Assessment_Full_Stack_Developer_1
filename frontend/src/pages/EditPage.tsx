import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ItemForm from '../components/ItemForm';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Ensure id is defined
  if (!id) {
    return <div>Invalid item id</div>;
  }

  const item = useSelector((state: RootState) =>
    state.items.items.find((i) => i.id === parseInt(id))
  );

  if (!item) return <div>Item not found</div>;

  return <ItemForm initialData={item} onComplete={() => navigate('/')} />;
};

export default EditPage;
