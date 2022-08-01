import {
    DataGrid
  } from '@mui/x-data-grid';

const DataGridMi = (props) =>{
  console.log("common datagrids",props);
    return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          id="usergridId"
          rows={props.rows}
          columns={props.columns}
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