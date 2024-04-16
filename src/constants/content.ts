import { Mail, MapPin, Phone } from 'lucide-react';

export const phone = '+852 6095 4241';
export const email = 'contact@mwskwong.com';
export const address = 'Sha Tin, Hong Kong';
export const contact = { phone, email, address };

export const headline = 'Senior Web Engineer @ Viu';

export const firstName = 'Matthew';
export const middleName = 'Wang Shun';
export const lastName = 'Kwong';
export const name = { firstName, middleName, lastName };

export const selfIntroduction =
  'Dynamic and experienced Web Engineer. Skilled in web development, database management, analytical thinking, and creative problem-solving. Adaptable team player with the ability to work independently and an eagerness to succeed.';

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
