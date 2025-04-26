import React, { useState, useEffect, useRef } from 'react';
import './NoteModal.css';
import { RxCross2 as CrossIcon } from "react-icons/rx";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNote: string;
  onSave: (note: string, images: File[]) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ 
  isOpen, 
  onClose, 
  initialNote,
  onSave 
}) => {
  const [note, setNote] = useState(initialNote);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setNote(initialNote);
    }
  }, [isOpen, initialNote]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

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
          closeFullScreenImage();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedImage, onClose]);

  const handleSave = () => {
    onSave(note, []);
    onClose();
  };

  const closeFullScreenImage = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
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

      {selectedImage && (
        <div className="full-screen-overlay" onClick={closeFullScreenImage}>
          <button 
            className="close-fullscreen-button" 
            onClick={(e) => { 
              e.stopPropagation();
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
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default NoteModal;
