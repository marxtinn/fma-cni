import React from "react";
import { Box } from "@chakra-ui/react";
import TableTemplate from "../global/TableTemplate";
const CleaningTableDashboard = () => {
  const columns = ["Employee", "Location", "Checkpoint", "Time", "Progress"]
  const data = [
    { Employee: "Koko", Location: "MPR", Checkpoint: "Lobby Lt. 7", Time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }), Progress: "Done" },
    { Employee: "Koko", Location: "MPR", Checkpoint: "Lobby Lt. 7", Time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }), Progress: "Done" },
    { Employee: "Koko", Location: "MPR", Checkpoint: "Lobby Lt. 7", Time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }), Progress: "Done" }
  ]
  return (
    <Box>
      <TableTemplate columns={columns} data={data} />
    </Box>
  )
}

export default CleaningTableDashboard;