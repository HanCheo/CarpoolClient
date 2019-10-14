import React from "react";

interface IPorps {
  submitFn: any;
  className?: string;
}

const Form: React.SFC<IPorps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    onSubmit={e => {
      e.preventDefault();
      submitFn();
    }}
  >
    {children}
  </form>
);

export default Form;
