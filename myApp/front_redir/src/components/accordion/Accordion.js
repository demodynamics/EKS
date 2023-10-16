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
import { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const scrollToAccordion = () => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
    scrollToAccordion()
  };
  
  const handleChange3 = (panel) => (event, isExpanded) => {
    setExpanded3(isExpanded ? panel : false);
    scrollToAccordion()
  };
  const handleChange4 = (panel) => (event, isExpanded) => {
    setExpanded4(isExpanded ? panel : false);
    scrollToAccordion()
  };
  
  const handleChange = (index, activeKey) => {
    if (index == activeKey) {
      setActiveKey(null)
    } else {
      setActiveKey(index)
    }
    scrollToAccordion()

  };

  const ref = useRef(null)

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeKey])
  

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
      
    }

  ];
  const catalog2 = [
    {
      ru: "Водка",
      en: "vodka"
    },
    {
      ru: "Пиво",
      en: "beer"
    },
    {
      ru: "Виски",
      en: "whiskey"
    },
    {
      ru: "Коньяк",
      en: "cognac"
    },
    {
      ru: "Ликер",
      en: "liquor"
    },
    {
      ru: "Текила",
      en: "tequilla"
    },
    {
      ru: "Джин",
      en: "jin"
    },
    {
      ru: "Ром",
      en: "rom"
    },
    {
      ru: "Вино",
      en: "wine"
    },
    {
      ru: "Игристое Вино",
      en: "champagne"
    },
    {
      ru: "Вермут",
      en: "vermouth"
    },
  ]
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
  const catalog4 = [
    {
      ru: "Сигареты",
      en: "ciggarettes"
    },
    {
      ru: "Табак и Кальян",
      en: "tobacandcalian"
    },
    {
      ru: "Стики",
      en: "sticks"
    },
    {
      ru: "Эл. Сигареты",
      en: "el-sig"
    },
    {
      ru: "Разное",
      en: "other"
    }
  ]

  return (
    <div className='div_accordion' ref={ref}>
      {catalog.map((item, index) => (
        <Accordion
          className='accordion'
          key={index}
          expanded={activeKey == index ? true : false}
          onChange={() => handleChange(index, activeKey)}
        >
          <AccordionSummary className='accordion_summary' aria-controls={`panel${index}-content`} id={`panel${index}-header`}>

            <Typography className='accordion_header'>{item.ru}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {
              index == 0 ?

                catalog2.map((item2, index2) => (
                  <Accordion key={index2} expanded={expanded2 === `panel${index2 + 1}`} onChange={handleChange2(`panel${index2 + 1}`)} className='accordion'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index2 + 1}bh-content`}
                      id={`panel${index2 + 1}bh-header`}
                      className='accordion_summary'
                    >
                      <Typography>{item2.ru}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {expanded2 === `panel${index2 + 1}`&&<Pages setBasketCount={setBasketCount} name={item2.en} />}
                    </AccordionDetails>
                  </Accordion>

                ))

                : index == 1 ?
                  catalog3.map((item3, index3) => (
                    <Accordion key={index3} expanded={expanded3 === `panel${index3 + 1}`} onChange={handleChange3(`panel${index3 + 1}`)} className='accordion'>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index3 + 1}bh-content`}
                        id={`panel${index3 + 1}bh-header`}
                        className='accordion_summary'
                      >
                        <Typography>{item3.ru}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      {expanded3 === `panel${index3 + 1}`&&<Pages setBasketCount={setBasketCount} name={item3.en} />}
                      </AccordionDetails>
                    </Accordion>

                  )) : index == 3 ?
                  catalog4.map((item4, index4) => (
                    <Accordion key={index4} expanded={expanded4 === `panel${index4 + 1}`} onChange={handleChange4(`panel${index4 + 1}`)} className='accordion'>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index4 + 1}bh-content`}
                        id={`panel${index4 + 1}bh-header`}
                        className='accordion_summary'
                      >
                        <Typography>{item4.ru}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      {expanded4 === `panel${index4 + 1}`&&<Pages setBasketCount={setBasketCount} name={item4.en} />}
                      </AccordionDetails>
                    </Accordion>

                  )) :

                  activeKey == index &&
                  <Pages setBasketCount={setBasketCount} name={item.en} />
            }

          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}