import ReactMarkdown from "react-markdown";

export const CustomReactMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ node: _, ...props }) => (
          <p className="text-sm text-muted/80 leading-relaxed mb-4 flex-1" {...props} />
        ),
        ul: ({ node: _, ...props }) => (
          <ul className="text-sm text-muted/80 leading-relaxed mb-4 flex-1" {...props} />
        ),
        li: ({ node: _, ...props }) => (
          <li className="text-sm text-muted/80 leading-relaxed mb-4 flex-1" {...props} />
        ),
        strong: ({ node: _, ...props }) => (
          <strong className="text-sm text-muted/80 leading-relaxed mb-4 flex-1" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
