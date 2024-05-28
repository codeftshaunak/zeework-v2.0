import { createContext, useEffect, useState } from "react";

// Function to create and configure a socket
const createSocket = (userId) => {
  const newSocket = io(socketURL, {
    autoConnect: true,
  });

  newSocket.on("connect", () => {
    newSocket.emit("connect_user", { user_id: userId });
  });

  return newSocket;
};

// Function to get cookie by name
function getCookie(name) {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
}

let userId = null;
const userCookie = getCookie("zeework_user");
const SocketContext = createContext();


if (userCookie && userCookie !== "undefined") {
  try {
    const parsedUser = JSON.parse(userCookie);
    userId = parsedUser.user_id;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userId) {
      const newSocket = createSocket(userId);
      setSocket(newSocket);

      // Cleanup function
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket
const useSocket = () => {
  const { socket } = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export { SocketProvider, useSocket, SocketContext, userId };