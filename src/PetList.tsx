import {useEffect, useState} from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { petsAtom, type PetInterface } from "./PetStore.tsx";
import Pet from "./Pet";
import {baseurl} from "./baseurl.ts";
import {useNavigate} from "react-router-dom";

export default function PetList() {
    const [pets, setPets] = useAtom(petsAtom);
    const navigate = useNavigate();
    const [reveal, setReveal] = useState(false);
    const [petModel, setPetModel] = useState<PetInterface>(
        {
            id: "",
            name: "",
            breed: "",
            imgurl: "https://www.boredpanda.com/blog/wp-content/uploads/2015/07/smiling-cat-2__605.jpg",
            sold: false
        }
    );

    useEffect(() => {
        axios.get<PetInterface[]>(baseurl+"/GetPets")
            .then(res => setPets(res.data))
            .catch(err => console.error(err));
    }, [setPets]);

    const createPet = async () => {
        try{
            const result = await axios.post(baseurl+"/CreatePet", petModel);
            setPets([...pets, result.data]);
            navigate(`/pet/${result.data.id}`);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {pets.map(pet => (
                <Pet key={pet.id} pet={pet} />
            ))}
            <button className="btn btn-success m-2" onClick={() => {
                setReveal(true);
            }}>
                Create Pet
            </button>

            {
                reveal &&
                <>
                    <div>
                    <input type="text" placeholder="Name" value={petModel.name} onChange={(e => setPetModel({...petModel, name: e.target.value}))} className="input input-primary"/>
                    <input type="text" placeholder="Breed" value={petModel.breed} onChange={(e => setPetModel({...petModel, breed: e.target.value}))}  className="input input-primary"/>
                    <button type="button" className="btn btn-primary" onClick={createPet}>Confirm</button>
                    </div>
                </>
            }
        </div>
    );
}
