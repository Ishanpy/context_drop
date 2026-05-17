import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownRenderer({
  content,
}) {

  return (

    <div
      className="
        prose
        prose-invert
        max-w-none

        prose-pre:p-0
      "
    >

      <ReactMarkdown

        remarkPlugins={[
          remarkGfm,
        ]}

        components={{

          code({
            inline,
            className,
            children,
            ...props
          }) {

            const match =
              /language-(\w+)/.exec(
                className || ""
              );

            return !inline &&
              match ? (

              <SyntaxHighlighter
                style={oneDark}

                language={
                  match[1]
                }

                PreTag="div"

                {...props}
              >

                {String(
                  children
                ).replace(/\n$/, "")}

              </SyntaxHighlighter>

            ) : (

              <code
                className={className}
                {...props}
              >
                {children}
              </code>

            );

          },

        }}

      >

        {content}

      </ReactMarkdown>

    </div>

  );

}