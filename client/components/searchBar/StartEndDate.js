import React from 'react';
import {
  TextField,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StartEndDate = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
      <FormControl className="form-control" sx={{ m: "1em" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl className="form-control" sx={{ m: "1em" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  )
}

export default StartEndDate