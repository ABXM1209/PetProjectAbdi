import type { PetInterface } from "./PetStore.tsx";
import { Link } from "react-router-dom";

export default function Pet({ pet }: { pet: PetInterface }) {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img src={pet.imgurl} alt={pet.name} />
            </figure>
            <div className="flex flex-col p-4">
                <h2 className="card-title">This is {pet.name}, a {pet.breed}</h2>
                <p>{pet.sold ? "Sold" : "Available"}</p>
                <div className="card-actions justify-end">
                    <Link to={`/pet/${pet.id}`} className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
