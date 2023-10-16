import * as Icon from 'react-bootstrap-icons'
import React, { useEffect, useState } from 'react';
import './Main.css'
import Marquee from 'react-fast-marquee';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BasicExample from '../accordion/Accordion';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Main({ setBasketCount, activeKey, setActiveKey }) {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [spanError, setSpanError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const reg = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?/
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };
    const { id } = useParams()
    const navigate = useNavigate()
    async function sendTelegram(e) {
        e.preventDefault()
        const TOKEN = "6104094925:AAEAcMEOPXFtUvUmgGejDzfl8HBNjLzH8X0"
        const CHAT_ID = "-1001633078067"
        const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        if (name && reg.test(phone)) {
            try {
                await axios.post(URI_API, {
                    chat_id: CHAT_ID,
                    parse_mode: 'html',
                    text: `Сайт - дорогой, заказ: --быстрый заказ--, Имя - ${name}, Телефон - ${phone} `
                })

                toast.success("Наш менеджер свяжется с Вами")

                setName("")
                setPhone("")

            } catch (e) {
                toast.warning('проблемы со связи, попробуйте снова')
            }
        } else {
            toast.warning("заполните форму полностью")
            return
        }
    }

    async function getCardItems() {
        if (id) {
            const card = await axios.get(`http://alco24backsvc:5003/api/basket/get/${id}`)

            if (card.status === 200) {
                if (card.data.card && card.data.card.length > 0) {
                    localStorage.setItem('cardId', JSON.stringify(id))
                    localStorage.setItem('basket', JSON.stringify(card.data.card))
                    setBasketCount(card.data.card.length)
                }
            }
        }
        navigate('/')
    }

    useEffect(() => {
        getCardItems()
    }, [])

    return (
        <>
            <div className="div_main">
                <div className="div_main_foto">
                    <img src='./img-main/fon.jpg' alt="" />
                    <Icon.Telegram className="telegram_icon" onClick={() => window.open("https://t.me/alcodostavkamolnia_bot", '_blank')} />
                    <div className="divText">
                        <p>ДОСТАВКА ПРОДУКТОВ ПО МОСКВЕ И МОСКОВСКОЙ ОБЛАСТИ</p>
                        <p>Круглосуточно</p>
                        <a className='tel_number_main' href="tel:+74950155560">+7(495)01-555-60</a>
                    </div>
                    <div className='modal_main'>

                        <Form className='form'>
                            <p>БЫСТРАЯ ДОСТАВКА</p>
                            <Form.Floating className='mb-3'>
                                <Form.Control
                                    id="floatingInputCustom"
                                    placeholder='name'
                                    type="text"
                                    required
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="floatingInputCustom">*Ваше Имя</label>
                            </Form.Floating>
                            <Form.Floating >
                                <Form.Control
                                    type="text"
                                    inputMode="numeric"
                                    minLength="12"
                                    maxLength="12"
                                    placeholder="+7 ( _ _ _ ) _ _ _ - _ _ - _ _"
                                    name='Nomer telefona'
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                        if (!reg.test(e.target.value)) {
                                            setSpanError('*заполните номер телефона правильно')
                                        } else {
                                            setSpanError('')
                                        }
                                    }}
                                    required
                                />

                                <label htmlFor="floatingInputCustom" required>*Номер телефона</label>
                            </Form.Floating>
                            <span style={{ color: 'red' }}>{spanError}</span>
                            <label className='checkbox_container'>
                                <input
                                    className='checkbox'
                                    type="checkbox"
                                    id="topping"
                                    name="topping"
                                    value="Paneer"
                                    checked={isChecked}
                                    onChange={handleOnChange}
                                />
                                <span className='span_checkbox'></span>
                                <p>Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных *</p>
                            </label>
                            <div className='modal_button_div'>

                                <button disabled={!isChecked} className='button_modal' onClick={sendTelegram}>
                                    Заказать
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <Marquee speed={40}>
                    <div className='div_logo_brand'>
                        <img src='./img-main/absolut.png' alt='absolute' />
                        <img src='./img-main/ballantines-finest.png' alt='ballantines' />
                        <img src='./img-main/jack.png' alt='jack' />
                        <img src='./img-main/jameson.png' alt='jameson' />
                        <img src='./img-main/Jim-Beam.png' alt='jim-beam' />
                        <img src='./img-main/Chivas.png' alt='chivas' />
                        <img src='./img-main/Johnnie_Walker.png' alt='walker' />
                        <img src='./img-main/jameson.png' alt='jameson' />
                        <img src='./img-main/Jim-Beam.png' alt='jim-beam' />
                        <img src='./img-main/Chivas.png' alt='chivas' />
                        <img src='./img-main/Johnnie_Walker.png' alt='walker' />
                    </div>
                </Marquee>
                <Marquee direction='right' speed={40}>
                    <div className='div_logo_brand2'>
                        <img src='./img-main/cheetos.png' alt='cheetos' />
                        <img src='./img-main/Hrusteam.png' alt='hrusteam' />
                        <img src='./img-main/korochki.png' alt='korochki' />
                        <img src='./img-main/lays.png' alt='lays' />
                        <img src='./img-main/Oker.png' alt='oker' />
                        <img src='./img-main/shturval.png' alt='shturval' />
                        <img src='./img-main/beerka.png' alt='beerka' />
                        <img src='./img-main/martin.png' alt='martin' />
                        <img src='./img-main/lays.png' alt='lays' />
                        <img src='./img-main/Oker.png' alt='oker' />
                        <img src='./img-main/shturval.png' alt='shturval' />
                        <img src='./img-main/beerka.png' alt='beerka' />
                        <img src='./img-main/martin.png' alt='martin' />
                        <img src='./img-main/shturval.png' alt='shturval' />
                    </div>
                </Marquee>

                <h1 className='catalog_h1'>Каталог</h1>
                <BasicExample setBasketCount={setBasketCount} activeKey={activeKey} setActiveKey={setActiveKey} />

            </div>
        </>
    )
}

export default Main;