import React from 'react';
import axios from 'axios';
import { RiLoader5Fill } from 'react-icons/ri';
import { validate } from '@/lib/validation';
import { Send } from 'lucide-react';

export interface IValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface IErrors extends Partial<IValues> {}

const subjects = [
  "General Inquiry",
  "Account Issue",
  "Bug Report",
  "Feature Request",
  "Job Posting Help",
  "Application Issue",
  "Feedback",
  "Other",
];

const Form = ({ values, setValues }: { values: IValues; setValues: React.Dispatch<React.SetStateAction<IValues>> }) => {
  const [errors, setErrors] = React.useState<IErrors>({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [messageState, setMessageState] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (validationErrors && Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await axios.post('/api/mail', {
        name: values.name,
        email: values.email,
        message: `[${values.subject || "General Inquiry"}]\n\n${values.message}`,
      });
      if (res.status === 200) {
        setValues({ name: '', email: '', subject: '', message: '' });
        setSuccess(true);
        setMessageState(res.data.message);
      } else {
        setMessageState(res.data.message);
      }
    } catch (err: any) {
      setMessageState(err?.response?.data?.message || String(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <Send size={24} className="text-gray-900" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Message Sent!</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          {messageState || "Thank you for reaching out. We'll get back to you as soon as possible."}
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setMessageState('');
          }}
          className="mt-2 text-sm font-medium text-gray-600 hover:text-gray-900 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">*{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">*{errors.email}</p>}
      </div>

      {/* Subject dropdown */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">
          Topic
        </label>
        <select
          id="subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
        >
          <option value="">Select a topic</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          className="block w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">*{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <RiLoader5Fill className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>

      {messageState && !success && (
        <p className="text-center text-sm text-red-500">{messageState}</p>
      )}
    </form>
  );
};

export default Form;
