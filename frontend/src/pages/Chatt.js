import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chatt.css"; // Import updated CSS

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [sellerText, setSellerText] = useState("");
    const [customerText, setCustomerText] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [customerIds, setCustomerIds] = useState([]);
    const chatBoxRef = useRef(null); // Reference for auto-scroll

    const API_URL = "http://localhost:5001/api/chats";
    const REVIEW_API_URL = "http://localhost:5001/api/reviews/generate";

    useEffect(() => {
        fetchCustomerIds();
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            fetchMessages();
        }
    }, [selectedCustomer]);

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when messages update
    }, [messages]);

    const fetchCustomerIds = async () => {
        try {
            const response = await axios.get(API_URL);
            setCustomerIds(response.data.customerIds || []);
        } catch (error) {
            console.error("Error fetching customer IDs:", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/${selectedCustomer}`);
            setMessages(response.data || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async (senderType) => {
        const text = senderType === "seller" ? sellerText : customerText;
        if (!text.trim() || !selectedCustomer) return;

        const newMessage = { customerId: selectedCustomer, sender: senderType, text };

        try {
            const response = await axios.post(API_URL, newMessage, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                const newMsg = {
                    _id: response.data.messages[response.data.messages.length - 1]._id,
                    sender: senderType,
                    text,
                    timestamp: new Date().toISOString(),
                };

                setMessages((prevMessages) => [...prevMessages, newMsg]);
                senderType === "seller" ? setSellerText("") : setCustomerText("");
                generateReview(selectedCustomer);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const generateReview = async (customerId) => {
        try {
            await axios.post(REVIEW_API_URL, { customer_id: customerId }, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Error generating review:", error);
        }
    };

    // Auto-scroll to the bottom when new messages appear
    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat with Seller</h2>

            {/* Chat History */}
            <div className="chat-box" ref={chatBoxRef}>
                {messages.length === 0 ? (
                    <div className="empty-chat">
                        <img src="chat2.webp" alt="Chat Background" className="chat-image" />
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className={`chat-message ${msg.sender}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Chat Input Fields */}
            <div className="input-container">
                {/* Customer Input Section */}
                <div className="input-field customer-container">
                    <h5 className="text-center">Customer</h5>
                    <div className="mb-3">
                        <label className="form-label">Select Customer:</label>
                        <select className="form-select" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                            <option value="">Select a customer</option>
                            {customerIds.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control customer-input"
                            placeholder="Customer message..."
                            value={customerText}
                            onChange={(e) => setCustomerText(e.target.value)}
                        />
                        <button className="btn btn-secondary" onClick={() => sendMessage("customer")}>
                            Send
                        </button>
                    </div>
                </div>

                {/* Seller Input Section */}
                <div className="input-field seller-container">
                    <h5 className="text-center">Seller</h5>
                    <div className="input-group">
                        <textarea
                            className="form-control seller-input"
                            placeholder="Seller message..."
                            value={sellerText}
                            onChange={(e) => setSellerText(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => sendMessage("seller")}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
