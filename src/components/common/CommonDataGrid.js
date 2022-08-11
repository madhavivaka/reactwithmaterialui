import {GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridValueGetterParams,
    DataGrid
  } from '@mui/x-data-grid';
  import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const DataGridMi = (props) =>{
  console.log("common datagrids",props);
  var keys=Object.keys(props.rows[0]);
 const getcamelcase=(v)=>{
 return v.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
 }
 var columns=keys.map(val=>{return { field: val, headerName: getcamelcase(val), width: 130 };});
 columns.push({
  field: 'actions',
  type: 'actions',
  headerName: "Actions",
  hide: props.role != 1 ? true : false,
  getActions: (params: GridRowParams) => {
    return [
      <GridActionsCellItem icon={<DeleteIcon />} onClick={(e) => props.handleOpen(params.id)} />,
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={(e) => props.handleEditClick(params)}
        color="inherit"
      />,
    ];

  }

});
    return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          id="usergridId"
          rows={props.rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          editMode="row"
          processRowUpdate={props.processRowUpdate}
          onCellEditCommit={props.onCellEditCommit}
          experimentalFeatures={{ newEditingApi: true }}
          checkboxSelection
        />
    </div>
  );
}

export default DataGridMi;