import React from 'react'
import { Box } from "@chakra-ui/react";
import TableTemplate from "../global/TableTemplate";

export const ReportTableDashboard = () => {
  const columns = ["Route", "Start", "End", "Category", "PIC"]
  const data = [
    {
      Route: "Patrol Route MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Security",
      PIC: "Muslikin",
    },
    {
      Route: "Patrol Route MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Security",
      PIC: "Muslikin",
    },
    {
      Route: "Lobby Area 1st Floor MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Cleaning",
      PIC: "Budi",
    },
    {
      Route: "Lobby Area 1st Floor MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Cleaning",
      PIC: "Budi",
    },
    {
      Route: "Patrol Route MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Security",
      PIC: "Muslikin",
    },
    {
      Route: "Patrol Route MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Security",
      PIC: "Muslikin",
    },
    {
      Route: "Lobby Area 1st Floor MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Cleaning",
      PIC: "Budi",
    },
    {
      Route: "Lobby Area 1st Floor MPR",
      Start: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      End: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false }),
      Category: "Cleaning",
      PIC: "Budi",
    },
  ]
  return (
    <Box>
      <TableTemplate columns={columns} data={data} />
    </Box>
  )
}

