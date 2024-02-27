import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useValue } from '../../../context/ContextProvider';

let timer

const AddDate = () => {
  const { state: { dateRange }, updateDateRange, dispatch } = useValue();

  const [picking, setPicking] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectionRange, setSelectionRange] = useState({
   // startDate: new Date(),
   // endDate: new Date(),
   startDate: dateRange[0], // retrieving the satrt date 
    endDate: dateRange[1], // retrieving the end date 
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    console.log(ranges.selection); // Log the selected range to the console
    updateDateRange([ranges.selection.startDate, ranges.selection.endDate]);
    dispatch({
      type: 'UPDATE_DATE_RANGE',
      payload: [ranges.selection.startDate, ranges.selection.endDate],
    });
    if (!picking) setPicking(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setPicking(false);
    }, 1000);
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <div>
        <DateRangePicker
          error={error}
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
      </div>
    </Stack>
  );
};

export default AddDate;
