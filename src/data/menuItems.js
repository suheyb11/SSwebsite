import {
  FaHome, FaUserCog, FaPhone, FaRegCreditCard, FaPlane, FaSignal,
  FaWifi, FaStore, FaCreditCard, FaMoneyCheck, FaSimCard, FaBuilding,
  FaNetworkWired, FaProjectDiagram, FaHashtag, FaHeadset, FaComments,
  FaCode, FaInfoCircle, FaBriefcase, FaBlog, FaCalendar, FaBullhorn
} from "react-icons/fa";

import { MdRssFeed, MdCable } from "react-icons/md";

const menus = [
  { label: '', route: '/', icon: <FaHome /> },
   { label: '', route: '/', icon: <FaHome /> },
    { label: '', route: '/', icon: <FaHome /> },
     { label: 'Home', route: '/', icon: <FaHome /> },
  {
    label: 'Personal',
    route: '/Prepaid',
    icon: <FaUserCog />,
    col: [
      {
        title: 'Voice',
        submenus: [
          { label: 'Prepaid', route: '/Prepaid', icon: <FaPhone /> },
          { label: 'Postpaid', route: '/Postpaid', icon: <FaRegCreditCard /> },
          { label: 'Roaming', route: '/Roaming', icon: <FaPlane /> },
        ],
      },
      {
        title: 'Data',
        submenus: [
          { label: 'Dhamays Plus', route: '/Dhameys', icon: <FaSignal /> },
          { label: 'Kaafiye Plus', route: '/Kaafiye', icon: <FaSignal /> },
          { label: 'Mifi', route: '/Mifi', icon: <FaWifi /> },
        ],
      },
      {
        title: 'eDahab',
        submenus: [
          { label: 'eDahab', route: '/eDahab', icon: <FaSignal /> },
          { label: 'DahabPlus', route: 'https://www.dahabplus.com/', icon: <FaStore /> },
          { label: 'DahabPay', route: 'https://www.dahabpay.com/Authentication/Login', icon: <FaCreditCard /> },
          { label: 'Keydso', route: '/Keydso', icon: <FaMoneyCheck /> },
        ],
      },
      { title: 'SIMCARD', submenus: [{ label: 'eSIM', route: '/Esim', icon: <FaSimCard /> }] },
    ],
  },
  {
    label: 'Business',
    route: '/fiberoptic',
    icon: <FaBuilding />,
    col: [
      {
        title: 'Broadband',
        submenus: [{ label: 'Fiber Optic', route: '/fiberoptic', icon: <FaNetworkWired /> }],
      },
      {
        title: 'Essential Internet',
        submenus: [
          { label: 'P2P', route: '/fiberoptic', icon: <FaProjectDiagram /> },
          { label: 'W-ADSL', route: '/fiberoptic', icon: <MdCable /> },
        ],
      },
      {
        title: 'Service',
        submenus: [
          { label: 'Short Codes', route: '/fiberoptic', icon: <FaHashtag /> },
          { label: 'IVR', route: '/IVR', icon: <FaHeadset /> },
        ],
      },
      {
        title: 'SMS',
        submenus: [
          { label: 'Mysms', route: '/SMS', icon: <FaComments /> },
          { label: 'SMS API', route: '/SMSAPI', icon: <FaCode /> },
        ],
      },
    ],
  },
  {
    label: 'Who We Are',
    route: '/about',
    icon: <FaInfoCircle />,
    col: [
      {
        title: '',
        submenus: [
          { label: 'About Us', route: '/about', icon: <FaInfoCircle /> },
          { label: 'Career', route: '/Career', icon: <FaBriefcase /> },
        ],
      },
    ],
  },
  {
    label: 'Blogs',
    route: '/blog',
    icon: <FaBlog />,
    col: [
      {
        title: '',
        submenus: [
          { label: 'Events', route: '/blog', icon: <FaCalendar /> },
          { label: 'Press & Release', route: '/blog', icon: <FaBullhorn /> },
          { label: 'Blog', route: '/blog', icon: <MdRssFeed /> },
        ],
      },
    ],
  },
  { label: 'Contact', route: '/contact-us', icon: <FaBullhorn /> },
];

export default menus;
