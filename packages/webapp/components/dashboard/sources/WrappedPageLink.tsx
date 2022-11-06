import React from "react";

const WrappedPageLink: React.FC<{ label: string }> = ({ label }) => {
  // Sur desktop, inutile de faire les césures
  const ellipsis = window.innerWidth / 30 + 10;

  let wrappedlabel = label;

  if (label.length > ellipsis) {
    wrappedlabel = label.slice(0, ellipsis) + "...";
  }

  return (
    <a rel="noopener noreferrer" target="_blank" href={label}>
      {wrappedlabel}
    </a>
  );
};

export default WrappedPageLink;
