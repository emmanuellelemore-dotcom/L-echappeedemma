import emailjs from '@emailjs/browser';

// Configuration EmailJS
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_al4r6fp',
  TEMPLATE_CONTACT: 'template_25r28mi',
  TEMPLATE_QUOTE: 'template_6bmjj4w',
  TEMPLATE_FEEDBACK: 'template_25r28mi', // Réutilise le template Contact (limite gratuite)
  PUBLIC_KEY: '2PvgOWcNO_lUVuXdH',
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export default emailjs;
