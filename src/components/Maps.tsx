import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/Maps.css"
import{ Icon }from 'leaflet';
import axios from 'axios';
import IconUrl from 'leaflet/dist/images/marker-icon.png';
import IconShadow from 'leaflet/dist/images/marker-shadow.png';
import IconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';

const MapaArteDeRua = ({ dados }: any) => {
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    const obterCoordenadas = async () => {
      try {

        
        if (!dados || dados.length === 0) {
          console.error('Dados de arte de rua não definidos ou vazios.');
          return;
        }

        const coordenadasPromises = dados.map(async (arte: any) => {
          if (!arte.endereco || !arte.cidade || !arte.uf) {
            console.error(`Os dados para a arte de rua ${arte.id} não contêm informações de endereço.`);
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
              return { id: arte.id, position: [parseFloat(lat), parseFloat(lon)], nome: arte.nome};
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
        console.error('Erro ao obter dados de arte de rua:', error);
      }
    };

    obterCoordenadas();
  }, [dados]);

  const iconePadrao = new Icon({
    IconRetinaUrl,
    iconUrl: IconUrl,
    IconShadow,
    iconSize: [16, 30], // Tamanho do ícone
    iconAnchor: [12, 41], // Ponto de ancoragem
    popupAnchor: [1, -34], 
  });

  return (
    <div>
      <p className='title-maps'>Veja as artes mais próximas de você.</p>
    <MapContainer center={[-19.93221142062016, -43.95088731171624]} zoom={4.5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {
      centros.map((centro: any) => (
        <Marker key={centro.id} position={centro.position} icon={iconePadrao} >
          <Popup>
            Localização: {centro.nome}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default MapaArteDeRua;
