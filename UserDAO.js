const User = require("./User");

class UserDAO {
    constructor() {
        this.users = [
            new User(1, "Quentin", "quentin@condorcet.be"),
            new User(2, "Nolwenn", "nolwenn@condorcet.be"),
            new User(3, "Ilyes", "ilyes@condorcet.be")
        ];
        this.currentId = this.users.length; // Initialisation du compteur d'ID
    }

    // Créer un nouvel utilisateur
    createUser({ name, email }) {
        // Incrémente automatiquement l'ID
        this.currentId += 1;
        const newUser = new User(this.currentId, name, email); // Crée un nouvel utilisateur
        this.users.push(newUser); // Ajoute l'utilisateur à la liste
        return newUser; // Retourne l'utilisateur créé
    }

    // Mettre à jour un utilisateur existant
    updateUser(userId, { name, email }) {
        // Cherche l'utilisateur par son ID
        const user = this.getUser(userId);

        if (user) {
            // Mise à jour des attributs de l'utilisateur
            user.name = name || user.name;
            user.email = email || user.email;
            return user; // Retourne l'utilisateur mis à jour
        }
        return null; // Si l'utilisateur n'est pas trouvé, retourne null
    }

    // Récupérer tous les utilisateurs
    getUsers() {
        return this.users;
    }

    // Récupérer un utilisateur par son ID
    getUser(userId) {
        return this.users.find(user => user.id === userId) || null;
    }

    // Supprimer un utilisateur par son ID
    deleteUser(userId) {
        const userIndex = this.users.findIndex(u => u.id === userId);

        if (userIndex !== -1) {
            this.users.splice(userIndex, 1); // Supprime l'utilisateur
            return true; // Retourne true si la suppression a réussi
        }
        return false; // Retourne false si l'utilisateur n'existe pas
    }
}

module.exports = UserDAO;
