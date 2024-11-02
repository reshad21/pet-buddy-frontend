// src/components/UI/PostContent.tsx

import DOMPurify from "dompurify";
import React from "react";

// Define the props interface
interface PostContentProps {
  content: string; // Specify that content is a string
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  // Sanitize the content using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render HTML content
    />
  );
};

export default PostContent;
