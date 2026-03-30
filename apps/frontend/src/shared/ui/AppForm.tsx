import type { FormHTMLAttributes } from 'react';

type Props = FormHTMLAttributes<HTMLFormElement> & {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const AppForm = ({ title, children, className, ...props }: Props) => {
  return (
    <form
      className={`${className} w-full p-8 bg-white shadow-lg rounded-2xl flex flex-col gap-5 border border-gray-100`}
      {...props}
    >
      <p className="text-lg font-semibold text-center uppercase">{title}</p>
      {children}
    </form>
  );
};
