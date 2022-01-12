const teamsDatabase = {};

const cleanUpTeam = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = []
    }
}

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
}

const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const deletePokemonAt = (userId, index) => {
    if (teamsDatabase[userId][index]) {
        teamsDatabase[userId].splice(index, 1);
    }
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

exports.cleanUpTeam = cleanUpTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.deletePokemonAt = deletePokemonAt;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;