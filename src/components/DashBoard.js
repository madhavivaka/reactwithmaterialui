import React from 'react';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MenuBar from '../components/MenuBar';
import DeletePopup from '../components/common/DeletePopup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { hotels } from './StaticJson';
import DataGridMi from './common/DataGridMi';

const hotelsList = hotels;
if (localStorage.getItem("hotels") === null) {
  localStorage.setItem('hotels', JSON.stringify(hotelsList));
}

const DashBoard = () => {

  const [state, setState] = React.useState({
    name: "",
    email: "",
    mobile: "",
    starRating: "",
    image: null,
  });
  const [open, setOpen] = React.useState(false);
  const [hotels, setHotels] = React.useState(JSON.parse(localStorage.getItem("hotels")));
  const [rowId, setRowId] = React.useState(0);
  const [edit, setEdit] = React.useState(0);
  const loginCookies = document.cookie.split(';');
  const userRole = loginCookies[1].split("=")[1];
  const [role, setRole] = React.useState(userRole);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    mobile: "",
    starRating: ""
  });


  const handleOpen = (id)  => {
    setRowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }



  const handleClickAdd = (e) => {
    setState({
      name: "",
      email: "",
      mobile: "",
      starRating: "",
      image: null
    });
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setErrors(clearErrorValidations());
  };

  const handleInputChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    });
  }


  const clearErrorValidations = () => {
    return {
      name: "",
      email: "",
      mobile: "",
      starRating: ""
    };
  }

  function checkValidations() {
    let errorMessages = clearErrorValidations();
    let valid = true;
    if (!state.name.trim()) {
      console.log("1111--------------")
      errorMessages.name = 'Name is required';
      valid = false;
    }
    else {
      errorMessages.name = '';
    }
    if (!state.mobile.trim()) {
      console.log("22222--------------")

      errorMessages.mobile = 'Mobile number is required';
      valid = false;
    }
    else {
      if (state.mobile.length < 9) {
        errorMessages.mobile = 'Minimum digits should be 9';
        valid = false;
      }
      else {
        errorMessages.mobile = '';
      }
    }
    if (!state.email.trim()) {
      console.log("44444--------------")

      errorMessages.email = 'Email is required';
      valid = false;
    }
    else {
      var reg = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
        errorMessages.email = 'Invalid email address.';
        valid = false;
      }
      else {
        let dupEmail = hotels.filter(hotel => (hotel.email.toLowerCase() === state.mobile.toLowerCase()));
        if (dupEmail.length > 0) {
          errorMessages.email = `Duplicate email id`;
          valid = false;
        }
        else {
          errorMessages.email = null;
        }
      }
    }
    if (state.starRating.trim() === '' || state.starRating === null) {
      errorMessages.starRating = 'Star Rating is required';
      valid = false;
    }
    else {
      if (parseInt(state.starRating) > 5) {
        errorMessages.starRating = 'Enter value between 1 to 5';
        valid = false;
      } else {
        errorMessages.starRating = '';

      }
    }
    setErrors(errorMessages);
    return valid;
  }

  const reload = () => window.location.reload();

  //Delete user
  const deleteHotel = () => {
    setHotels((hotelsList) => hotelsList.filter((row) => row.id !== rowId));
    setOpen(false);
    localStorage.setItem(
      'hotels',
      JSON.stringify(hotels)
    );
  }

  //edit user
  const handleEditClick = (params) => {
    setState(params.row);
    setEdit(params.row.id);
    setOpenAdd(true);
  }

  const editHotel = (params, e) => {
    hotels.map((hotel) => {
      if (hotel.id === params.id) {
        hotel.name = params.row.name;
        hotel.mobile = params.row.mobile;
        hotel.email = params.row.email;
        hotel.starRating = params.row.starRating;
      }
      return hotel;
    });
    setHotels(hotels);
    setEdit(0);
    localStorage.setItem(
      'hotels',
      JSON.stringify(hotels)
    );

  }

  const saveHotel = () => {
    let valid = checkValidations();
    console.log("dashboard validations------", valid, errors);
    if (valid) {
      console.log('6666666 i am valid hotel');
      if (edit !== 0) {
        let selectedHotel = (hotels) => hotels.filter((row) => row.id !== edit)
        hotels.map((hotel) => {
          if (hotel.id === edit) {
            if (!state.name) setErrors['name'] = "Name Required";
            else {
              hotel.name = state.name;
              hotel.mobile = state.mobile;
              hotel.email = state.email;
              hotel.starRating = state.starRating;
            }
          }
          return hotel;
        });
        setHotels(hotels);
        setEdit(0);
      }
      else {
        addHotel();
      }
      localStorage.setItem(
        'hotels',
        JSON.stringify(hotels)
      );
      setErrors({
        name: "",
        email: "",
        mobile: "",
        starRating: ""
      });
      setOpenAdd(false);
    }
  }

  const addHotel = () => {
    const ids = hotels.map(object => {
      return object.id;
    });
    const max = Math.max(...ids);
    let newHotel = {
      id: max + 1,
      name: state.name, mobile: state.mobile, email: state.email, starRating: state.starRating
    }
    let updatedRows = [...hotels, newHotel];

    setHotels(updatedRows);
  }

  const handleCancelClick = () => {
    setEdit(0);

  }
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    return updatedRow;
  };
  const onCellEditCommit = (cellData) => {
  }
  const onSubmit = data => console.log(data);



  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mobile', headerName: 'Phone', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'starRating', headerName: 'Star Rating', width: 130 },
    { field: 'image', headerName: 'Image', width: 130, renderCell: (params) => <img src={params.value} /> },
    {
      field: 'actions',
      type: 'actions',
      headerName: "Actions",
      hide: role != 1 ? true : false,
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem icon={<DeleteIcon />} onClick={(e) => handleOpen(params.id)} />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={(e) => handleEditClick(params)}
            color="inherit"
          />,
        ];

      }
    }
  ]


  if (!hotels || hotels.length === 0) return <p>No hotels, sorry</p>;
  return (
    <>
      <MenuBar />

      <div style={{ height: 400, width: '100%', paddingLeft: 250 }}>
        <DataGridMi rows={hotels} columns={columns} processRowUpdate={processRowUpdate} onCellEditCommit={onCellEditCommit}/>
        {role == 1 ?
          <Button color="primary" id="addHotel" className="addHotel" startIcon={<AddIcon />} onClick={(e) => handleClickAdd(e)} >
            Add Hotel
          </Button> : ''
        }
        <DeletePopup id={rowId} deleteRecord={deleteHotel} open={open} handleClose={handleClose} />
        <Dialog open={openAdd} onClose={handleCloseAdd} className='add-dialogue'>

          <DialogTitle>Add/Edit Hotel</DialogTitle>
          <DialogContent>
            <TextField
              className="input-name"
              autoFocus
              margin="dense"
              id="name"
              label="Hotel Name"
              required={true}
              name="name"
              fullWidth
              variant="standard"
              value={state.name}
              onChange={(e) => handleInputChange(e)}

            />
            {errors.name &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {errors.name}
              </span>}
            <TextField
              className="input-mobile"
              inputProps={{ "data-testid": "content-input" }}
              data-testid="mobile"
              autoFocus
              margin="dense"
              id="mobile"
              required={true}
              type="number"
              name="mobile"
              label="Mobile"
              fullWidth
              variant="standard"
              value={state.mobile}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.mobile &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {errors.mobile}
              </span>}
            <TextField
              className="input-email"
              inputProps={{ "data-testid": "content-input" }}
              data-testid="email"
              autoFocus
              margin="dense"
              id="email"
              name="email"
              required={true}
              label="Email Address"
              fullWidth
              variant="standard"
              value={state.email}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.email &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {errors.email}
              </span>}
            <TextField
              className="input-starRating"
              inputProps={{ "data-testid": "content-input" }}
              data-testid="starRating"
              autoFocus
              margin="dense"
              id="starRating"
              name="starRating"
              required={true}
              label="Star Rating"
              fullWidth
              variant="standard"
              value={state.starRating}
              onChange={(e) => handleInputChange(e)}
            />
            {errors.starRating !== '' &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {errors.starRating}
              </span>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button className="saveHotelBtn" onClick={(e) => saveHotel()}>Save</Button>
          </DialogActions>

        </Dialog>
      </div>
    </>
  );
}

export default DashBoard;
