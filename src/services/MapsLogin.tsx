import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import "../styles/MapsLogin.css"
import{ Icon }from 'leaflet';
import axios from 'axios';
import IconUrl from 'leaflet/dist/images/marker-icon.png';
import IconShadow from 'leaflet/dist/images/marker-shadow.png';
import IconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import { useApi } from '../services/context/ApiContext';
import { useNavigate } from 'react-router-dom';



const MapsLogin = () => {
  const { dadosArtes } = useApi();

  const [centros, setCentros] = useState([]);

  const navigate = useNavigate(); 

  const navigateToArt = (arteId: number) => {
    navigate(`/arte/${arteId}`); 
  };


  useEffect(() => {
    const obterCoordenadas = async () => {
      try {

        
        if (!dadosArtes || dadosArtes.length === 0) {
          console.error('Dados Artes de arte de rua não definidos ou vazios.');
          return;
        }

        const coordenadasPromises = dadosArtes.map(async (arte: any) => {
          if (!arte.endereco || !arte.cidade || !arte.uf) {
            console.error(`Os dados Artes para a arte de rua ${arte.id} não contêm informações de endereço.`);
            return null;
          }

          try {
            const enderecoCompleto = `${arte.endereco}, ${arte.cidade}, ${arte.uf}`;
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`,
            );

            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              console.log(`Coordenadas encontradas para ${enderecoCompleto}: [${lat}, ${lon}]`);
              return { id: arte._id, position: [parseFloat(lat), parseFloat(lon)], nome: arte.nome, foto: arte.foto};
            } else {
              console.error(`Nenhuma coordenada encontrada para o endereço: ${enderecoCompleto}`);
              return null;
            }
          } catch (error) {
            console.error('Erro ao obter coordenadas:', error);
            return null;
          }
        });

        const coordenadas: any = await Promise.all(coordenadasPromises);
        setCentros(coordenadas.filter((coordenada: any) => coordenada !== null));
        console.log(centros);
        
      } catch (error) {
        console.error('Erro ao obter dadosArtes de arte de rua:', error);
      }
    };

    obterCoordenadas();
  }, [dadosArtes]);

  const iconePadrao = new Icon({
    IconRetinaUrl,
    iconUrl: IconUrl,
    IconShadow,
    iconSize: [16, 30], // Tamanho do ícone
    iconAnchor: [12, 41], // Ponto de ancoragem
    popupAnchor: [1, -34], 
  });

  return (
    <div >
    <MapContainer center={[ -10.1689, -48.3317]} zoom={3} className='maps-login'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {
      centros.map((centro: any) => (
        <Marker key={centro.id} position={centro.position} icon={iconePadrao} >
          <Popup className='container-popup-login' >
            <div onClick={() => navigateToArt(centro.id)}>
            <img src={centro.foto} alt={centro.nome} className='foto-map-login' />
           <p className='localizacao-p'> Localização: {centro.nome} </p>
           </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapsLogin;
