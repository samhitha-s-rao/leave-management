import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    Button
} from "@mui/material";

import {
    getNotifications,
    markAsRead,
    markAllAsRead,
} from "../../services/notificationService";

import type { Notification } from "../../types/index";

const Notifications = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const loadNotifications = async () => {
        const data = await getNotifications();
        setNotifications(data);
    };

   useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        }
    };

    fetchNotifications();
}, []);

    const handleRead = async (id: number) => {
        await markAsRead(id);
        loadNotifications();
    };

    const handleReadAll = async () => {
        await markAllAsRead();
        loadNotifications();
    };

    return (
        <Stack spacing={2}>

            <Button
                variant="contained"
                onClick={handleReadAll}
            >
                Mark All As Read
            </Button>

            {notifications.map((notification) => (

                <Card
                    key={notification.notificationId}
                >
                    <CardContent>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >

                            <Typography
                                variant="h6"
                            >
                                {notification.title}
                            </Typography>

                            {!notification.isRead && (
                                <Chip
                                    color="error"
                                    label="New"
                                />
                            )}

                        </Stack>

                        <Typography
                            sx={{ mt: 1 }}
                        >
                            {notification.message}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {new Date(notification.createdAt)
                                .toLocaleString()}
                        </Typography>

                        {!notification.isRead && (

                            <Button
                                sx={{ mt: 2 }}
                                size="small"
                                onClick={() =>
                                    handleRead(notification.notificationId)}
                            >
                                Mark as Read
                            </Button>

                        )}

                    </CardContent>
                </Card>

            ))}

        </Stack>
    );
};

export default Notifications;