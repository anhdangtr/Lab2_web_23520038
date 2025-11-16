/** @jsx createElement */
import { createElement, ComponentProps } from './jsx-runtime';

// src/components.tsx
// Part 3.2: Component Library

// --- Card Component ---

// TODO: Create a Card component
interface CardProps extends ComponentProps {
  title?: string;
  className?: string;
  onClick?: () => void;
}

const Card = ({ title, children, className = '', onClick }: CardProps) => {
  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    padding: '16px',
    margin: '10px 0',
  };
  
  const titleStyle = {
    margin: '0 0 12px 0',
    fontSize: '1.25em',
    color: '#2c3e50'
  };

  return (
    <div className={`card ${className}`} style={cardStyle} onClick={onClick}>
      {title && <h3 style={titleStyle}>{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// --- Modal Component ---

// TODO: Create a Modal component
interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // TODO: Return null if not open
  if (!isOpen) {
    return null;
  }

  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  };

  const contentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    zIndex: '1001',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px'
  };
  
  const titleStyle = { margin: 0, fontSize: '1.5em' };
  
  const closeButtonStyle = {
    border: 'none',
    background: 'transparent',
    fontSize: '1.5em',
    cursor: 'pointer',
    padding: '0 5px',
  };

  // TODO: Handle click outside to close
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" style={overlayStyle} onClick={handleOverlayClick}>
      <div className="modal-content" style={contentStyle}>
        <div className="modal-header" style={headerStyle}>
          {title && <h2 style={titleStyle}>{title}</h2>}
          <button style={closeButtonStyle} onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};


// --- Form Component ---

// TODO: Create a Form component
interface FormProps extends ComponentProps {
  onSubmit: (e: Event) => void;
  className?: string;
}

const Form = ({ onSubmit, children, className = '' }: FormProps) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

// --- Input Component ---

// TODO: Create an Input component
interface InputProps {
  type?: string;
  value: string | number;
  onInput: (e: Event) => void; // Sử dụng onInput để có real-time update
  placeholder?: string;
  className?: string;
  id?: string;
}

const Input = ({ type = 'text', value, onInput, placeholder, className = '', id }: InputProps) => {
  const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '5px 0'
  };

  return (
    <input
      type={type}
      value={value}
      onInput={onInput}
      placeholder={placeholder}
      className={className}
      id={id}
      style={inputStyle}
    />
  );
};

export { Card, Modal, Form, Input };