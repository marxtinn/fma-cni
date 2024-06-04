import React from "react";
import { Box } from "@chakra-ui/react";
import TableTemplate from "../global/TableTemplate";

const PatrolTableDashboard = () => {
  const columns = ["Employee", "Location", "Checkpoint", "Time", "Progress"]
  const data = [
    { Employee: "Muslikin", Location: "MPR", Checkpoint: "Lobby Lt. 1", Time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }), Progress: `Ongoing` },
    { Employee: "Muslikin", Location: "MPR", Checkpoint: "Lobby Lt. 1", Time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }), Progress: `Ongoing` },
    { Employee: "Muslikin", Location: "MPR", Checkpoint: "Lobby Lt. 1", Time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }), Progress: `Ongoing` }
  ]
  return (
    <Box>
      <TableTemplate columns={columns} data={data} />
    </Box>
  )
}

export default PatrolTableDashboard;