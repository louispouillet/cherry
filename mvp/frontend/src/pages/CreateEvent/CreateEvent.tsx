import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

interface CreateEventProps {
    onClose?: () => void;
}

interface FormDataType {
    name: string;
    type: string;
    description: string;
    pictures: string[];
    ageRange: [number, number];
}

const CreateEvent = ({ onClose }: CreateEventProps) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        type: '',
        description: '',
        pictures: ['', '', ''],
        ageRange: [18, 100]
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [tempUrl, setTempUrl] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber;
        setFormData(prev => ({
            ...prev,
            ageRange: [value, prev.ageRange[1]]
        }));
    };

    const handlePictureClick = (index: number) => {
        setSelectedImageIndex(index);
        setTempUrl(formData.pictures[index] || '');
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedImageIndex(null);
        setTempUrl('');
    };

    const handleModalSave = () => {
        if (selectedImageIndex !== null) {
            const newPictures = [...formData.pictures];
            newPictures[selectedImageIndex] = tempUrl;
            setFormData(prev => ({
                ...prev,
                pictures: newPictures
            }));
        }
        handleModalClose();
    };

    return (
        <>
            <div className="create-event-container">

                {/* Header */}
                <div className="event-header">
                    <button className="back-btn" onClick={onClose || (() => navigate('/home'))}>
                        ← New Event
                    </button>
                    <button className="create-btn" onClick={() => navigate('/home')}>Create</button>
                </div>

                {/* Tabs */}
                <div className="event-tabs">
                    <button className={`event-tab ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>Edit</button>

                </div>

                {/* Form Content */}
                {activeTab === 'edit' && (
                    <form className="create-event-form">
                        {/* Name Field */}
                        <div className="form-group">
                            <label htmlFor="name">NAME</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder=""
                            />
                        </div>

                        {/* Type Field */}
                        <div className="form-group">
                            <label htmlFor="type">TYPE</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="sports">Sports</option>
                                <option value="culture">Culture</option>
                                <option value="Sortie extérieure">Sortie extérieure</option>
                                <option value="éducation">Éducation</option>
                                <option value="association">Association</option>
                            </select>
                        </div>

                        {/* Description Field */}
                        <div className="form-group">
                            <label htmlFor="description">DESCRIPTION</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder=""
                            />
                        </div>

                        {/* Picture Upload */}
                        <div className="form-group">
                            <label>PICTURE</label>
                            <div className="picture-upload-container">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className={`picture-upload-box ${formData.pictures[index] ? 'has-image' : ''}`}
                                        onClick={() => handlePictureClick(index)}
                                        style={{
                                            backgroundImage: formData.pictures[index] ? `url(${formData.pictures[index]})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundColor: formData.pictures[index] ? 'transparent' : '#fafafa'
                                        }}
                                    >
                                        {!formData.pictures[index] && <span>+</span>}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Age Range */}
                        <div className="form-group">
                            <label className="range-label">AGE MIN</label>
                            <div className="age-range-container">
                                <input
                                    type="range"
                                    min="18"
                                    max="100"
                                    value={formData.ageRange[0]}
                                    onChange={handleAgeChange}
                                    className="range-input-min"


                                />
                                <span className="range-value">{formData.ageRange[0]}</span>
                            </div>
                        </div>
                    </form>
                )}

            </div>


            {/* Modal pour l'URL de l'image */}
            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Ajouter une image</h3>
                        <input
                            type="text"
                            placeholder="Entrez l'URL de l'image"
                            value={tempUrl}
                            onChange={(e) => setTempUrl(e.target.value)}
                            className="modal-input"
                            autoFocus
                        />
                        <div className="modal-buttons">
                            <button className="modal-btn cancel" onClick={handleModalClose}>
                                Annuler
                            </button>
                            <button className="modal-btn save" onClick={handleModalSave}>
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default CreateEvent;