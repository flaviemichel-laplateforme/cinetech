import './MentionsLegales.css';

function MentionsLegales() {
    return (
        <div className="legal-page">
            <h1>Mentions Légales</h1>

            <section>
                <h2>Éditeur du site</h2>
                <p>
                    <strong>Nom :</strong> CineTech<br />
                    <strong>Responsable :</strong> Flavie Michel<br />
                    <strong>Email :</strong> contact@cinetech.fr<br />
                    <strong>Statut :</strong> Projet étudiant / Portfolio
                </p>
            </section>

            <section>
                <h2>Hébergement</h2>
                <p>
                    <strong>Ce site est hébergé par :</strong> Vercel Inc.<br />
                    <strong>Siège social :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                    <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
                </p>
            </section>

            <section>
                <h2>Utilisation de l'API TMDB</h2>
                <p>
                    Ce site utilise l'API de <strong>The Movie Database (TMDB)</strong> pour afficher
                    les informations sur les films et séries (titres, affiches, synopsis, notes, etc.).
                </p>
                <p>
                    <strong>Important :</strong> Ce produit utilise l'API TMDB mais n'est pas approuvé
                    ou certifié par TMDB.
                </p>
                <p>
                    Les données et images affichées sont la propriété de leurs détenteurs respectifs
                    et sont utilisées uniquement à des fins d'information et d'illustration.
                </p>
                <div className="tmdb-attribution">
                    <p>Données fournies par :</p>
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                            alt="TMDB Logo"
                            className="tmdb-logo"
                        />
                    </a>
                </div>
            </section>

            <section>
                <h2>Propriété intellectuelle</h2>
                <p>
                    Le code source de CineTech est open source et disponible sur
                    <a href="https://github.com/flaviemichel-laplateforme/cinetech" target="_blank" rel="noopener noreferrer">
                        {' '}GitHub
                    </a> sous licence MIT.
                </p>
                <p>
                    Vous êtes libre d'utiliser, modifier et distribuer ce code sous réserve
                    de respecter les termes de la licence MIT.
                </p>
                <p>
                    Les contenus (affiches, résumés, bandes-annonces, etc.) proviennent de TMDB
                    et sont soumis à leurs conditions d'utilisation respectives.
                </p>
            </section>

            <section>
                <h2>Contact</h2>
                <p>
                    Pour toute question concernant ce site, vous pouvez nous contacter à :
                </p>
                <p>
                    <strong>Email :</strong> <a href="mailto:contact@cinetech.fr">contact@cinetech.fr</a><br />
                    <strong>GitHub :</strong> <a href="https://github.com/flaviemichel-laplateforme" target="_blank" rel="noopener noreferrer">flaviemichel-laplateforme</a>
                </p>
            </section>

            <section>
                <h2>Limitation de responsabilité</h2>
                <p>
                    CineTech est un projet étudiant créé à des fins éducatives et de démonstration.
                    Les informations présentées proviennent de sources externes (TMDB) et nous ne
                    garantissons pas leur exactitude ou leur mise à jour.
                </p>
                <p>
                    Ce site ne propose pas de service de streaming vidéo. Il s'agit uniquement
                    d'une plateforme d'information et de découverte de contenus audiovisuels.
                </p>
            </section>
        </div>
    );
}

export default MentionsLegales;
