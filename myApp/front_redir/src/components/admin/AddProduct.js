import { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddProduct() {
  let { name } = useParams();
  const navigate = useNavigate();
  const [nameProduct, setNameProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState();
  const [imgProduct, setImgProduct] = useState(null);
  const [itemCountry, setItemCountry] = useState(null)
  const [itemType, setItemType] = useState(null)
  const [itemTaste, setItemTaste] = useState(null)
  const [itemFortress, setItemFortress] = useState(null)
  const [itemCarbonation, setItemCarbonation] = useState(null)
  const [itemBottleType, setItemBottleType] = useState(null)
  const [itemVolume, setItemVolume] = useState(null)
  const [itemBrand, setItemBrand] = useState(null)

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', imgProduct);
      formData.append('img', imgProduct.name);
      formData.append('name', nameProduct);
      formData.append('price', priceProduct);
      formData.append('category', name);
      formData.append('country', itemCountry);
      formData.append('itemType', itemType);
      formData.append('taste', itemTaste);
      formData.append('fortress', itemFortress);
      formData.append('carbonation', itemCarbonation);
      formData.append('bottleType', itemBottleType);
      formData.append('volume', itemVolume);
      formData.append('brand', itemBrand);

      const add = await axios.post(`http://alco24backsvc:5003/api/admin/upload/${name}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setNameProduct('');
      setPriceProduct('');
      setImgProduct(null);
      setItemCountry('');
      setItemType('')
      setItemTaste('')
      setItemFortress('')
      setItemCarbonation('')
      setItemBottleType('')
      setItemVolume('')
      setItemBrand('')
      toast.success('Товар добавлен!');

    } catch (error) {
      console.log(error);
      toast.warning('Что-то пошло не так, попробуйте через 5 минут');
    }
  };

  function logOut() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="add_product">
      <Button variant="primary" onClick={() => navigate(`/nimda/category/${name}`)}>НАЗАД</Button>{' '}
      <h2>Добавить продукт</h2>
      <Button variant="primary" onClick={logOut}>
        ВЫХОД
      </Button>
      <div className="add_product_form">
        <div className="div_fom">
          <Form onSubmit={(e) => addProduct(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Цена</Form.Label>
              <Form.Control type="text" value={priceProduct} onChange={(e) => setPriceProduct(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Страна</Form.Label>
              <Form.Control type="text" value={itemCountry} onChange={(e) => setItemCountry(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Тип</Form.Label>
              <Form.Control type="text" value={itemType} onChange={(e) => setItemType(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Тип бутылки</Form.Label>
              <Form.Control type="text" value={itemBottleType} onChange={(e) => setItemBottleType(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Крепость</Form.Label>
              <Form.Control type="text" value={itemFortress} onChange={(e) => setItemFortress(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Объем</Form.Label>
              <Form.Control type="text" value={itemVolume} onChange={(e) => setItemVolume(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Бренд</Form.Label>
              <Form.Control type="text" value={itemBrand} onChange={(e) => setItemBrand(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Вкус</Form.Label>
              <Form.Control type="text" value={itemTaste} onChange={(e) => setItemTaste(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Газация</Form.Label>
              <Form.Control type="text" value={itemCarbonation} onChange={(e) => setItemCarbonation(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Загрузите изображение</Form.Label>
              <Form.Control type="file" size="lg" onChange={(e) => setImgProduct(e.target.files[0])} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Добавить
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
