// src/components/PostContent.tsx

import DOMPurify from "dompurify";
import React from "react";

// Define the props interface
interface PostContentProps {
  content: string; // Specify that content is a string
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content); // Sanitize the content

  return (
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render HTML content
    />
  );
};

export default PostContent;
