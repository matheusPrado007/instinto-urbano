import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../services/context/ApiContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { CustomNextArrow, CustomPrevArrow } from '../../components/Btn';
import '../../styles/Profile.css';
import '../../styles/Galeria.css';
import '../../styles/ProfileArtist.css';
import ProfileArtistComponent from '../../components/ProfileArtistComponent';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
    email: string;
    linkedin: string;
    instagram: string;
}

interface Arte {
    _id: string;
    foto: string;
    nome_artista: string;
    nome: string;
    endereco: string;
}

interface GaleriaItem extends Arte { }

const ProfileArtist: React.FC = () => {
    // Hooks
    const { id } = useParams<{ id?: string }>();
    const { dadosUsers, dadosArtes } = useApi();
    const navigate = useNavigate();

    const [larguraTotal, setLarguraTotal] = useState(100);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArte, setSelectedArte] = useState<Arte | null>(null);

    // Render
    const user = dadosUsers.find((u) => u._id === id) || null;
    const filteredArtes = dadosArtes.filter((arte) => arte.nome_artista.toLocaleUpperCase().includes(user?.username.toLocaleUpperCase()));

    // Effects
    useEffect(() => {
        const handleResize = async () => {
            const numeroDeImgs = window.innerWidth / 160;
     

            const numeroTotal = +numeroDeImgs.toFixed(0) < filteredArtes.length ? numeroDeImgs : filteredArtes.length - 1
            

            const resulNumber = +numeroTotal === 0 ? 1 : +numeroTotal;

            const finalResult = +resulNumber.toFixed(0) > 6 ? 5 : +resulNumber

            setLarguraTotal(+finalResult.toFixed(0));
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1300);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout);
        };
    }, [filteredArtes.length]);

    // Other Functions
    const handleArteClick = (arteId: string) => {
        const clickedArte = dadosArtes.find((arte) => arte._id === arteId);
        setSelectedArte(clickedArte || null);
        navigate(`/arte/${arteId}`);
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: larguraTotal,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <Header />
                <ProfileArtistComponent />
            <Footer />
        </>
    );
};

export default ProfileArtist;
