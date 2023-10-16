
import './accordion.css'
import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Pages from '../main/pages/Pages';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { handleRedirectToAlcohol } from '../header/Header';
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function BasicExample({ setBasketCount, activeKey, setActiveKey }) {

  const [expandedPanels, setExpandedPanels] = useState([]);
  const ref = useRef(null);


  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpandedPanels((prevExpanded) =>
      isExpanded ? [...prevExpanded, panel] : prevExpanded.filter((item) => item !== panel)
    );
  };

  const handleChange = (index) => {
    setActiveKey(index === activeKey ? null : index);
  };

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeKey]);
  const catalog = [
    {
      ru: "Крепкие напитки",
    },
    {
      ru: "Напитки",

    },
    {
      ru: "Снеки",
      en: "snacks"
    },
    {
      ru: "Разное",
      en: "other"
    }
  ];
  const catalog3 = [

    {
      ru: "Соки",
      en: "juice"
    },
    {
      ru: "Вода",
      en: "water"
    }
  ]
  return (
    <div className='div_accordion' ref={ref}>
      {catalog.map((item, index) => (
        <Accordion
          className='accordion'
          key={index}
          expanded={activeKey == index ? true : false}
          onChange={() => handleChange(index)}
        >
          <AccordionSummary className='accordion_summary'
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            onClick={index === 0 ? handleRedirectToAlcohol : null}
          >
            <Typography className='accordion_header'>{item.ru}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {index === 0 ? (
              ''
            ) : index === 1 ? (
              catalog3.map((item3, index3) => (
                <Accordion
                  key={index3}
                  expanded={expandedPanels.includes(`panel${index3 + 1}`)}
                  onChange={handleChange2(`panel${index3 + 1}`)}
                  className='accordion'
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index3 + 1}bh-content`}
                    id={`panel${index3 + 1}bh-header`}
                    className='accordion_summary'
                  >
                    <Typography>{item3.ru}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {expandedPanels.includes(`panel${index3 + 1}`)&&<Pages setBasketCount={setBasketCount} name={item3.en} />}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              activeKey == index && <Pages setBasketCount={setBasketCount} name={item.en} />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
