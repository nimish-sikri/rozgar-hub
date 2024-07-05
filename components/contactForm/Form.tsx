import React from 'react';
import axios from 'axios';
import { RiLoader5Fill } from 'react-icons/ri';
import { validate } from '@/lib/validation';
import Input from './Input';
import TextArea from './TextArea';

export interface IValues {
  name: string;
  email: string;
  message: string;
}

interface IErrors extends Partial<IValues> {}

const Form = ({ values, setValues }: { values: IValues; setValues: React.Dispatch<React.SetStateAction<IValues>> }) => {
  const [errors, setErrors] = React.useState<IErrors>({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [messageState, setMessageState] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(values);
    if (errors && Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    setLoading(true);
    axios
      .post('/api/mail', {
        name: values.name,
        email: values.email,
        message: values.message,
      })
      .then((res) => {
        if (res.status === 200) {
          setValues({ name: '', email: '', message: '' });
          setLoading(false);
          setSuccess(true);
          setMessageState(res.data.message);
        } else {
          setLoading(false);
          setMessageState(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessageState(String(err.message));
      });
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={values.name}
        onChange={handleChange}
        id="name"
        name="name"
        label="Your Name"
        placeholder="John Doe"
        error={!!errors.name}
        errorMessage={!!errors.name ? errors.name : ''}
        style={{ border: '1px solid black' }} // Add border here
      />
      <Input
        value={values.email}
        onChange={handleChange}
        id="email"
        name="email"
        label="Your Email"
        placeholder="you@example.com"
        error={!!errors.email}
        errorMessage={!!errors.email ? errors.email : ''}
        style={{ border: '1px solid black' }} // Add border here
      />
      <TextArea
        value={values.message}
        onChange={handleChange}
        id="message"
        name="message"
        label="Your Message"
        placeholder="Your message here..."
        error={!!errors.message}
        errorMessage={!!errors.message ? errors.message : ''}
      />
      <button
        className="mt-4 w-full rounded-md bg-black py-3 px-5 text-lg text-white font-bold outline-none hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading !== true ? (
          'SEND MESSAGE'
        ) : (
          <div className="flex h-full w-full items-center justify-center ">
            <RiLoader5Fill className="h-8 w-8 animate-spin" />
          </div>
        )}
      </button>
      <p className="mt-5 text-green-500 dark:text-green-500">
        {success !== false ? (
          messageState
        ) : (
          <span className="text-red-500 dark:text-red-500">{messageState}</span>
        )}
      </p>
    </form>
  );
};

export default Form;
