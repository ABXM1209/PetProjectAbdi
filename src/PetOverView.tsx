import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { petsAtom, type PetInterface } from "./PetStore.tsx";
import axios from "axios";

export default function PetOverView() {
    const { id } = useParams<{ id: string }>();
    const [pets, setPets] = useAtom(petsAtom);
    const navigate = useNavigate();

    const pet = pets.find(p => p.id === id);
    if (!pet) return <div>Pet not found</div>;

    const toggleSold = async () => {
        try {
            const updated: PetInterface = { ...pet, sold: !pet.sold };
            await axios.put(`https://api-divine-grass-2111.fly.dev/pets/${id}`, updated);
            setPets(pets.map(p => (p.id === id ? updated : p)));
        } catch (err) {
            console.error(err);
        }
    };

    const deletePet = async () => {
        try {
            await axios.delete(`https://api-divine-grass-2111.fly.dev/pets/${id}`);
            setPets(pets.filter(p => p.id !== id));
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const createPet = async () => {
        try{
            const newPet: PetInterface = {
                id: crypto.randomUUID(),
                name: "New Pet",
                breed: "Unknown",
                imgurl: "https://static.boredpanda.com/blog/wp-content/uploads/2015/07/smiling-cat-2__605.jpg",
                sold: false
            };

            const result = await axios.post("https://api-divine-grass-2111.fly.dev/pets", newPet);
            setPets([...pets, result.data]);
            navigate(`/pet/${result.data.id}`);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="p-4">
            <img src={pet.imgurl} alt={pet.name} className="w-64 h-64 object-cover" />
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p>{pet.breed}</p>
            <p>Status: {pet.sold ? "Sold" : "Available"}</p>
            <button className="btn btn-secondary m-2" onClick={toggleSold}>
                Toggle Sold
            </button>
            <button className="btn btn-error m-2" onClick={deletePet}>
                Delete Pet
            </button>
            <button className="btn btn-success m-2" onClick={createPet}>
                Create Pet
            </button>
        </div>
    );
}
