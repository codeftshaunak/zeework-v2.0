import { useContext, useEffect } from "react";
import { SocketContext } from "../Contexts/SocketContext.jsx";

const useNotificationListener = (
  onNotification,
  dependencies = [],
  condition = true
) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket && condition) {
      socket.on("received_notification", onNotification);

      return () => {
        socket.off("received_notification", onNotification);
      };
    }
  }, [socket, ...dependencies, condition]);
};

export default useNotificationListener;
