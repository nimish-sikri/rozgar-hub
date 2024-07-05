import React, { useState } from 'react';
import Form from './Form';
import { IValues } from './Form';

const ContactForm = () => {
  const [values, setValues] = useState<IValues>({
    name: '',
    email: '',
    message: '',
  });

  return <Form values={values} setValues={setValues} />;
};

export default ContactForm;
