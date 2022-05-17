import React, {useContext, useEffect, useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 
import { GameContext } from '../GameContext';
import ListGames from '../ListGames';
import ModalGame from '../ModalGame';
import { ConfigGameStyle } from './styles';
export default function ConfigGame(){
    const { user } = useContext(AuthContext);
    const { socket, 
        uuid, 
        games, 
        connection, 
        startGame,
        updateList,
    } = useContext(GameContext);
    
  
    const [loaded, setLoaded] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const [nameRoom, setNameRoom ] = useState(null);
    const  history = useHistory();
    useEffect(()=>{
        if(connection && !loaded){ 
            setLoaded(true);
        } else if( loaded ) {
            emitEventListCreatedGames(socket);
        }
    }, [connection, loaded, socket]);
    useEffect(()=>{
        if(startGame){
            history.push('/game/start');
        }
    },[startGame, history]);
    useEffect(()=>{
       if(updateList){
           emitEventListCreatedGames(socket);
       }
    },[ socket, updateList] );
    const emitEventListCreatedGames = (socket)=>{
        socket.emit('list_created_games');
    }

    useEffect(()=>{
        if(updateList){
            emitEventListCreatedGames(socket);
        }
    },[socket, updateList]);
    const initGame = () =>{
        socket.emit('create_game', {
                name: nameRoom,
                user: user.name,
                userId: user.id,
            });
    };
    const joinGame = (room)=>{
        const data = {
            uuid: room,
            user: user.name,
            userId: user.id,
        }
        socket.emit('join_game', data);
    };
    const initModal = () => {
        setOpenModal(true);
    };
    const onClickButton = ()=> {
        setOpenModal(false);
        initGame();
    };
    const onChangeInput = (event)=>{
        setNameRoom(event.target.value);
    };
    console.log('uuid',uuid);
    return (
        <ConfigGameStyle >
            <h2>Salas</h2>
            { openModal && <ModalGame  
                                    placeholder='Nome da sala'
                                    setState={setNameRoom}
                                    onClickButton={onClickButton}
                                    onChangeInput={onChangeInput}
                                    buttonDescription='Adiciona Nome'
                            /> 
            }
           { !uuid && <button onClick={initModal}>Criar uma sala</button>}
            <div className='list-games'>
                {
                    loaded && <ListGames 
                                games={games} 
                                update={()=>emitEventListCreatedGames(socket)}
                                joinGame={joinGame}
                             />
                }
            </div>
        </ConfigGameStyle>
    );
}