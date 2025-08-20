import { atom } from "jotai";

export interface PetInterface {
    id: string;
    name: string;
    breed: string;
    imgurl: string;
    sold: boolean;
}

export const petsAtom = atom<PetInterface[]>([]);
