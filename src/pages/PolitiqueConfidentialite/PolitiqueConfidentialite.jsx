import '../MentionsLegales/MentionsLegales.css';

function PolitiqueConfidentialite() {
    return (
        <div className="legal-page">
            <h1>Politique de Confidentialité</h1>

            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section>
                <h2>Introduction</h2>
                <p>
                    CineTech respecte votre vie privée et s'engage à protéger vos données personnelles.
                    Cette politique de confidentialité vous informe sur la manière dont nous collectons,
                    utilisons et protégeons vos informations lorsque vous utilisez notre site.
                </p>
            </section>

            <section>
                <h2>Données collectées</h2>
                <p>
                    CineTech collecte et stocke les données suivantes <strong>localement sur votre appareil</strong>
                    (dans le localStorage de votre navigateur) :
                </p>
                <ul>
                    <li><strong>Films et séries favoris :</strong> Les contenus que vous ajoutez à votre liste de favoris</li>
                    <li><strong>Commentaires :</strong> Les avis que vous rédigez sur les films et séries</li>
                    <li><strong>Préférences :</strong> Vos choix de navigation et paramètres d'affichage</li>
                </ul>
                <p>
                    <strong>Important :</strong> Ces données sont stockées uniquement sur votre appareil.
                    Nous ne collectons, ne stockons et ne transmettons AUCUNE donnée personnelle sur nos serveurs.
                </p>
            </section>

            <section>
                <h2>Utilisation des données</h2>
                <p>
                    Les données stockées localement sont utilisées exclusivement pour :
                </p>
                <ul>
                    <li>Sauvegarder vos films et séries favoris</li>
                    <li>Conserver vos commentaires personnels</li>
                    <li>Améliorer votre expérience utilisateur en mémorisant vos préférences</li>
                </ul>
                <p>
                    Ces données ne sont jamais partagées avec des tiers et ne quittent jamais votre navigateur.
                </p>
            </section>

            <section>
                <h2>Données de navigation</h2>
                <p>
                    Lors de votre utilisation du site, des requêtes sont automatiquement envoyées à :
                </p>
                <ul>
                    <li>
                        <strong>API TMDB (The Movie Database) :</strong> Pour récupérer les informations
                        sur les films et séries (titres, affiches, synopsis, etc.).
                        Consultez la <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">
                            politique de confidentialité de TMDB</a>.
                    </li>
                    <li>
                        <strong>YouTube :</strong> Pour afficher les bandes-annonces.
                        Consultez la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            politique de confidentialité de Google</a>.
                    </li>
                </ul>
            </section>

            <section>
                <h2>Vos droits (RGPD)</h2>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul>
                    <li><strong>Droit d'accès :</strong> Vous pouvez consulter vos données à tout moment
                        via les outils de développement de votre navigateur (localStorage)</li>
                    <li><strong>Droit de rectification :</strong> Vous pouvez modifier vos favoris et commentaires directement sur le site</li>
                    <li><strong>Droit à l'effacement :</strong> Vous pouvez supprimer vos données en :
                        <ul>
                            <li>Retirant des films de vos favoris</li>
                            <li>Supprimant vos commentaires</li>
                            <li>Effaçant les données de navigation de votre navigateur</li>
                        </ul>
                    </li>
                </ul>
                <p>
                    Pour exercer ces droits ou pour toute question, contactez-nous à :
                    <a href="mailto:contact@cinetech.fr"> contact@cinetech.fr</a>
                </p>
            </section>

            <section>
                <h2>Cookies</h2>
                <p>
                    CineTech <strong>n'utilise pas de cookies tiers</strong> à des fins de tracking ou de publicité.
                </p>
                <p>
                    Seul le <strong>localStorage</strong> de votre navigateur est utilisé pour sauvegarder
                    vos préférences localement. Vous pouvez le désactiver ou le vider à tout moment
                    via les paramètres de votre navigateur.
                </p>
            </section>

            <section>
                <h2>Sécurité des données</h2>
                <p>
                    Bien que nous ne collections pas vos données sur nos serveurs, nous vous recommandons de :
                </p>
                <ul>
                    <li>Utiliser un navigateur à jour avec les dernières mises à jour de sécurité</li>
                    <li>Ne pas partager d'informations sensibles dans vos commentaires</li>
                    <li>Effacer régulièrement vos données de navigation si vous utilisez un appareil partagé</li>
                </ul>
            </section>

            <section>
                <h2>Services tiers</h2>
                <p>
                    CineTech utilise les services suivants :
                </p>
                <ul>
                    <li>
                        <strong>TMDB API :</strong> Fournisseur de données sur les films et séries
                        (<a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">
                            Politique de confidentialité</a>)
                    </li>
                    <li>
                        <strong>YouTube :</strong> Hébergement et lecture des bandes-annonces
                        (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            Politique de confidentialité</a>)
                    </li>
                </ul>
                <p>
                    Ces services ont leurs propres politiques de confidentialité et peuvent collecter
                    des données lors de votre interaction avec leurs contenus.
                </p>
            </section>

            <section>
                <h2>Modifications de cette politique</h2>
                <p>
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                    Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
                </p>
                <p>
                    Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques.
                </p>
            </section>

            <section>
                <h2>Contact</h2>
                <p>
                    Pour toute question concernant cette politique de confidentialité ou vos données personnelles,
                    vous pouvez nous contacter :
                </p>
                <p>
                    <strong>Email :</strong> <a href="mailto:contact@cinetech.fr">contact@cinetech.fr</a><br />
                    <strong>GitHub :</strong> <a href="https://github.com/flaviemichel-laplateforme/cinetech" target="_blank" rel="noopener noreferrer">
                        flaviemichel-laplateforme/cinetech
                    </a>
                </p>
            </section>
        </div>
    );
}

export default PolitiqueConfidentialite;
