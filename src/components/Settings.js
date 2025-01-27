import React, { useState, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AuthContext } from '../helper/AuthContex';
import { useContext } from 'react';

function Settings() {
    const { authState, setAuthState } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({
        username: authState.username || '',
        phone: authState.phone || '' // Örnek telefon numarası
    });

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Yeni profil resmi seçildi:', file.name);
            // Burada dosya yükleme işlemi yapılacak
        }
    };

    const handleFieldEdit = (field) => {
        setEditingField(field);
    };

    const handleFieldSave = () => {
        console.log('Değişiklikler kaydedildi:', formData);
        setEditingField(null);
    };

    return (
        <div className="flex-1 bg-gray-900 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            
            {/* Profile Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-6">
                    {/* Profile Image */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden relative">
                            <img
                                src={`http://localhost:8000${authState.avatar}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {isHovered && (
                                <div 
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                    <FiEdit className="text-white text-xl" />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-4">
                        {/* Username Field */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-400 text-sm mb-1">Username</label>
                                {editingField === 'username' ? (
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                                        onBlur={handleFieldSave}
                                    />
                                ) : (
                                    <div className="text-white">{formData.username}</div>
                                )}
                            </div>
                            <button 
                                onClick={() => handleFieldEdit('username')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FiEdit size={20} />
                            </button>
                        </div>

                        {/* Phone Field */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-400 text-sm mb-1">Phone</label>
                                {editingField === 'phone' ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                                        onBlur={handleFieldSave}
                                    />
                                ) : (
                                    <div className="text-white">{formData.phone}</div>
                                )}
                            </div>
                            <button 
                                onClick={() => handleFieldEdit('phone')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FiEdit size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
