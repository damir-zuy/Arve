import React, { useState, useEffect, useRef } from 'react';
import './NoteModal.css';
import { ReactComponent as UploadIcon } from '../assets/upload.svg';
import { RxCross2 as CrossIcon } from "react-icons/rx";
import { motion } from 'framer-motion';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNote: string;
  initialImages?: string[]; // Add support for initial image URLs
  onSave: (note: string, images: File[]) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ 
  isOpen, 
  onClose, 
  initialNote,
  initialImages = [], 
  onSave 
}) => {
  const [note, setNote] = useState(initialNote);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for image upload
  const [error, setError] = useState<string | null>(null); // Error state
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  // Async function to convert image to AVIF
  const convertToAvif = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const img = await createImageBitmap(new Blob([event.target!.result as ArrayBuffer]));
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);

          // Convert to AVIF with high quality
          canvas.toBlob((blob) => {
            if (blob) {
              const convertedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".avif"), {
                type: 'image/avif',
                lastModified: Date.now()
              });
              resolve(convertedFile);
            } else {
              reject(new Error('Blob creation failed'));
            }
          }, 'image/avif', 0.8);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Function to handle both drag-drop and file change
  const handleImageFiles = async (files: File[]) => {
    setIsLoading(true); // Start loading when images are being processed
    setError(null); // Reset error state before new attempt

    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );

    if (imageFiles.length > 0) {
      setImages(prev => [...prev, ...imageFiles]);
      const newImageUrls = imageFiles.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }

    setIsLoading(false);
  };

  // Update these useEffects to prevent infinite updates
  useEffect(() => {
    if (isOpen) {
      setNote(initialNote);
      setImageUrls(initialImages);
    }
  }, [isOpen, initialNote, initialImages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Clean up object URLs on modal close or unmount
  useEffect(() => {
    return () => {
      if (!isOpen) {
        imageUrls.forEach(url => URL.revokeObjectURL(url));
      }
    };
  }, [isOpen, imageUrls]);

  // Remove the setTimeout that was causing issues
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedImage) return;
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, selectedImage]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedImage) {
          closeFullScreenImage(); // Close only the full-screen image
        } else {
          onClose(); // Close the main modal if no image is open
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedImage, onClose]);

  const handleSave = () => {
    onSave(note, images);
    onClose();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleImageFiles(Array.from(event.dataTransfer.files));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageFiles(Array.from(event.target.files || []));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setRemovingIndex(index);
    
    // Revoke object URL if it exists
    if (imageUrls[index]) {
      URL.revokeObjectURL(imageUrls[index]);
    }

    setTimeout(() => {
      setImages(prev => prev.filter((_, i) => i !== index));
      setImageUrls(prev => prev.filter((_, i) => i !== index));
      setRemovingIndex(null);
    }, 300);
  };

  const openFullScreenImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeFullScreenImage = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevents closing the entire modal
    }

    if (selectedImage) {
      setSelectedImage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="note-modal-overlay">
      <div className="note-modal" ref={modalRef}>
        <div className="note-modal-content">
          {/* Drop area */}
          {/* Drop area */}
          {/* <div
            ref={dropAreaRef}
            className={`drop-area ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            aria-label="Drop area for uploading images"
          >
            <UploadIcon />
            <p>Drag & Drop Images Here</p>
            <button
              className="upload-link-text"
              onClick={handleUploadClick}
              aria-label="Click to browse files"
            >
              or, <span className='upload-link'>click to browse</span>(10 MB max)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
              aria-label="Select images from your device"
            />
          </div> */}

          {/* Error message */}
          {error ? <div className="error-message">{error}</div> : null}

          {/* Image preview */}
          {/* {imageUrls.length > 0 && (
            <div className="image-preview">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className={`image-container ${removingIndex === index ? 'fade-out' : ''}`}>
                  <img 
                    src={imageUrl} 
                    alt={`Preview ${index}`} 
                    onClick={() => openFullScreenImage(imageUrl)} 
                  />
                  <button 
                    className="remove-image" 
                    onClick={(e) => { 
                      e.stopPropagation(); // Prevent the click from closing the full-screen modal
                      removeImage(index);
                    }}
                    aria-label={`Remove image ${index}`}
                  >
                    <CrossIcon />
                  </button>
                </div>
              ))}
            </div>
          )} */}

          {/* Note input */}
          <textarea 
            ref={textareaRef} 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="Add detailed notes about this trade..."
            aria-label="Enter your note here"
          />
        </div>
        <div className="note-modal-footer">
          <button className="cancel-button" onClick={onClose} aria-label="Cancel">
            Cancel
          </button>
          <button className="save-note-button" onClick={handleSave} aria-label="Save note">
            Save Note
          </button>
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div className="full-screen-overlay" onClick={closeFullScreenImage}>
          <button 
            className="close-fullscreen-button" 
            onClick={(e) => { 
              e.stopPropagation(); // Prevent closing the full-screen modal
              closeFullScreenImage(e); 
            }}
            aria-label="Close full-screen image"
          >
            <CrossIcon style={{ width: '30px', height: '30px', color: 'var(--pink)' }} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full Screen" 
            className="full-screen-image" 
            onClick={(e) => e.stopPropagation()} // Prevents accidental modal close
          />
        </div>
      )}
    </div>
  );
};

export default NoteModal;
