// constants/index.ts

export const link = [
  { title: 'Home', url: '/' },
  { title: 'Shop', url: '#shop' },
  { title: 'About', url: '#about' },
  { title: 'Contact', url: '#contact' },
];

export const servicePoints = [
  {
    title: 'Connect Businesses',
    description:
      'We allow local professionals to connect with international markets. Major dealers also connect with major buyers — all online.',
  },
  {
    title: 'Journal Publications',
    description:
      'We promote indigenous industry and academic-based intellectual properties through structured publications.',
  },
  {
    title: 'News and Information',
    description:
      'We share trending news in the Oil and Gas world — from Downstream, Midstream to Upstream sectors.',
  },
  {
    title: 'Online Sales/Marketing',
    description:
      'We sell oil and gas products from within Nigeria to Nigerians and to the world at large.',
  },
];

// constants/footer.ts
export const footerLinks = {
  about: [
    { label: 'Company', href: '/about/company' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Press', href: '/about/press' },
    { label: 'Careers', href: '/about/careers' },
  ],
};
export const socialIcons = [
  { icon: 'facebook', url: 'https://www.facebook.com/share/1EksvLbDzX/' },
  {
    icon: 'instagram',
    url: 'https://www.instagram.com/naijagasonline?igsh=YzhueHlraDNieDNj',
  },
];

export const NigerianCities: Record<string, string[]> = {
  abuja: ['Abuja', 'Kuje', 'Kwali', 'Madala'],
  lagos: [
    'Apapa',
    'Badagry',
    'Ebute Ikorodu',
    'Ejirin',
    'Epe',
    'Ikeja',
    'Lagos',
    'Lekki',
    'Ikorodu',
    'Ojo',
    'Makoko',
    'Agege',
    'Akesan',
    'Iyana Ishashi',
    'Alaska',
    'UNILAG',
    'Ojodu',
    'Mushin',
    'Ikotun',
    'Ijegun',
    'Surulere',
    'Somolu',
    'Ebute Meta',
    'Festac Town',
    'Satellite Town',
    'Victoria Island',
    'Elegushi',
    'VGC',
    'Ajah',
    'Ibeju',
    'Sangotedo',
    'Lambasa',
    'Lakowe',
    'Kajola',
    'Elulu',
    'Ayeteju',
    'Eleko',
    'Araromi',
    'Okunegun',
  ],
  rivers: [
    'Port Harcourt',
    'Bonny',
    'Opobo',
    'Omoku',
    'Eleme',
    'Okrika',
    'Bori',
    'Ahoada',
    'Degema',
    'Abonnema',
    'Isiokpo',
    'Omagwa',
    'Tai',
    'Nkoro',
    'Andoni',
  ],
};

export const gasOptions = [
  { label: '3kg', price: 2800 },
  { label: '6kg', price: 5400 },
  { label: '7kg', price: 7600 },
  { label: '8kg', price: 8200 },
  { label: '9kg', price: 9800 },
  { label: '10kg', price: 10500 },
  { label: '11kg', price: 11800 },
  { label: '12.5kg', price: 12200 },
  { label: '25kg', price: 25500 },
  { label: 'Bulk Purchase', price: 0 },
];
