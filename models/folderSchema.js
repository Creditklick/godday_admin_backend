const mongoose = require('mongoose');

// Folder Schema
const folderSchema = new mongoose.Schema(
    {
        foldername: {
            type: String,
            unique: true, // Ensure each foldername is unique
            required: [true, "Folder name is required"],
        },
        folderpassword: {
            type: String,
            required: [true, "Folder password is required"],
        },
        creator: {
            name: {
                type: String,
                default: "User", // Default value when no name is provided
            },
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = { Folder } ;
