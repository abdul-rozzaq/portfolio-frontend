"use client";

import { useEffect, useState } from "react";

interface MessageData {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt?: string;
}

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/admin/messages");
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string | undefined, currentStatus: boolean) => {
        if (!id || currentStatus) return;

        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isRead: true }),
            });

            if (res.ok) {
                setMessages(
                    messages.map((m) => (m._id === id ? { ...m, isRead: true } : m))
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id || !confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setMessages(messages.filter((m) => m._id !== id));
                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete message");
        }
    };

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
                {/* Messages List */}
                <div className="col-span-1 border border-white/5 bg-card rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
                    <div className="p-4 border-b border-white/5 bg-white/5 font-semibold">
                        Inbox ({messages.length})
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
                        {messages.length === 0 ? (
                            <div className="p-4 text-center text-muted">No messages found.</div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message._id as string}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        markAsRead(message._id as string, message.isRead);
                                    }}
                                    className={`p-4 rounded-lg cursor-pointer transition-colors border ${selectedMessage?._id === message._id
                                        ? "bg-brand-500/10 border-brand-500/30"
                                        : "bg-background border-transparent hover:bg-white/5"
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-medium ${!message.isRead ? "text-white" : "text-muted"}`}>
                                            {message.name}
                                        </h3>
                                        {!message.isRead && (
                                            <span className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0"></span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted truncate">{message.email}</p>
                                    <p className="text-sm text-foreground mt-2 line-clamp-2">
                                        {message.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Details */}
                <div className="col-span-1 md:col-span-2 border border-white/5 bg-card rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
                    {selectedMessage ? (
                        <>
                            <div className="p-6 border-b border-white/5 flex justify-between items-start bg-white/5">
                                <div>
                                    <h2 className="text-xl font-bold mb-1">{selectedMessage.name}</h2>
                                    <a href={`mailto:${selectedMessage.email}`} className="text-brand-400 hover:text-brand-300 text-sm">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedMessage._id as string)}
                                    className="text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded transition-colors text-sm"
                                >
                                    Delete Message
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                                <div className="bg-background rounded-lg p-6 border border-white/5 min-h-[200px] whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted">
                            Select a message to read
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
