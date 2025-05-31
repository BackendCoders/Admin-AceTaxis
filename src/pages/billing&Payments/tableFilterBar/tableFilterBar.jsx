import {
    Popover, MenuItem, Select, FormControl, InputLabel,
    TextField, Box, Button, IconButton
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import AddIcon from '@mui/icons-material/Add';
  import RemoveIcon from '@mui/icons-material/Remove';
  import { useEffect, useState } from 'react';
 
  const operators = ['contains', 'equals', 'starts with', 'ends with'];
  
  export default function TableFilterPopover({
    anchorEl,
    onClose,
    column,
    columns,
    filters,
    setFilters,
  }) {
    const open = Boolean(anchorEl);
  
    useEffect(() => {
        if (open && filters.length === 0) {
          setFilters([
            {
              column: column?.value || '',
              operator: 'contains',
              value: '',
            },
          ]);
        }
      }, [open, filters.length]);
  
    const handleChange = (index, field, value) => {
      const updatedFilters = [...filters];
      updatedFilters[index][field] = value;
      setFilters(updatedFilters);
    };
  
    const handleAddFilter = () => {
      setFilters((prev) => [
        ...prev,
        {
          column: column?.value || '',
          operator: 'contains',
          value: '',
        },
      ]);
    };
  
    const handleRemoveFilter = (index) => {
      const updated = filters.filter((_, i) => i !== index);
      setFilters(updated);
    };
  
    const handleClear = () => {
      setFilters([]);
    };
  
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        className='text-gray-400'
      >
        <Box sx={{ p: 2, minWidth: 600 }}>
          {filters.map((filter, index) => (
            <Box key={index} display="flex" gap={2} alignItems="center" mb={1}>
              <IconButton size="small" onClick={() => handleRemoveFilter(index)}>
                <CloseIcon fontSize="small" />
              </IconButton>
 
              <FormControl fullWidth>
                <InputLabel>Column</InputLabel>
                <Select
                  value={filter.column}
                  label="Column"
                  onChange={(e) => handleChange(index, 'column', e.target.value)}
                >
                  {columns.map((col) => (
                    <MenuItem key={col.value} value={col.value}>
                      {col.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <FormControl fullWidth>
                <InputLabel>Operator</InputLabel>
                <Select
                  value={filter.operator}
                  label="Operator"
                  onChange={(e) => handleChange(index, 'operator', e.target.value)}
                >
                  {operators.map((op) => (
                    <MenuItem key={op} value={op}>{op}</MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <TextField
                fullWidth
                label="Filter value"
                value={filter.value}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
              />
            </Box>
          ))}
  
          <Box display="flex" justifyContent="flex-start" gap={3} mt={2}>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddFilter}
              sx={{ textTransform: 'none', color: '#7E57C2', fontWeight: 500 }}
            >
              ADD FILTER
            </Button>
            <Button
              startIcon={<RemoveIcon />}
              onClick={handleClear}
              sx={{ textTransform: 'none', color: '#7E57C2', fontWeight: 500 }}
            >
              CLEAR
            </Button>
          </Box>
        </Box>
      </Popover>
    );
  }
  