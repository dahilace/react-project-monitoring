import type { FormHTMLAttributes } from 'react';

type Props = FormHTMLAttributes<HTMLFormElement> & {
  title?: string;
  children: React.ReactNode;
};

export const AppForm = ({ title, children, ...props }: Props) => {
  return (
    <form
      className="w-fit max-w-100 min-w-80 p-8 bg-white shadow-lg rounded-2xl flex flex-col gap-5 border border-gray-100"
      {...props}
    >
      <p className="text-lg font-semibold">{title}</p>
      {children}
    </form>
  );
};
