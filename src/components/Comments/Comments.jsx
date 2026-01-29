import { useState, useEffect } from 'react';
import './Comments.css';

const Comments = ({ movieId, type, apiReviews }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [localComments, setLocalComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);

    const storageKey = `comments_${type}_${movieId}`;

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        setLocalComments(saved);
    }, [storageKey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return alert("Connectez-vous pour commenter !");
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            author: user.name,
            content: newComment,
            date: new Date().toLocaleDateString(),
            replies: []
        };

        const updated = [comment, ...localComments];
        setLocalComments(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setNewComment("");
    };

    const handleReply = (parentId) => {
        if (!user) return alert("Connectez-vous pour répondre !");
        if (!replyText.trim()) return;

        const reply = {
            id: Date.now(),
            author: user.name,
            content: replyText,
            date: new Date().toLocaleDateString()
        };

        const updatedComments = localComments.map(comment => {
            if (comment.id === parentId) {
                return { ...comment, replies: [...(comment.replies || []), reply] };
            }
            return comment;
        });

        setLocalComments(updatedComments);
        localStorage.setItem(storageKey, JSON.stringify(updatedComments));
        setReplyText("");
        setActiveReplyId(null);
    };

    return (
        <div className="comments-section">
            <h3>Discussions ({apiReviews.length + localComments.length})</h3>

            {user ? (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Donnez votre avis sur ce titre..."
                    />
                    <button type="submit" className="btn-send">Publier</button>
                </form>
            ) : (
                <div className="login-alert">
                    🔒 <span style={{ textDecoration: 'underline' }}>Connectez-vous</span> pour participer à la discussion.
                </div>
            )}

            <div className="comments-list">
                {localComments.map(comment => (
                    <div key={comment.id} className="comment-card local">
                        <div className="comment-header">
                            <span className="author">{comment.author}</span>
                            <span className="date">{comment.date}</span>
                            <span className="badge">Communauté</span>
                        </div>
                        <p className="content">{comment.content}</p>

                        {/* Réponses */}
                        {comment.replies && comment.replies.map(rep => (
                            <div key={rep.id} className="reply-card">
                                <strong>{rep.author}</strong> : {rep.content}
                            </div>
                        ))}

                        {/* Bouton Répondre */}
                        {user && (
                            <button className="btn-reply" onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}>
                                {activeReplyId === comment.id ? "Annuler" : "Répondre"}
                            </button>
                        )}

                        {/* Champ Réponse */}
                        {activeReplyId === comment.id && (
                            <div className="reply-input">
                                <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Votre réponse..." />
                                <button onClick={() => handleReply(comment.id)}>Envoyer</button>
                            </div>
                        )}
                    </div>
                ))}

                {/* 2. Commentaires API (TMDB) */}
                {apiReviews.map(review => (
                    <div key={review.id} className="comment-card api">
                        <div className="comment-header">
                            <span className="author">{review.author}</span>
                            <span className="badge api-badge">TMDB</span>
                        </div>
                        <p className="content">
                            {review.content.length > 300 ? review.content.substring(0, 300) + "..." : review.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;