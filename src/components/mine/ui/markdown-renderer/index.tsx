import { useEffect, useState } from 'react';
// import Markdown from 'react-markdown';
import { convertMarkdownToHTMLString } from './utils/convert-markdown-to-html';

export const MarkdownRenderer = ({ markdownString }: { markdownString: string; }) => {
  return (
    <MarkdownRenderer2 markdownString={markdownString} />
  );
};

// const MarkdownRenderer1 = ({ markdownString }: { markdownString: string; }) => {
//   return (
//     <Markdown>{markdownString}</Markdown>
//   );
// };
const MarkdownRenderer2 = ({ markdownString }: { markdownString: string; }) => {
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    convertMarkdownToHTMLString({ markdown: markdownString, addTOC: false })
      .then((html) => setHtmlString(html));
  }, [markdownString]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};