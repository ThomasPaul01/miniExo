import { MongoClient } from "mongodb";

// Le plus simple possible: se connecter, lister les collections de "Cinema",
// et afficher les clés du premier document de chaque collection.
const uri = process.env.MONGODB_URI ||
	"mongodb+srv://thomaspaul7794_db_user:cmMt6X6lzgpss2zI@cluster0.jw8mwhh.mongodb.net/?appName=Cluster0";

async function main() {
	const client = new MongoClient(uri);
	try {
		await client.connect();
		const db = client.db("Cinema");
		console.log("Connecté à MongoDB. Base: Cinema");

		const collections = await db.listCollections({}, { nameOnly: true }).toArray();
		if (!collections.length) {
			console.log("Aucune collection trouvée.");
			return;
		}

		for (const { name } of collections) {
			console.log(`\nCollection: ${name}`);
			const doc = await db.collection(name).findOne();
			if (!doc) {
				console.log("  (aucun document)");
				continue;
			}
			const keys = Object.keys(doc);
			console.log("  Clés du 1er document:", keys.join(", "));
			// Optionnel: afficher un aperçu des types (niveau 1, très simple)
			for (const k of keys) {
				const v: any = (doc as any)[k];
				const t = Array.isArray(v) ? "array" : (v instanceof Date ? "date" : typeof v);
				console.log(`    ${k}: ${t}`);
			}
		}
	} finally {
		await client.close();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

