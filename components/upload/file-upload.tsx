import React, { RefObject } from 'react';

interface FileUploadProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  fileInputRef,
  onFileChange,
  accept = 'image/*',
  className = 'hidden',
}) => {
  return (
    <input
      type='file'
      ref={fileInputRef}
      className={className}
      accept={accept}
      onChange={onFileChange}
    />
  );
};
