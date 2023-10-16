import axios from "axios";
import "./admin.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AdminCatalog() {

    const navigate = useNavigate();
    let { name } = useParams();


    const [category, setCategory] = useState([])
    const [show, setShow] = useState('none');
    const [activeId, setActiveId] = useState();
    const [itemPrice, setItemPrice] = useState()
    const [itemOldPrice, setItemOldPrice] = useState()
    const [itemCountry, setItemCountry] = useState(null)
    const [itemType, setItemType] = useState(null)
    const [itemTaste, setItemTaste] = useState(null)
    const [itemFortress, setItemFortress] = useState(null)
    const [itemCarbonation, setItemCarbonation] = useState(null)
    const [itemBottleType, setItemBottleType] = useState(null)
    const [itemVolume, setItemVolume] = useState(null)
    const [itemBrand, setItemBrand] = useState(null)
    const [itemName, setItemName] = useState(null)




    const handleClose = () => setShow('none');
    const handleShow = (id) => {
        setShow('block')
        setActiveId(id)
    };

    useEffect(() => {
        getCategory()
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    function handleChange(e) {
        setItemPrice(e)
    }

    function handleOldChange(e) {
        setItemOldPrice(e)
    }

    function handleCountryChange(e) {
        setItemCountry(e)
    }

    async function getCategory() {
        try {
            const category = await axios.get(`http://alco24backsvc:5003/api/list/get-category/${name}`)
            setCategory(category.data)
        } catch (e) {
            toast.warning('что-то пошло не так попробуйте через 5 минут')

        }
    }

    async function editItem(item) {
        try {
            await axios.put(`http://alco24backsvc:5003/api/admin/edit/${item.id}`, {
                "name": itemName ?? item.name,
                "price": itemPrice ?? item.price,
                "oldPrice": itemOldPrice ?? item.oldPrice,
                "country": itemCountry ?? item.country,
                "itemType": itemType ?? item.itemType,
                "taste": itemTaste ?? item.taste,
                "fortress": itemFortress ?? item.fortress,
                "carbonation": itemCarbonation ?? item.carbonation,
                "bottleType": itemBottleType ?? item.bottleType,
                "volume": itemVolume ?? item.volume,
                "brand": itemBrand ?? item.brand
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success('Изменена!')
        } catch (e) {
            console.log(e)
            toast.warning('что-то пошло не так попробуйте через 5 минут')
        }
    }

    async function deleteItem() {

        try {
            await axios.delete(`http://alco24backsvc:5003/api/admin/delete/${activeId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            handleClose()
            toast.success('Товар удален!')
            await getCategory()
        } catch (e) {

            toast.warning('что-то пошло не так попробуйте через 5 минут')
        }
    }

    function logOut() {
        localStorage.removeItem('token')
        navigate('/')

    }

    return (
        <div className="admin_catalog">
            <Button variant="primary" onClick={logOut}>ВЫХОД</Button>{' '}
            <Button variant="primary" onClick={() => navigate('/nimda/category')}>НАЗАД</Button>{' '}
            <Button variant="primary" onClick={() => { navigate(`/nimda/category/add/${name}`) }}>Добавить Товар</Button>

            <div className="container_admin">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>Название*</th>
                            <th>Цена*</th>
                            <th>Старая цена</th>
                            <th>Страна*</th>
                            <th>Тип*</th>
                            <th>Тип бутылки</th>
                            <th>Крепость</th>
                            <th>Объем</th>
                            <th>Бренд</th>
                            <th>Вкус</th>
                            <th>Газация</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={`https://alcodostavka24.online/api/imgs/${name}/${item.img}${/\.\w+$/.test(item.img) ? '' : '.jpg'}`} alt="" />
                                </td>
                                <td className="edit-price">
                                    <input type="text" onChange={(e) => setItemName(e.target.value)} defaultValue={item.name} />
                                </td>
                                <td className="edit-price">
                                    <input type="text" onChange={(e) => handleChange(e.target.value)} defaultValue={item.price} />
                                </td>

                                <td className="edit-price">
                                    <input type="text" onChange={(e) => handleOldChange(e.target.value)} defaultValue={item?.oldPrice} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => handleCountryChange(e.target.value)} defaultValue={item?.country} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemType(e.target.value)} defaultValue={item?.itemType} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemBottleType(e.target.value)} defaultValue={item?.bottleType} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemFortress(e.target.value)} defaultValue={item?.fortress} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemVolume(e.target.value)} defaultValue={item?.volume} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemBrand(e.target.value)} defaultValue={item?.brand} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemTaste(e.target.value)} defaultValue={item?.taste} />
                                </td>

                                <td>
                                    <input type="text" onChange={(e) => setItemCarbonation(e.target.value)} defaultValue={item?.carbonation} />
                                </td>

                                <td>
                                    <button className="btn btn-primary" onClick={() => editItem(item)}>Изменить</button>
                                    <button className="btn btn-danger" onClick={() => handleShow(item.id)}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div
                    className="modal show_admin"
                    style={{ display: show, position: 'initial' }}
                >
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title>Удалить</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Вы действительно хотите удалить?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} >НЕТ</Button>
                            <Button variant="primary" onClick={deleteItem}>ДА</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>

            </div>
        </div>
    )

}

export default AdminCatalog;