import React from 'react';

function CharacterCard({character}){

    const statusColorMap = {
        alive: "text-green-500 border-green-500",
        dead: "text-red-500 border-red-500",
        unknown: "text-gray-400 border-gray-400",
    }

    const genderColorMap={
        male: "text-blue-500",
        female: "text-pink-500",
    }

    const statusColor = statusColorMap[character.status.toLowerCase()]
    const genderColor = genderColorMap[character.gender.toLowerCase()]

    return (
        <div className="border px-3 py-2 rounded-lg border-gray-300 cursor-pointer">
            <div className="flex justify-between">
                <h2 className="text-2xl">{character.name} <span className="font-semibold text-lg italic">({character.species})</span></h2>
                <p className={`font-semibold border ${statusColor} inline px-2 rounded-lg text-center`}>{character.status}</p>
            </div>
            <div>
                <p className="text-xl font-semibold">Origin: <span className="text-lg font-normal">{character.origin.name}</span></p>
                <p className="text-xl font-semibold">Gender: <span className={`text-lg font-normal ${genderColor}`}>{character.gender}</span></p>
            </div>
        </div>
    );
}



export default CharacterCard

