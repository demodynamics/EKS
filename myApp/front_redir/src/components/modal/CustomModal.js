import { useState } from 'react';
import { Form, Modal } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import './Modal.css'



function CustomModal({ show, handleClose }) {

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [spanError, setSpanError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const reg = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?/
  async function sendTelegram() {
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
        handleClose()

      } catch (e) {
        toast.warning('проблемы со связи, попробуйте снова')
      }
    } else {
      toast.warning("заполните форму полностью")
      return
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className='modal_title_div'>
        <Modal.Title>БЫСТРАЯ ДОСТАВКА</Modal.Title>
      </div>
      <Modal.Body>
        <Form>
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
        </Form>
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

      </Modal.Body>

      <div className='modal_button_div'>

        <button disabled={!isChecked} className='button_modal' onClick={sendTelegram}>
          Заказать
        </button>
      </div>

    </Modal>
  )



}

export default CustomModal;