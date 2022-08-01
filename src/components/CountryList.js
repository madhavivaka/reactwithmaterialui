import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams,GridActionsCellItem } from '@mui/x-data-grid';
import React,{ Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { addCountry, updateCountry, deleteCountry } from '../actions/countryActions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import DeleteIcon from '@mui/icons-material/Delete';





const CountryList = () => {
    const countriesList = useSelector(store => store);
    const dispatch = useDispatch();
    const deleteRecord = (id) => {
        dispatch(deleteCountry({
            id
        }));
    }
    const addNewCountry =  (e) =>{
        e.preventDefault();
        dispatch(addCountry({
            id:Math.max(...countriesList.map(function(o){return o.id})) + 1,
            name:'',
            code:''
        }));
    }
    const processRowUpdate = (newRow) => {
        console.log("processRowUpdate",newRow);
        const updatedRow = { ...newRow, isNew: false };
        saveCountry(newRow);
        return updatedRow;
    };
    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        console.log("error---------",error);
      }, []);

    const saveCountry = (params) =>{
        dispatch(updateCountry({
            params
        }));
        localStorage.setItem(
        'countries',
        JSON.stringify(countriesList)
        );
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true
        },
        {
          field: 'code',
          headerName: 'Code',
          width: 150,
          editable: true
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: "Actions",
          getActions: (params) => {
            return [
              <GridActionsCellItem icon={<DeleteIcon />} onClick={(e) => deleteRecord(params.id)} />
            ];
      
          }
        }
      ];
 
    return (
        <Box sx={{ height: 300, width: '50%' }}>
          <DataGrid
            rows={countriesList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            editMode="row"
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            experimentalFeatures={{ newEditingApi: true }}
            checkboxSelection
            disableSelectionOnClick
          />
        <Button color="primary" id="addCountry" className="addCountry" startIcon={<AddIcon />} onClick={(e) =>addNewCountry(e)}>
          Add Country
        </Button>
        </Box>
        
      );
    
}




export default CountryList;