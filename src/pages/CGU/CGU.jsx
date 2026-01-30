import '../MentionsLegales/MentionsLegales.css';

function CGU() {
    return (
        <div className="legal-page">
            <h1>Conditions Générales d'Utilisation</h1>

            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
                En vigueur au {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section>
                <h2>Article 1 - Objet</h2>
                <p>
                    Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir
                    les modalités et conditions d'utilisation du site web CineTech, ainsi que les droits
                    et obligations des utilisateurs.
                </p>
                <p>
                    <strong>CineTech</strong> est une plateforme web de découverte et d'information
                    sur les films et séries télévisées. Il s'agit d'un projet étudiant à but éducatif
                    et non commercial.
                </p>
            </section>

            <section>
                <h2>Article 2 - Accès au site</h2>
                <p>
                    L'accès au site CineTech est gratuit et libre pour tout utilisateur disposant
                    d'un accès à Internet.
                </p>
                <p>
                    Tous les coûts afférents à l'accès au site (matériel informatique, logiciels,
                    connexion Internet, etc.) sont à la charge exclusive de l'utilisateur.
                </p>
                <p>
                    L'éditeur se réserve le droit de modifier, suspendre ou interrompre l'accès au site
                    à tout moment et sans préavis pour des raisons de maintenance ou d'amélioration.
                </p>
            </section>

            <section>
                <h2>Article 3 - Services proposés</h2>
                <p>
                    CineTech propose les services suivants :
                </p>
                <ul>
                    <li>Consultation d'informations sur les films et séries (synopsis, notes, casting, etc.)</li>
                    <li>Recherche de contenus audiovisuels</li>
                    <li>Gestion d'une liste de favoris (stockée localement)</li>
                    <li>Ajout de commentaires personnels (stockés localement)</li>
                    <li>Visionnage de bandes-annonces via YouTube</li>
                </ul>
                <p>
                    <strong>Important :</strong> CineTech ne propose PAS de service de streaming vidéo.
                    Il s'agit uniquement d'une plateforme d'information et de découverte.
                </p>
            </section>

            <section>
                <h2>Article 4 - Utilisation des données TMDB</h2>
                <p>
                    Les informations affichées sur CineTech (affiches, titres, synopsis, notes, etc.)
                    proviennent de l'API de <strong>The Movie Database (TMDB)</strong>.
                </p>
                <p>
                    En utilisant CineTech, vous reconnaissez et acceptez que :
                </p>
                <ul>
                    <li>Les données appartiennent à TMDB et à leurs propriétaires respectifs</li>
                    <li>CineTech n'est pas responsable de l'exactitude ou de la mise à jour de ces données</li>
                    <li>L'utilisation des données TMDB est soumise aux
                        <a href="https://www.themoviedb.org/terms-of-use" target="_blank" rel="noopener noreferrer">
                            {' '}conditions d'utilisation de TMDB
                        </a>
                    </li>
                </ul>
                <p className="tmdb-disclaimer">
                    Ce produit utilise l'API TMDB mais n'est pas approuvé ou certifié par TMDB.
                </p>
            </section>

            <section>
                <h2>Article 5 - Propriété intellectuelle</h2>
                <p>
                    Le code source de CineTech est open source et disponible sous licence MIT sur GitHub.
                </p>
                <p>
                    Cependant, les contenus suivants sont protégés par le droit d'auteur et appartiennent
                    à leurs propriétaires respectifs :
                </p>
                <ul>
                    <li>Affiches de films et séries</li>
                    <li>Titres et logos</li>
                    <li>Synopsis et descriptions</li>
                    <li>Bandes-annonces et vidéos</li>
                </ul>
                <p>
                    Toute reproduction, représentation, modification ou exploitation commerciale
                    de ces contenus sans autorisation préalable est interdite.
                </p>
            </section>

            <section>
                <h2>Article 6 - Responsabilité de l'utilisateur</h2>
                <p>
                    L'utilisateur s'engage à :
                </p>
                <ul>
                    <li>Utiliser le site de manière conforme à sa destination</li>
                    <li>Ne pas publier de commentaires offensants, diffamatoires ou contraires à la loi</li>
                    <li>Ne pas tenter de contourner les mesures de sécurité du site</li>
                    <li>Ne pas utiliser le site à des fins commerciales sans autorisation</li>
                    <li>Respecter les droits de propriété intellectuelle des tiers</li>
                </ul>
                <p>
                    Tout manquement à ces obligations peut entraîner la suppression de vos contenus
                    (commentaires) et le blocage de votre accès au site.
                </p>
            </section>

            <section>
                <h2>Article 7 - Limitation de responsabilité</h2>
                <p>
                    L'éditeur de CineTech ne pourra être tenu responsable :
                </p>
                <ul>
                    <li>Des interruptions ou dysfonctionnements du site</li>
                    <li>De l'exactitude, de la complétude ou de la mise à jour des informations affichées</li>
                    <li>Des dommages résultant de l'utilisation ou de l'impossibilité d'utiliser le site</li>
                    <li>Des bugs, virus ou autres éléments nuisibles</li>
                    <li>De la perte de données stockées localement (favoris, commentaires)</li>
                </ul>
                <p>
                    L'utilisateur est seul responsable de l'utilisation qu'il fait du site et des
                    conséquences qui en découlent.
                </p>
            </section>

            <section>
                <h2>Article 8 - Données personnelles</h2>
                <p>
                    CineTech ne collecte, ne stocke et ne traite AUCUNE donnée personnelle sur ses serveurs.
                </p>
                <p>
                    Les données (favoris, commentaires) sont stockées localement sur votre appareil
                    via le localStorage de votre navigateur.
                </p>
                <p>
                    Pour plus d'informations, consultez notre
                    <a href="/politique-confidentialite"> Politique de Confidentialité</a>.
                </p>
            </section>

            <section>
                <h2>Article 9 - Liens hypertextes</h2>
                <p>
                    CineTech contient des liens vers des sites tiers (TMDB, YouTube, GitHub, etc.).
                </p>
                <p>
                    L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité
                    quant à leur contenu, leur disponibilité ou leurs pratiques en matière de confidentialité.
                </p>
                <p>
                    L'accès à ces sites se fait sous votre entière responsabilité.
                </p>
            </section>

            <section>
                <h2>Article 10 - Modification des CGU</h2>
                <p>
                    L'éditeur se réserve le droit de modifier les présentes CGU à tout moment.
                </p>
                <p>
                    Les modifications entrent en vigueur dès leur publication sur cette page.
                </p>
                <p>
                    Il est conseillé de consulter régulièrement cette page pour prendre connaissance
                    des éventuelles modifications.
                </p>
            </section>

            <section>
                <h2>Article 11 - Droit applicable</h2>
                <p>
                    Les présentes CGU sont régies par le droit français.
                </p>
                <p>
                    Tout litige relatif à l'utilisation du site CineTech sera soumis à la compétence
                    exclusive des tribunaux français.
                </p>
            </section>

            <section>
                <h2>Article 12 - Contact</h2>
                <p>
                    Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter :
                </p>
                <p>
                    <strong>Email :</strong> <a href="mailto:contact@cinetech.fr">contact@cinetech.fr</a><br />
                    <strong>GitHub :</strong> <a href="https://github.com/flaviemichel-laplateforme/cinetech" target="_blank" rel="noopener noreferrer">
                        flaviemichel-laplateforme/cinetech
                    </a>
                </p>
            </section>

            <p style={{ marginTop: '50px', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
                En utilisant CineTech, vous acceptez les présentes Conditions Générales d'Utilisation.
            </p>
        </div>
    );
}

export default CGU;
