'use client';
import * as React from 'react';

import { getVehicles, deleteVehicle, editVehicle } from '@/utils/parse';
import  { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody, 
    Typography,
    TableHead, 
    Box, 
    Button,
    Divider,
    IconButton,
    TextField,
    Select
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
  
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper
} from '@tanstack/react-table'
 

const columnHelper = createColumnHelper();

const columns = [
 
    columnHelper.accessor('plateNumber', {
        header: () => 'Plate Number',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),

    columnHelper.accessor('model', {
        header: () => 'Model',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),

    columnHelper.accessor('serial', {
        header: () => 'Serial',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),

    columnHelper.accessor('brand', {
      header: () => 'Brand',
      cell: info => (
          <Typography variant="subtitle1" color="textSecondary">
              {info.getValue()}
          </Typography>
      ),
    }),

    columnHelper.accessor('defaultVendor', {
      header: () => 'Vendor',
      cell: info => (
          <Typography variant="subtitle1" color="textSecondary">
              {info.getValue()}
          </Typography>
      ),
    }),

    
    columnHelper.accessor('edit', {
        header: () => 'Edit',
        meta: {
            filterVariant: 'select',
        },
        cell: ({ row }) => (
            <Button
                onClick={() => row.getToggleExpandedHandler()}
            >
                <EditIcon />
            </Button>
        ),
    }),

  
];


function Filter({ column }) {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta || {};

    return filterVariant === 'select' ? (
        ''
    ) : (
        <DebouncedInput
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search...`}
            type="text"
            value={columnFilterValue || ''}
        />
        // See faceted column filters example for datalist search suggestions
    );
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return (
        <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
    );
}



const GetVehicles = () => {

    const { data: session } = useSession();
    const [data, _setData] = React.useState(() => []);
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [editRowId, setEditRowId] = React.useState(null);
    const [editedData, setEditedData] = React.useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 
    
    useEffect(() => {
      
        const fetchVehicles = async () => {
          try {
            if (session) {
              const token = session.accessToken;
              const response = await getVehicles(token);
              _setData(response.result);

            } else {
              alert('No se ha encontrado una sesión activa.');
            }
          } catch (error) { 

          } finally {
            setLoading(false);
          }
        };
    
        fetchVehicles();
      }, [session]);


    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    //edit 
    const handleEdit =  (row) => { 

        setEditRowId(row.objectId);
        setEditedData({ ...row });

    };

    const handleSave = async () => {

        if (editedData) {
            _setData(
                data.map((item) => (item.objectId === editedData.objectId ? editedData : item))
            );

            try {

                if (session) {

                    const token = session.accessToken;
                    const dataToSend = {
                        id: editedData.objectId,
                        plateNumber: editedData.plateNumber,
                        model: editedData.model,
                        year: editedData.year,
                        serial: editedData.serial,
                        status: editedData.status,
                        brand: editedData.brand,
                        defaultVendor: editedData.defaultVendor,
                    };

                    const response = await editVehicle(dataToSend, token);
                    setError('Editing vehicle successfully.', response.result.message);           
                } 

            } catch (error) {
                setError('Error editing vehicle. Please try again.', error.message); 
            }

            setEditRowId(null);
            setEditedData(null);
        }

    };


    const handleDelete = async (id, index) => {

          try {

            if (session ) {
              const token = session.accessToken;  
              const data_deleted = [...data];                    
              const response = await deleteVehicle(id, token);

              data_deleted.splice(index, 1);
              _setData(data_deleted);
              setError('Deleted vehicle succesufull.', response.result.message);   

            } 

          } catch (error) {
            setError('Error deleting vehicle. Please try again.', error.message);  
          }


  };

    const handleChange = (e, field) => {
        if (editedData) {
            setEditedData({
                ...editedData,
                [field]: e.target.value,
            });
        }
    };
 
    return (
            <Box>
                <TableContainer>
                        <Table
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <TableHead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableCell key={header.id} >
                                                    <Typography  variant="h6" mb={1} {...{
                                                        className: header.column.getCanSort()
                                                            ? 'tabletype select-none'
                                                            : '', 
                                                        onClick: header.column.getToggleSortingHandler()
                                                        ,
                                                    }}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: <svg class="iconDirectionAsc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDownwardIcon"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>,
                                                            desc: <svg class="iconDirectionDesc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDownwardIcon"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>,

                                                            
                                                          
                                                        }[header.column.getIsSorted()] ?? null}

                                                       

                                                    </Typography>

                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <Filter column={header.column}  />
                                                        </div>
                                                    ) : null}

                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHead>

                                
                                <TableBody>

                                    {table.getRowModel().rows.map((row) => (

                                       

                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {cell.column.id === "edit" ? (
                                                        editRowId === row.original.objectId ? (
                                                            <>
                                                                <IconButton onClick={() => handleSave(row.original)} color="primary">
                                                                    <CheckIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => setEditRowId(null)} color="success">
                                                                    <CloseIcon />
                                                                </IconButton>

                                                                
                                                            </>
                                                        ) : ( 
                                                        
                                                            <>
                                                                <IconButton onClick={() => handleEdit(row.original)} color="primary">
                                                                    <EditIcon />
                                                                </IconButton>

                                                                <IconButton onClick={() => handleDelete(row.original.objectId, row.id)} color="error">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                
                                                            </>
                                                            
                                                        )
                                                    ) : editRowId === row.original.objectId ? (
                                                        
                                                            <TextField
                                                                variant="outlined"
                                                                value={editedData?.[cell.column.id] || ""}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        e,
                                                                        cell.column.id
                                                                    )
                                                                }
                                                                fullWidth
                                                            />
                                                       
                                                    ) : (
                                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    )}
                                                    
                                                </TableCell>
                                            ))}
                                        </TableRow>


                                    ))}

                                </TableBody>

                                
                        </Table>
                </TableContainer>
                <Divider />
            </Box>
    );
};
export default GetVehicles;

