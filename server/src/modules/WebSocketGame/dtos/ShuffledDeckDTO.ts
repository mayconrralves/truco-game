interface Game {
    uuid: string;
    deck: Array<any>;
}

export interface ShuflledDeckDTO {
    game: Game;
    deck: Array<any>;
    uuid: string;
}
