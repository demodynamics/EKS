
import './Pages.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import { toast } from 'react-toastify';
import CustomModal from '../../modal/CustomModal';

function Pages({ setBasketCount, name }) {
    const basketArr = []

    const [alko, setAlko] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getCategory() {
        try {
            const category = await axios.get(`http://alco24backsvc:5003/api/list/get-category/${name}`)
            setAlko(category.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    function addToBasket(e, item) {
        e.preventDefault()

        let filtered = []
        if (localStorage.getItem('basket')) {
            filtered = JSON.parse(localStorage.getItem('basket')).filter(item2 => item2.id === item.id)
        }

        if (filtered.length > 0) {
            toast.info("Этот товар есть в корзине")
            return
        }

        basketArr.push(
            {
                ...item,
                quantity: 1
            }
        )

        if (JSON.parse(localStorage.getItem('basket'))) {
            const basket = JSON.parse(localStorage.getItem('basket'))
            basket.push(
                {
                    ...item,
                    quantity: 1
                }
            )
            localStorage.setItem('basket', JSON.stringify(basket))
        } else {
            localStorage.setItem('basket', JSON.stringify(basketArr))
        }
        setBasketCount(JSON.parse(localStorage.getItem('basket')).length)
        toast.success("Товар добавлен в корзину")
    }

    return (
        <>
            <div className='pages_container'>
                {
                    alko ? alko.map((item, index) => {
                        return (
                            <div className='pages_card' key={index}>
                                {item.oldPrice ? <p className='akcia-text'><img className='akcia_img' src='/image/akcia.png' alt='akcia' /></p> : null}
                                <p className='card_title'>{item.name}</p>

                                <div className='card_body akcia-card-body'>
                                    <div className='div_body_card'>
                                        <div>
                                            <img variant="top" className='item_img' alt={item.name} src={`http://alco24backsvc:5003/api/imgs/${name}/${item.img}${/\.\w+$/.test(item.img) ? '' : '.jpg'}`} />
                                            <p className='old-price'>{item.oldPrice ? item.oldPrice + " P" : ""}</p>
                                            <p className='price' style={{ color: "#21C737" }}>{item.price + ' P'} </p>

                                        </div>
                                        <ul className='div_li'>
                                            {
                                                item.country && <>
                                                    <li>Страна</li>
                                                    <h4>{item.country}</h4>
                                                </>
                                            }
                                            {
                                                item.fortress && <>
                                                    <li>Крепость</li>
                                                    <h4>{item.fortress}</h4>
                                                </>
                                            }
                                            {/* {
                                                item.itemType && <>
                                                    <li>Тип</li>
                                                    <h4>{item.itemType}</h4>
                                                </>
                                            } */}
                                            {
                                                item.carbonation && <>
                                                    <li>Газация</li>
                                                    <h4>{item.carbonation}</h4>
                                                </>
                                            }
                                            {
                                                item.taste && <>
                                                    <li>Вкус</li>
                                                    <h4>{item.taste}</h4>
                                                </>
                                            }
                                            {
                                                item.bottleType && <>
                                                    <li>Тип бутылки</li>
                                                    <h4>{item.bottleType}</h4>
                                                </>
                                            }
                                            {
                                                item.volume && <>
                                                    <li>Объем</li>
                                                    <h4>{item.volume}</h4>
                                                </>
                                            }
                                            {/* {
                                                item.brand && <>
                                                    <li>Бренд</li>
                                                    <h4>{item.brand}</h4>
                                                </>
                                            } */}
                                        </ul>

                                    </div>
                                    <div className='card-footer'>

                                    </div>
                                    <div className='div_button_card'>
                                        <button className='cart2_icon' onClick={(e) => addToBasket(e, item)}>
                                            В корзину<Icon.Cart2 />
                                        </button>{' '}
                                        <button className='button_bag' onClick={handleShow}>В один клик<Icon.Bag /></button>

                                    </div>


                                </div>
                            </div>
                        )
                    }) : <Spinner animation="border" variant="success" />
                }

            </div>

            <CustomModal show={show} handleClose={handleClose} />
        </>

    )
}

export default Pages;