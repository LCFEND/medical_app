import React, { useState, useEffect, useCallback } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    // Wrap this function with useCallback
    const getDoctorsDetails = useCallback(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                if (searchParams.get('speciality')) {
                    const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
                setDoctors(data);
            })
            .catch(err => console.log(err));
    }, [searchParams]); // Now `searchParams` is a dependency

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    const navigate = useNavigate();

    // Redirect unauthenticated users to login
    useEffect(() => {
        if (!sessionStorage.getItem('auth-token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        getDoctorsDetails(); // No longer re-created on every render
    }, [getDoctorsDetails]); // This makes the effect dependent on getDoctorsDetails

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available in {searchParams.get('location')}</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCardIC
                                        className="doctorcard"
                                        {...doctor}
                                        key={doctor.name}
                                        profilePic={doctor.profilePic || 'default-image.jpg'}
                                    />
                                ))
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </center>
    );
};

export default InstantConsultation;
