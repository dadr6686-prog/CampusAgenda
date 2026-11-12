import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';




const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },

  { id: 'E02', titre: 'Conference IA', categorie: 'Conference', capacite: 70, inscrits: 52 },

  { id: 'E03', titre: 'Securite mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },

  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },

  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },

  { id: 'E06', titre: 'Decouverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];



type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};




function placesRestantes(e: Evenement): number {

  const places = e.capacite - e.inscrits;

  if (places < 0) {
    return 0;
  } else {
    return places;
  }
}




type Statut = "Complet" | "Presque complet" | "Ouvert";

function statutEvenement(e: Evenement): Statut {

  const r = placesRestantes(e);

  return (
    r === 0
      ? "Complet"
      : r <= 3
        ? "Presque complet"
        : "Ouvert"
  );
}



const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const evenementsAvecPlaces = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

// 

const ateliersDisponibles = evenements.filter(
  (e) => e.categorie === "Atelier" && placesRestantes(e) > 0
);




type BadgeEtatProps = {
  statut: Statut;
};

function BadgeEtat({ statut }: BadgeEtatProps) {

  let couleur = "#DCE6F5";

  if (statut === "Complet") {
    couleur = "#DCE6F5";
  } else if (statut === "Presque complet") {
    couleur = "#FFE0B2";
  } else {
    couleur = "#D1FAE5";
  }

  return (
    <View style={[styles.badge, { backgroundColor: couleur }]}>
      <Text style={styles.texteBadge}>{statut}</Text>
    </View>
  );
}




type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {

  return (
    <View style={styles.carte}>

      <Text style={styles.titreCarte}>
        {evenement.titre}
      </Text>

      <Text style={styles.categorie}>
        {evenement.categorie}
      </Text>

      <Text style={styles.places}>
        {placesRestantes(evenement)} places libres
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />

    </View>
  );
}




type BlocStatistiqueProps = {
  libelle: string;
  valeur: number;
};

function BlocStatistique({ libelle, valeur }: BlocStatistiqueProps) {

  return (
    <View style={styles.statistique}>

      <Text style={styles.nombreStat}>
        {valeur}
      </Text>

      <Text style={styles.texteStat}>
        {libelle}
      </Text>

    </View>
  );
}





const mode: "tous" | "ateliers" = "tous";

const evenementsAffiches =
  mode === "tous"
    ? evenements
    : ateliersDisponibles;




export default function App() {

  return (

    <View style={styles.container}>

      

      <View style={styles.header}>

        <Text style={styles.titrePrincipal}>
          CampusAgenda
        </Text>

      </View>

      <Text style={styles.sousTitre}>
        Événements du campus
      </Text>

      

      <View style={styles.ligne}>

        <BlocStatistique
          libelle="événements"
          valeur={totalEvenements}
        />

        <BlocStatistique
          libelle="places restantes"
          valeur={totalPlacesRestantes}
        />

      </View>

      <View style={styles.ligne}>

        <BlocStatistique
          libelle="événements complets"
          valeur={evenementsComplets}
        />

        <BlocStatistique
          libelle="événements disponibles"
          valeur={evenementsAvecPlaces}
        />

      </View>

      

      <Text style={styles.mode}>
        Liste des événements : {mode}
      </Text>

      <FlatList

        data={evenementsAffiches}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}

        ListEmptyComponent={
          <Text style={styles.messageVide}>
            Aucun événement disponible.
          </Text>
        }

      />

    </View>

  );
}

/



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 50,
  },

  header: {
    backgroundColor: "#003078",
    borderRadius: 30,
    padding: 12,
    alignItems: "center",
    marginTop: 5,
  },

  titrePrincipal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  sousTitre: {
    fontSize: 16,
    color: "#003078",
    textAlign: "center",
    marginVertical: 12,
  },

  ligne: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#E8F0FF",
    borderColor: "#C5D5F2",
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
  },

  statistique: {
    width: "48%",
    alignItems: "center",
    padding: 5,
  },

  nombreStat: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003078",
  },

  texteStat: {
    fontSize: 13,
    color: "#003078",
    textAlign: "center",
  },

  mode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003078",
    marginTop: 12,
    marginBottom: 10,
  },

  carte: {
    backgroundColor: "#F3F7FE",
    borderWidth: 1,
    borderColor: "#C5D5F2",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
  },

  titreCarte: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003078",
  },

  categorie: {
    fontSize: 14,
    color: "#555555",
    marginTop: 4,
  },

  places: {
    fontSize: 14,
    color: "#85af23",
    marginTop: 5,
    marginBottom: 5,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  },

  texteBadge: {
    color: "#003078",
    fontWeight: "bold",
  },

  messageVide: {
    textAlign: "center",
    color: "#2a5ca7",
    fontSize: 16,
    marginTop: 30,
  },

}); 
