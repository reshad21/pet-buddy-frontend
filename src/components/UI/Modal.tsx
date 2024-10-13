"use client";
import { TCreatePostData } from "@/types";
import Image from "next/image";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: TCreatePostData | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <div>
          <p>
            <strong>Category:</strong> {post.category}
          </p>
          <p>
            <strong>Title:</strong> {post.title}
          </p>
          <Image
            width={50}
            height={50}
            src={post.postImage}
            alt={post.title}
            className="w-full h-32 object-cover rounded"
          />
        </div>
        {/* You can add a form here to edit the post */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
