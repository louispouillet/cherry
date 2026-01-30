import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateEvent.css';

interface CreateEventProps {
    onClose?: () => void;
}

interface FormDataType {
    title: string;
    type: string;
    description: string;
    photos: string[];
    ageMin: number;
    date: string;
    nbMax: number;
    city: string;
}

const CreateEvent = ({ onClose }: CreateEventProps) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [formData, setFormData] = useState<FormDataType>({
        title: '',
        type: '',
        description: '',
        photos: ['', '', ''],
        ageMin: 18,
        date: '',
        nbMax: 10,
        city: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [tempUrl, setTempUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'ageMin' || name === 'nbMax' ? parseInt(value) : value
        }));
    };

    const handlePictureClick = (index: number) => {
        setSelectedImageIndex(index);
        setTempUrl(formData.photos[index] || '');
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedImageIndex(null);
        setTempUrl('');
    };

    const handleModalSave = () => {
        if (selectedImageIndex !== null) {
            const newPhotos = [...formData.photos];
            newPhotos[selectedImageIndex] = tempUrl;
            setFormData(prev => ({
                ...prev,
                photos: newPhotos
            }));
        }
        handleModalClose();
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');

        if (!token) {
            setError('You need to be logged in to create an event');
            return;
        }

        // Vérifier que les 3 images sont fournies
        if (formData.photos.length < 3 || formData.photos.some(photo => photo === '')) {
            setError('Les 3 images sont obligatoires');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Récupérer l'userId via le token
            const userResponse = await axios.get('http://localhost:3000/user', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const userId = userResponse.data._id || userResponse.data.id;

            if (!userId) {
                setError('Unable to retrieve your information');
                return;
            }

            const eventData = {
                title: formData.title,
                date: formData.date,
                description: formData.description,
                type: formData.type,
                nbMax: formData.nbMax,
                photos: formData.photos,
                ageMin: formData.ageMin,
                city: formData.city,
                AdminId: userId
            };

            const response = await axios.post('http://localhost:3000/events/new', eventData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.status === 201) {
                navigate('/home');
            }
        } catch (err) {
            setError('Error while creating the event');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="create-event-container">

                {/* Header */}
                <div className="event-header">
                    <button className="back-btn" onClick={onClose || (() => navigate('/home'))}>
                        ← New Event
                    </button>
                    <button className="create-btn" onClick={handleCreateEvent} disabled={isLoading}>
                        {isLoading ? 'Création...' : 'Create'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="event-tabs">
                    <button className={`event-tab ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>Edit</button>
                </div>

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Form Content */}
                {activeTab === 'edit' && (
                    <form className="create-event-form" onSubmit={handleCreateEvent}>
                        {/* Title Field */}
                        <div className="form-group">
                            <label htmlFor="title">TITLE</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder=""
                                required
                            />
                        </div>

                        {/* Date Field */}
                        <div className="form-group">
                            <label htmlFor="date">DATE</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* City Field */}
                        <div className="form-group">
                            <label htmlFor="city">CITY</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder=""
                                required
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
                                required
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
                                required
                            />
                        </div>

                        {/* Photos Upload */}
                        <div className="form-group">
                            <label>PHOTOS</label>
                            <div className="picture-upload-container">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className={`picture-upload-box ${formData.photos[index] ? 'has-image' : ''}`}
                                        onClick={() => handlePictureClick(index)}
                                        style={{
                                            backgroundImage: formData.photos[index] ? `url(${formData.photos[index]})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundColor: formData.photos[index] ? 'transparent' : '#fafafa'
                                        }}
                                    >
                                        {!formData.photos[index] && <span>+</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Age Min Field */}
                        <div className="form-group">
                            <label className="range-label" htmlFor="ageMin">AGE MIN</label>
                            <div className="age-range-container">
                                <input
                                    type="range"
                                    id="ageMin"
                                    name="ageMin"
                                    min="18"
                                    max="100"
                                    value={formData.ageMin}
                                    onChange={handleInputChange}
                                    className="range-input-min"
                                />
                                <span className="range-value">{formData.ageMin}</span>
                            </div>
                        </div>

                        {/* Max Participants Field */}
                        <div className="form-group">
                            <label htmlFor="nbMax">MAX PARTICIPANTS</label>
                            <input
                                type="number"
                                id="nbMax"
                                name="nbMax"
                                min="1"
                                placeholder="10"
                                value={formData.nbMax === 10 ? '' : formData.nbMax}
                                onChange={handleInputChange}
                                required
                            />
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