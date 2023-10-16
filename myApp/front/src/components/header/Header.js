import Container from 'react-bootstrap/Container';
import './Header.css'
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';
import CustomModal from '../modal/CustomModal';


export const handleRedirectToAlcohol = async (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
    return
  }

  let basket
  if (JSON.parse(localStorage.getItem('basket'))) {
    basket = localStorage.getItem('basket');
  }

  const userIp = await axios.get('https://api.ipify.org?format=json');

  const dataBasket = await axios.post('http://alco24backsvc:5003/api/basket/add', {
    card: basket ?? null,
    ip: userIp?.data?.ip ?? null
  })

  if (!dataBasket) {
    return
  }
  const cardId = dataBasket.data.id;

  window.location.replace(`http://alco24frontredirsvc:3001/${cardId}`)

}

function Header({ basketCount, scrollToAccordion, setBasketCount }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  window.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });



  const handleClickNavItem = (i, ref) => {
    scrollToAccordion(i)
    ref2.current.removeAttribute('class')
    ref3.current.removeAttribute('class')
    ref4.current.removeAttribute('class')
    ref.current.classList.add('activ_span')
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        className='opaque'
        bg=''
        variant='blue'
      >
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/')
              scrollToTop()
            }}
          ><img src='./logo.png' alt='logo' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto nav_name">
              <Nav.Link href='#' onClick={handleRedirectToAlcohol} onContextMenu={e => e.preventDefault()}><span>Крепкие напитки</span></Nav.Link>
              <Nav.Link href='#' onClick={() => handleClickNavItem(1, ref2)} onContextMenu={e => e.preventDefault()}><span ref={ref2}>Напитки</span></Nav.Link>
              <Nav.Link href='#' onClick={() => handleClickNavItem(2, ref3)} onContextMenu={e => e.preventDefault()}><span ref={ref3}>Снеки</span></Nav.Link>
              <Nav.Link href='#' onClick={() => handleClickNavItem(3, ref4)} onContextMenu={e => e.preventDefault()}><span ref={ref4}>Другое</span></Nav.Link>
              <Nav.Link className='a_basket_icon_header' href='/basket' ><Icon.Cart2 className='basket_icon_header' /> <span className='cart_count'>{basketCount}</span></Nav.Link>
            </Nav>

            <Nav>
              <div className='header_number'>
                <button className='button_header' onClick={handleShow}>
                  Обратный звонок
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Header;
