import React, { useState, useEffect, useRef } from 'react';
import './NoteModal.css';
import { ReactComponent as UploadIcon } from '../assets/upload.svg';
import { RxCross2 as CrossIcon } from "react-icons/rx";
import { motion } from 'framer-motion';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNote: string;
  onSave: (note: string, images: File[]) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, initialNote, onSave }) => {
  const [note, setNote] = useState(initialNote);
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote, isOpen]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedImage) return; // Don't close the modal if a full-screen image is open
  
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
  
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  // Modify handleDrop to convert images
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024);
    
    try {
      const convertedImages = await Promise.all(imageFiles.map(convertToAvif));
      setImages(prevImages => [...prevImages, ...convertedImages]);
    } catch (error) {
      console.error('Image conversion error:', error);
      // Fallback to original images if conversion fails
      setImages(prevImages => [...prevImages, ...imageFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    setRemovingIndex(index);
    setTimeout(() => {
      setImages(images.filter((_, i) => i !== index));
      setRemovingIndex(null);
    }, 300);
  };

  // Modify handleFileChange to convert images
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024);
    
    try {
      const convertedImages = await Promise.all(imageFiles.map(convertToAvif));
      setImages(prevImages => [...prevImages, ...convertedImages]);
    } catch (error) {
      console.error('Image conversion error:', error);
      // Fallback to original images if conversion fails
      setImages(prevImages => [...prevImages, ...imageFiles]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const openFullScreenImage = (image: File) => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(URL.createObjectURL(image));
  };

  const closeFullScreenImage = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevents closing the entire modal
    }
    
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="note-modal-overlay">
      <div className="note-modal" ref={modalRef}>
        <button className="close-button" onClick={onClose}><CrossIcon/></button>
        <div className="note-modal-content">
          
          
          {/*
          {images.length > 0 && (
            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className={`image-container ${removingIndex === index ? 'fade-out' : ''}`}>
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${index}`} 
                    onClick={() => openFullScreenImage(image)}
                  />
                  <button 
                    className="remove-image" 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from closing the full-screen modal
                      removeImage(index);
                    }}
                  >
                    <CrossIcon/>
                  </button>
                </div>
              ))}
            </div>
          )}
          */}


          <textarea
            ref={textareaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add detailed notes about this trade..."
          />
        </div>
          
        <div className="note-modal-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="save-note-button" onClick={handleSave}>Save Note</button>
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div 
          className="full-screen-overlay" 
          onClick={closeFullScreenImage}
        >
          <button 
            className="close-fullscreen-button" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from closing the main modal
              closeFullScreenImage(e);
            }}
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