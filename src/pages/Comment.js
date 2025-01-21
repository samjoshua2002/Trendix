import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MessageSquare, Send } from "lucide-react";
import { BASE_URL } from "../App";

const Comment = () => {
    const [userId, setUserId] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { id: productId } = useParams();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const email = localStorage.getItem("useremail");
                if (!email) {
                    throw new Error("User email not found in local storage.");
                }
                const { data: userId } = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
                setUserId(userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/review/getreview/${productId}`);
                setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchUserId();
        fetchComments();
    }, [productId, newComment]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/review/addreview/${userId}/${productId}`, {
                comment: newComment,
                date: new Date().toISOString() 
            });
            if (response.status === 200) {
                setComments([...comments, { userId, productId, comment: newComment, rating: 5 }]);
                setNewComment("");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="w-full max-w-7xl bg-gray-50 px-4 sm:px-8 md:px-16 lg:px-32 py-8">
        <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="w-6 h-6 text-[#E23378]" />
            <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>
        </div>
    
        <div className="mb-8">
            <div className="flex items-end gap-2">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows="3"
                    className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-[#E23378] focus:outline-none transition-colors duration-200 resize-none"
                />
                <button 
                    onClick={handleAddComment}
                    className="p-2 text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
                >
                    <Send className="w-6 h-6" />
                </button>
            </div>
        </div>
    
        <div className="space-y-6">
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className="group">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900">
                                        {comment.username || 'Anonymous'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {comment.date}
                                    </span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                        {index !== comments.length - 1 && (
                            <div className="mt-6 border-b border-gray-200" />
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No comments yet. Start the conversation!</p>
                </div>
            )}
        </div>
    </div>
    
    );
};

export default Comment;