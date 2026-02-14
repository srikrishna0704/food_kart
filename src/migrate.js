import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, writeBatch } from "firebase/firestore";
import { restaurants } from "./data/restaurants";

export const migrateDataToFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        if (!querySnapshot.empty) {
            console.log("Data already exists in Firestore. Skipping migration.");
            return;
        }

        console.log("Migrating restaurants to Firestore...");
        const batch = writeBatch(db);

        restaurants.forEach((restaurant) => {
            const docRef = doc(collection(db, "restaurants"), restaurant.id.toString());
            batch.set(docRef, restaurant);
        });

        await batch.commit();
        console.log("Migration successful!");
    } catch (error) {
        console.error("Migration failed:", error);
    }
};
