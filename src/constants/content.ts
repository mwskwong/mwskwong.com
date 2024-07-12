import { Mail, MapPin, Phone } from 'lucide-react';

export const phone = '+852 6095 4241';
export const email = 'contact@mwskwong.com';
export const address = 'Sha Tin, Hong Kong';
export const contact = { phone, email, address };

export const headline = 'Assistant Technical Manager @ HKJC';

export const firstName = 'Matthew';
export const middleName = 'Wang Shun';
export const lastName = 'Kwong';
export const name = { firstName, middleName, lastName };

export const selfIntroduction =
  'Assistant Technical Manager at HKJC. Expert in web development. Skilled in React, Next.js, and various web technologies. Passionate about innovative tech. MSc from HKUST, BEng from HKU. Constantly exploring new technologies and contributing to open-source projects.';

export const contactInfo = {
  phone: {
    Icon: Phone,
    title: 'Call Me At',
    value: phone,
    url: `tel:${phone.replaceAll(' ', '')}`,
  },
  email: {
    Icon: Mail,
    title: 'Email Me At',
    value: email,
    url: `mailto:${email}`,
  },
  address: {
    Icon: MapPin,
    title: 'Find Me At',
    value: address,
    url: 'https://www.google.com/maps/place/Sha+Tin',
  },
};
