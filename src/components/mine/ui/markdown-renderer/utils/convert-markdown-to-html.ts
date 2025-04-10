import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
// import remarkHeadingId, { type RemarkHeadingIdOptions } from 'remark-heading-id';
import remarkToc, { type Options as RemarkTocOptions } from 'remark-toc';
import remarkCodeTitle from "remark-code-title";
// import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkRehype, { type Options as RemarkRehypeOptions } from 'remark-rehype';
import rehypeRaw from "rehype-raw";
// import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
// import rehypeSanitize, { type Options as RehypeSanitizeOptions } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

type RenderMarkdownToHTMLProps = {
  markdown: string;
  addTOC?: boolean;
};

/**
 * Convert Markdown string in HTML string
 * */
export const convertMarkdownToHTMLString = async ({ markdown, addTOC = true }: RenderMarkdownToHTMLProps) => {
  const transformedMarkdown = `
  ${addTOC ? '## Contents' : ''}  
  ${markdown}`;
  const result = await remark()
    // Support for GitHub Flavored Markdown
    .use(remarkGfm)
    // add heading id attributes
    // .use(remarkHeadingId, { defaults: true, uniqueDefaults: true } satisfies RemarkHeadingIdOptions)
    // Popoulate TOC section
    .use(remarkToc, { heading: 'contents', maxDepth: 2, tight: true } satisfies RemarkTocOptions)
    // Support code title
    .use(remarkCodeTitle)
    // remove empty paragraphs
    // .use(remarkSqueezeParagraphs)
    // Convert to HTML
    .use(remarkRehype, { allowDangerousHtml: true } satisfies RemarkRehypeOptions)
    .use(rehypeRaw)
    // format code blocks with shiki (it style elements with inline style)
    // .use(rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark-dimmed' } } satisfies RehypeShikiOptions)
    // sanitize HTML
    // .use(rehypeSanitize, {} satisfies RehypeSanitizeOptions)
    // Serialiaze to HTML string
    .use(rehypeStringify)
    .process(transformedMarkdown);

  const html = result.toString();
  const transformedHtml = `
  <style>
    [data-remark-code-title]:has( + pre.shiki) {
      border-radius: 10px 10px 0 0;
      font-size: 0.8em;
      padding: 0.6em 1.1em;
      line-height: 1;
      width: min-content;
      max-width: 100%;
    }
    pre.shiki:is([data-remark-code-title] + pre.shiki) {
      margin-top: 0;
      border-top-left-radius: 0;
    }
    [data-remark-code-title]:has( + pre.shiki) {
      background: hsl(0 0 97);
      color: hsl(0 0 67);
    }
    pre.shiki:is([data-remark-code-title] + pre.shiki) {
      background: hsl(0 0 97) !important;
    }
    .dark [data-remark-code-title]:has( + pre.shiki) {
      background: hsl(0 0 3);
      color: hsl(0 0 30);
    }
    .dark pre.shiki:is([data-remark-code-title] + pre.shiki) {
      background: hsl(0 0 3) !important;
    }
  </style>
  ${html}
  `;
  return transformedHtml;
};
