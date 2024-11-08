const express = require("express");
const app = express();
const PORT = 3000;

// Importer la classe UserDAO
const UserDAO = require("./UserDAO");

// Instancier le UserDAO
const userDAO = new UserDAO();

// Ajouter le middleware pour interpréter le JSON envoyé dans le corps de la requête
app.use(express.json());

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

// Route pour gérer la requête GET sur /api/users
app.get("/api/users", (req, res) => {
    res.json(userDAO.getUsers());
});

// Route dynamique pour récupérer un utilisateur par son ID
app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userDAO.getUser(userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé. 😅" });
    }
});

// Créer un nouvel utilisateur (avec la logique dans le DAO)
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    // Appel au DAO pour créer un nouvel utilisateur
    const newUser = userDAO.createUser({ name, email });
    res.status(201).json(newUser);
});

// Modifier un utilisateur (mise à jour dans le DAO)
app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    // Appel au DAO pour mettre à jour un utilisateur
    const updatedUser = userDAO.updateUser(userId, { name, email });

    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé. 😔" });
    }
});

// Supprimer un utilisateur
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const success = userDAO.deleteUser(userId);

    if (success) {
        res.json({ message: "Utilisateur supprimé avec succès ! 😎" });
    } else {
        res.status(404).json({ error: "Utilisateur non trouvé. 😔" });
    }
});
