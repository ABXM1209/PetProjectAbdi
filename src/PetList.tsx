import { useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { petsAtom, type PetInterface } from "./PetStore.tsx";
import Pet from "./Pet";

export default function PetList() {
    const [pets, setPets] = useAtom(petsAtom);

    useEffect(() => {
        axios.get<PetInterface[]>("https://api-divine-grass-2111.fly.dev/pets")
            .then(res => setPets(res.data))
            .catch(err => console.error(err));
    }, [setPets]);

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {pets.map(pet => (
                <Pet key={pet.id} pet={pet} />
            ))}
        </div>
    );
}
