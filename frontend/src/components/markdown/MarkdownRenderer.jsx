import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownRenderer({
  content,
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}

      components={{

        code({
          inline,
          className,
          children,
          ...props
        }) {
          const match = /language-(\w+)/.exec(
            className || ""
          );

          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              customStyle={{
                borderRadius: "16px",
                padding: "20px",
                marginTop: "16px",
              }}
              {...props}
            >
              {String(children).replace(
                /\n$/,
                ""
              )}
            </SyntaxHighlighter>
          ) : (
            <code
              className="
                bg-black/30
                px-2
                py-1
                rounded
                text-sm
              "
              {...props}
            >
              {children}
            </code>
          );
        },

        h1: ({ children }) => (
          <h1
            className="
              text-3xl
              font-bold
              mt-6
              mb-4
            "
          >
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2
            className="
              text-2xl
              font-semibold
              mt-6
              mb-3
            "
          >
            {children}
          </h2>
        ),

        p: ({ children }) => (
          <p
            className="
              text-gray-300
              leading-relaxed
              mt-3
            "
          >
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul
            className="
              list-disc
              pl-6
              mt-4
              space-y-2
            "
          >
            {children}
          </ul>
        ),

        li: ({ children }) => (
          <li className="text-gray-300">
            {children}
          </li>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}