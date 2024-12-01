import React, { useEffect } from "react";

const ENDPOINT = "https://cinema-backend-32dr.onrender.com";
function PingServer() {
  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch(`${ENDPOINT}/ping`, {
          method: "GET",
        });

        if (response.ok) {
          console.log(
            "Backend woken up successfully! Response:",
            await response.text()
          );
        } else {
          console.error(
            "Failed to wake up backend. Status:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error waking up backend:", error);
      }
    };

    pingBackend();
  }, []);

  return <div></div>;
}

export default PingServer;
