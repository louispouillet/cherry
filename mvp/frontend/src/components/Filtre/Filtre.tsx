import { useState } from "react";
import "./Filtre.css";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: FilterOptions) => void;
  onCloseWithoutFilters: () => void;
}

interface FilterOptions {
  activityTypes: string[];
}

const activityTypes = [
  "Sports",
  "Culture",
  "Sortie extérieure",
  "Éducation",
  "Association"
];

const Filtre = ({ isOpen, onClose, onApplyFilter, onCloseWithoutFilters }: FilterModalProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleApplyFilter = () => {
    onApplyFilter({
      activityTypes: selectedActivities
    });
    onClose();
  };

  const handleResetFilter = () => {
    setSelectedActivities([]);
    onApplyFilter({
      activityTypes: []
    });
    onClose();
  };

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (selectedActivities.length === 0) {
      onCloseWithoutFilters();
    } else {
      onClose();
    }
  };

  return (
    <div className="filter-modal-overlay" onClick={handleOverlayClick}>
      <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <h2>Filtrer les événements</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="filter-section">
          <h3>Types d'activités</h3>
          <div className="activity-list">
            {activityTypes.map((activity) => (
              <label key={activity} className="activity-checkbox">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity)}
                  onChange={() => handleActivityToggle(activity)}
                />
                <span>{activity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-buttons">
          <button className="reset-btn" onClick={handleResetFilter}>
            Réinitialiser
          </button>
          <button className="apply-btn" onClick={handleApplyFilter}>
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtre;