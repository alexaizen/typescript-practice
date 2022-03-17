import React from "react";
import "./PageContentWrapper.css";

const PageContentWrapper: React.FC<{}> = (props) => {
  return <div className="page-content-wrapper">{props.children}</div>;
};

export default PageContentWrapper;
