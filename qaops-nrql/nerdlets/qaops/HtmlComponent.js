import React, { useEffect, useState } from "react";

const HtmlComponent = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("./playwright-report/index.html")
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HtmlComponent;
