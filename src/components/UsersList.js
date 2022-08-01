import * as React from 'react';
import {
  GridActionsCellItem,
  GridEditInputCell
} from '@mui/x-data-grid';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuBar from '../components/MenuBar';
import DeletePopup from '../components/common/DeletePopup';
import Box from '@mui/material/Box';
import { users } from './StaticJson';
import DataGridMi from './common/DataGridMi';





const StyledBox = styled(Box)(({ theme }) => ({
  height: 400,
  width: '100%',
  paddingLeft: 250,
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
}));

const usersList = users;

if (localStorage.getItem("users") === null) {
  localStorage.setItem('users', JSON.stringify(usersList));
}



const UsersList = () => {
  const [state, setState] = React.useState({
    firstName: "",
    email: "",
    mobile: "",
    role: "",
    password: ""
  });
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(JSON.parse(localStorage.getItem("users")));
  const [rowId, setRowId] = React.useState(0);
  const [edit, setEdit] = React.useState(0);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [role, setRole] = React.useState(2);

  const loginCookies = document.cookie.split(';');
  const roleId = loginCookies[1].split("=")[1];
  const [userRole, setUserRole] = React.useState(roleId);
  const [error, setError] = React.useState({
    firstName: "",
    email: "",
    mobile: "",
    password: "",
    role: ""
  });

  const handleClickAdd = () => {
    setState({
      firstName: "",
      email: "",
      mobile: "",
      role: "",
      password: ""
    });
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setError(clearErrorValidations());
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };


  const handleOpen = (id) => {
    setRowId(id);
    setOpen(true);
  };

  const handleClose = (row) => {
    setOpen(false);
  };
  //Delete user
  const deleteUser = () => {
    setUsers((usersList) => usersList.filter((row) => row.id !== rowId));
    setOpen(false);
    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );
  }

  //edit user
  const handleEditClick = (id) => {
    setEdit(id);
    console.log(id);
  }


  const clearErrorValidations = () => {
    return {
      firstName: "",
      email: "",
      mobile: "",
      role: "",
      password: ""
    };
  }

  const saveUser = (newUser) => {
    let usersListCopy = users.map((user) => {
      if (user.id === newUser.id) {
        user.name = newUser.name;
        user.mobile = newUser.mobile;
        user.email = newUser.email;
        user.password = newUser.password;
      }
      return user;
    });
    setUsers(users);
    setEdit(0);
    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );
  }
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    saveUser(newRow);
    return updatedRow;
  };

  const editUser = (params, e) => {
    console.log('params rwo', params);
    let newUser = params.row;
    newUser.id = params.id;
    console.log("new user------------", newUser);
    saveUser(newUser);
  }


  const handleInputChange = (evt) => {
    console.log('0000000000000000000000000000', evt);
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    });
  }

  const validateUser = () => {
    let errorMessages = clearErrorValidations();
    let valid = true;
    if (!state.firstName) {
      errorMessages.firstName = 'Name is required';
      valid = false;
    }
    else {
      let dupEmail = users.filter(user => (user.name.toLowerCase() === state.firstName.toLowerCase()));
      if (dupEmail.length > 0) {
        errorMessages.firstName = `Duplicate username`;
        valid = false;
      }
      else {
        errorMessages.firstName = null;
      }
    }
    if (!state.mobile) {
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
    if (!state.email) {
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
        let dupEmail = users.filter(user => (user.email.toLowerCase() === state.email.toLowerCase()));
        if (dupEmail.length > 0) {
          errorMessages.email = `Duplicate email id`;
          valid = false;
        }
        else {
          errorMessages.email = null;
        }
      }
    }
    if (!state.password) {
      errorMessages.password = 'Password is required';
      valid = false;
    }
    else {
      errorMessages.password = '';
    }
    setError(errorMessages);
    return valid;
  }

  const addUser = (e) => {
    let valid = validateUser();
    console.log("valid-------addUser--", valid, error);
    if (valid) {
      const ids = users.map(object => {
        return object.id;
      });
      const max = Math.max(...ids);
      let newuser = {
        id: max + 1,
        name: state.firstName, mobile: state.mobile, email: state.email, role: role, password: state.password
      }
      let updatedRows = [...users, newuser];
      setUsers(updatedRows);

      localStorage.setItem(
        'users',
        JSON.stringify(users)
      );
      setOpenAdd(false);
    }


  }

  const handleCancelClick = () => {
    setEdit(0);

  }


  const onCellEditCommit = (cellData) => {
  }

  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  }));

  function NameEditInputCell(props) {
    const { error } = props;

    return (
      <StyledTooltip open={!!error} title={error}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
  }

  function renderEditName(params) {
    return <NameEditInputCell {...params} />;
  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
      field: 'name', headerName: 'Name', width: 130, editable: true,
      preProcessEditCellProps: (params) => {
        let hasError = '';
        if (params.hasChanged) {
          const name = params.props.value;
          hasError = name === '' ? 'Name is required' : false;
          if (!hasError) {
            let exists = users.filter(user => (user.name.toLowerCase() === name.toLowerCase()));
            hasError = exists.length > 0 ? `${name} is already taken.` : null
          }
        }
        return { ...params.props, error: hasError };
      },
      renderEditCell: renderEditName
    },
    {
      field: 'mobile', headerName: 'Phone', width: 130, editable: true,
      preProcessEditCellProps: (params) => {
        let hasError = '';
        if (params.hasChanged) {
          const phone = params.props.value;
          hasError = phone === '' ? 'Mobile number is required' : false;
          var reg = new RegExp('^[0-9]*$');
          if (!hasError) {
            if (!reg.test(phone)) {
              hasError = 'Allowed only digits';
            }
            if (phone.length < 10) {
              hasError = 'Invalid. Required 10 digits';
            }
          }
        }
        return { ...params.props, error: hasError };
      },
      renderEditCell: renderEditName
    },
    {
      field: 'email', headerName: 'Email', width: 130, editable: true,
      preProcessEditCellProps: (params) => {
        let hasError = '';
        if (params.hasChanged) {
          const email = params.props.value;
          hasError = email === '' ? 'Email is required' : false;
          if (!hasError) {
            var reg = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
              hasError = 'Invalid email.';
            }
            else {
              let dupEmail = users.filter(user => (user.email.toLowerCase() === email.toLowerCase()));
              console.log("exists------", dupEmail, email.toLowerCase());
              hasError = dupEmail.length > 0 ? `Duplicate email id` : null
            }
          }
        }
        return { ...params.props, error: hasError };
      },
      renderEditCell: renderEditName
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: "Actions",
      hide: userRole != 1 ? true : false,
      getActions: (params) => {
        return [
          <GridActionsCellItem icon={<DeleteIcon />} onClick={(e) => handleOpen(params.id)} />,
        ];

      }
    }
  ]


  if (!users || users.length === 0) return <p>No users, sorry</p>;
  return (
    <>
      <MenuBar />

      <div>
        <StyledBox>
          <DataGridMi rows={users} columns={columns} processRowUpdate={processRowUpdate} onCellEditCommit={onCellEditCommit}/>
        </StyledBox>
        {userRole == 1 ? <Button color="primary" id="addUser1" className="addUser1" startIcon={<AddIcon />} onClick={handleClickAdd}>
          Add user
        </Button> : ''}
        <DeletePopup id={rowId} deleteRecord={deleteUser} open={open} handleClose={handleClose} />

        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              className="input-firstName"
              id="name"
              label="Name"
              name="firstName"
              required={true}
              fullWidth
              variant="standard"
              value={state.firstName}
              onChange={(e) => handleInputChange(e)}
            />
            {error.firstName &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {error.firstName}
              </span>}
            <TextField
              className="userlist-input-mobile"
              inputProps={{ "data-testid": "content-input" }}
              data-testid="mobile"
              autoFocus
              margin="dense"
              id="mobile"
              name="mobile"
              label="Mobile"
              fullWidth
              variant="standard"
              required={true}
              type="number"
              value={state.mobile}
              onChange={(e) => handleInputChange(e)}
            />
            {error.mobile &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {error.mobile}
              </span>}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              fullWidth
              variant="standard"
              value={state.email}
              required={true}
              onChange={(e) => handleInputChange(e)}
            />
            {error.email &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {error.email}
              </span>}
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              required={true}
              value={state.password}
              onChange={(e) => handleInputChange(e)}
            />
            {error.password &&
              <span style={{ color: 'red', fontSize: 14 }}>
                {error.password}
              </span>}
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              name="role"
              required={true}
              onChange={handleRoleChange}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Guest</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button id="dialog-close-button" onClick={handleCloseAdd}>Cancel</Button>
            <Button id="add-user-button" onClick={(e) => addUser(e)}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default UsersList;
