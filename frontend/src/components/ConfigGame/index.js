import React, {useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 
import { GameContext } from '../GameContext';
import ListGames from '../ListGames';
import ModalGame from '../ModalGame';
import { ConfigGameStyle } from './styles';

const emitEventListCreatedGames = (socket)=>{
    socket.emit('list_created_games');
}
export default function ConfigGame(){
    const { user } = useContext(AuthContext);
    const { socket, uuid, games, connection, playersJoin, startGame } = useContext(GameContext);
    const [loaded, setLoaded] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const [nameRoom, setNameRoom ] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(connection && !loaded){ 
            setLoaded(true);
        } else if( loaded ) {
            emitEventListCreatedGames(socket);
        }
    }, [connection, loaded, socket]);
    useEffect(()=>{
        if(startGame){
            navigate(`/game/${uuid}`);
        }
    }, [ startGame, uuid, navigate ]);
    const initGame = () =>{
        socket.emit('create_game', {
                name: nameRoom,
                user: user.name
            });
        }
    const joinGame = (room=>{
        const data = {
            uuid: room,
            user: user.name,
            userId: user.id,
        }
        socket.emit('join_game', data);
    });
    const initModal = () => {
        setOpenModal(true);
    }
    return (
        <ConfigGameStyle >
            <h2>Salas</h2>
            { openModal && <ModalGame  
                                    setNameRoom={setNameRoom} 
                                    setOpenModal={setOpenModal} 
                                    initGame={initGame} 
                            /> 
            }
           { !uuid && <button onClick={initModal}>Criar uma sala</button>}
            <div className='list-games'>
                {
                    loaded && <ListGames 
                                games={games} 
                                update={()=>emitEventListCreatedGames(socket)}
                                navigate={navigate}
                                joinGame={joinGame}
                             />
                }
            </div>
        </ConfigGameStyle>
    );
}