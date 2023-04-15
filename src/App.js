import * as React from 'react';
import './style.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

let index = 0;
export default function App() {
  // Initialize list of tasks
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [description, setDescription] = React.useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [priority, setPriority] = React.useState('low');
  const [editedPriority, setEditedPriority] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [editedDate, setEditedDate] = React.useState(new Date());

  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [uniqueTitleError, setUniqueTitleError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [priorityError, setPriorityError] = React.useState(false);
  const [editedDescriptionError, setEditedDescriptionError] =
    React.useState(false);
  const [editedDateError, setEditedDateError] = React.useState(false);
  const [editedPriorityError, setEditedPriorityError] = React.useState(false);
  const [hide, setHide] = useState(null);
  const label = {
    input: { 'aria-label': 'Checkbox' },
  };
  //function to add tasks
  const clickAdd = () => {
    setTitleError(false);
    setUniqueTitleError(false);
    setDescriptionError(false);
    setDateError(false);
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('');
    setOpen(true);
  };
  //close dialog box if cancel button is clicked
  const clickCancel = () => {
    setOpen(false);
  };
  //validate that no fields are empty
  const addTask = () => {
    if (title === '') {
      setTitleError(true);
      if (description === '') {
        setDescriptionError(true);
      }
      if (date === '') {
        setDateError(true);
      }
      if (priority === '') {
        setPriorityError(true);
      }
      if (tasks.findIndex((a) => a.title == title) != -1 && !editing) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      setOpen(true);
      return;
    }
    if (description === '') {
      setDescriptionError(true);
      if (title == '') {
        setTitleError(true);
      }
      if (date === '') {
        setDateError(true);
      }
      if (priority === '') {
        setPriorityError(true);
      }
      if (tasks.findIndex((a) => a.title == title) != -1 && !editing) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      setOpen(true);
      return;
    }
    if (description === '') {
      setDescriptionError(true);
      if (title === '') {
        setTitleError(true);
      }
      if (date === '') {
        setDateError(true);
      }
      if (priority === '') {
        setPriorityError(true);
      }
      if (tasks.findIndex((a) => a.title == title) != -1 && !editing) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      setOpen(true);
      return;
    }
    if (date === '') {
      setDateError(true);
      if (title === '') {
        setTitleError(true);
      }
      if (description === '') {
        setDescriptionError(true);
      }
      if (priority === '') {
        setPriorityError(true);
      }
      if (tasks.findIndex((a) => a.title == title) != -1 && !editing) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      setOpen(true);
      return;
    }
    if (priority === '') {
      setPriorityError(true);
      if (title === '') {
        setTitleError(true);
      }
      if (description === '') {
        setDescriptionError(true);
      }
      if (date === '') {
        setDateError(true);
      }
      if (tasks.findIndex((a) => a.title == title) != -1 && !editing) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      setOpen(true);
      return;
    }
    if (titleError === true || descriptionError === true) {
      setOpen(true);
      return;
    }
    setOpen(false);
    //toastr message if validations are passed and the task is added
    toastr.success('Task added successfully');
    addRow();
  };
  //new row for the new task
  const addRow = (data) => {
    const formatDate = new Date(date).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    });
    index++;
    data = {
      location: index,
      title: title,
      description: description,
      deadline: formatDate,
      priority: priority,
    };
    setRows([...rows, data]);
  };
  //place toastr message at bottom right
  toastr.options.positionClass = 'toast-bottom-right';

  const [edit, setOpenEdit] = React.useState(false);
  const [rows, setRows] = React.useState([
    {
      location: 0,
      title: '',
      description: '',
      deadline: null,
      priority: '',
      action: null,
      visible: false,
    },
  ]);
  if (index == 0) {
    rows.splice(0);
  }
  //update button
  const clickUpdate = (title) => {
    setEditedTitle(title);
    const currentIndex = rows.findIndex((rows) => rows.title === title);
    setEditedDateError(false);
    setEditedPriorityError(false);
    setEditedDescriptionError(false);
    setEditedDescription('');
    setEditedDate('');
    setEditedPriority('');
    setOpenEdit(true);
  };
  //check validations for updating the task
  const updateTask = () => {
    if (editedDescription === '') {
      setEditedDescriptionError(true);
      if (editedDate === '') {
        setEditedDateError(true);
      }
      if (editedPriority === '') {
        setEditedPriorityError(true);
      }
      setOpenEdit(true);
      return;
    }
    if (editedDate === '') {
      setEditedDateError(true);
      if (editedPriority === '') {
        setEditedPriorityError(true);
      }
      if (editedDescription === '') {
        setEditedDescriptionError(true);
      }
      setOpenEdit(true);
      return;
    }
    if (editedPriority === '') {
      setEditedPriority(true);
      if (editedDescription === '') {
        setEditedDescriptionError(true);
      }
      if (editedDate === '') {
        setEditedDateError(true);
      }
    }
    if (
      editedDescriptionError === true ||
      editedPriorityError === true ||
      editedDateError === true
    ) {
      setOpenEdit(true);
      return;
    }
    setOpenEdit(false);
    //toastr message if the task passed validations and was updated successfully
    toastr.success('Task updated succesfully');
    updateRow();
  };
  //exit out of dialog box if cancel is clicked
  const clickUpdateCancel = () => {
    setOpenEdit(false);
  };
  //update the task in the table
  const updateRow = () => {
    const currentIndex = rows.findIndex((rows) => rows.title === editedTitle);
    rows[currentIndex].description = editedDescription;
    const formatDate = new Date(editedDate).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    });
    rows[currentIndex].deadline = formatDate;
    rows[currentIndex].priority = editedPriority;
  };
  //statements for handling changes or edits of the fields
  const handleTitleChange = (event) => {
    let a = event.target.value;
    let b = 0;
    for (let i = 0; i < index; i++) {
      if (a === rows[i].title) {
        setTitleError(true);
        b = 1;
      }
    }
    if (a.trim().length === 0) {
      setTitleError(true);
      b = 1;
    }

    if (b == 0) {
      setTitleError(false);
    }
    setTitle(event.target.value);
  };

  const handleTitleClick = (event) => {
    if (event.target.value === '') {
      setTitleError(true);
      setUniqueTitleError(true);
    }
  };

  const handleEditedDescriptionClick = (event) => {
    if (event.target.value === '') {
      setEditedDescriptionError(true);
    }
  };

  const handleDescriptionClick = (event) => {
    if (event.target.value === '') {
      setDescriptionError(true);
    }
  };
  const handleDateClick = (event) => {
    if (event.target.value == '') {
      setDateError(true);
    }
  };

  const handleEditedDateClick = (event) => {
    if (event.target.value == '') {
      setEditedDateError(true);
    }
  };

  const handleDescriptionChange = (event) => {
    let a = event.target.value;
    let b = 0;
    if (a.trim().length === 0) {
      setDescriptionError(true);
      b = 1;
    }
    if (b == 0) {
      setDescriptionError(false);
    }
    setDescription(event.target.value);
  };

  const handleEditedDescriptionChange = (event) => {
    let a = event.target.value;
    let b = 0;
    if (a.trim().length === 0) {
      setEditedDescriptionError(true);
      b = 1;
    }
    if (b == 0) {
      setEditedDescriptionError(false);
    }
    setEditedDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    if (event.target.value.trim() != 0) {
      setDateError(false);
    }
    setDate(event.target.value);
  };

  const handleEditedDateChange = (event) => {
    if (event.target.value.trim() != 0) {
      setEditedDateError(false);
    }
    setEditedDate(event.target.value);
  };

  const priorityChange = (event) => {
    setPriorityError(false);
    setPriority(event.target.value);
  };

  const editedPriorityChange = (event) => {
    setEditedPriorityError(false);
    setEditedPriority(event.target.value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar
          //top banner for frameworks title and add button
          sx={{
            display: 'center',
            alignItems: 'center',
            justifyContents: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
              flexGrow: 1,
            }}
          >
            <MenuIcon />
            FRAMEWORKS
          </Typography>
          <Button
            variant="contained"
            onClick={clickAdd}
            startIcon={<AddCircleIcon />}
          >
            Add
          </Button>
        </Toolbar>
      </AppBar>
      <TableRow>
        {/*Headers for the default table*/}
        <TableCell align="center">Title</TableCell>
        <TableCell align="center">Description</TableCell>
        <TableCell align="center">Deadline</TableCell>
        <TableCell align="center">Priority</TableCell>
        <TableCell align="center">Is Complete</TableCell>
        <TableCell align="center">Action</TableCell>
      </TableRow>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center">{row.title}</TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.deadline}</TableCell>
            <TableCell align="center">{row.priority}</TableCell>
            <TableCell align="center">
              {' '}
              <input
                type="checkbox"
                onClick={() => {
                  let changed = false;
                  if (row.visible == null) {
                    setHide(false);
                    row.visible = false;
                    changed = true;
                  } else {
                    if (row.visible === true) {
                      setHide(false);
                      row.visible = false;
                    } else {
                      setHide(true);
                      row.visible = true;
                    }
                  }
                  if (changed == true) {
                    setHide(true);
                    row.visible = true;
                  }
                  setRows([...rows]);
                }}
              ></input>
            </TableCell>
            <TableCell align="center">
              <div>
                {row.visible == true ? (
                  <Button
                    //delete button for after checkbox is checked
                    variant="contained"
                    sx={{ bgcolor: 'red', color: 'white' }}
                    id="deleteButton"
                    onClick={() => {
                      index--;
                      toastr.success('Task deleted succesfully');
                      setRows(rows.filter((rows) => rows.title !== row.title));
                    }}
                  >
                    <CancelIcon fontSize="small" />
                    Delete
                  </Button>
                ) : (
                  <>
                    <Button
                      //update button
                      variant="contained"
                      id="updateButton"
                      onClick={() => {
                        clickUpdate(row.title);
                      }}
                    >
                      <EditIcon fontSize="small" /> Update{' '}
                    </Button>
                    <Button
                      //delete button for before checkbox is checked
                      variant="contained"
                      sx={{ bgcolor: 'red', color: 'white' }}
                      id="deleteButton"
                      onClick={() => {
                        index--;
                        toastr.success('Task deleted succesfully');
                        setRows(
                          rows.filter((rows) => rows.title !== row.title)
                        );
                      }}
                    >
                      <CancelIcon fontSize="small" />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/*Dialog box for add button */}
      <Dialog open={open} onClose={addTask}>
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          {' '}
          <AddCircleIcon fontSize="small" />
          {/*Dialog box header */}
          Add Task
        </DialogTitle>
        <DialogContent sx={{}}>
          <div>
            <TextField
              sx={{ padding: 1, marginTop: 3 }}
              value={title}
              error={titleError || uniqueTitleError}
              {...(titleError
                ? {
                    helperText: 'Title required',
                  }
                : {})}
              {...(uniqueTitleError
                ? { helperText: 'Title must be unique' }
                : {})}
              label="Title"
              variant="outlined"
              onBlur={handleTitleClick}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{ padding: 1 }}
              value={description}
              error={descriptionError}
              helperText={descriptionError ? 'Description required' : ''}
              label="Description"
              variant="outlined"
              onBlur={handleDescriptionClick}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <FormLabel>Deadline</FormLabel>
            <TextField
              sx={{ padding: 1 }}
              type="date"
              helperText={dateError ? 'Deadline required' : ''}
              onBlur={handleDateClick}
              value={date}
              onChange={handleDateChange}
              error={dateError}
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <FormLabel error={priorityError}>Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="medium"
              name="radio-buttons-group"
              value={priority}
              onChange={priorityChange}
            >
              <FormControlLabel value="low" control={<Radio />} label="low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <FormHelperText
              label="Priority"
              variant="outlined"
              value={priority}
              error={priorityError}
            >
              {priorityError ? 'Priority required' : ''}
            </FormHelperText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: 'primary.dark', color: 'white' }}
            onClick={addTask}
          >
            <AddCircleIcon></AddCircleIcon>Add
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: 'red', color: 'white' }}
            onClick={clickCancel}
          >
            <DoNotDisturbAltIcon fontSize="small" />
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/*Update button dialog box */}
      <Dialog open={edit} onClose={updateTask}>
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          {/*Edit task header */}
          <EditIcon fontSize="small" /> Edit Task
        </DialogTitle>
        <DialogContent sx={{}}>
          <div>
            <TextField
              //description text field
              fullWidth
              sx={{ padding: 1, marginTop: 3 }}
              value={editedDescription}
              error={editedDescriptionError}
              helperText={editedDescriptionError ? 'Description required' : ''}
              label="Description"
              variant="outlined"
              onBlur={handleEditedDescriptionClick}
              onChange={handleEditedDescriptionChange}
            />
          </div>
          <div>
            <FormLabel>Deadline</FormLabel>
            <TextField
              //deadline calender field
              type="date"
              helperText={editedDateError ? 'Deadline required' : ''}
              onBlur={handleEditedDateClick}
              value={editedDate}
              onChange={handleEditedDateChange}
              error={editedDateError}
              sx={{ width: '100%' }}
            />
          </div>
          <div>
            <FormLabel sx={{ padding: 1 }} error={editedPriorityError}>
              {/*Priority buttons*/}
              Priority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={editedPriority}
              onChange={editedPriorityChange}
            >
              <FormControlLabel value="low" control={<Radio />} label="low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <FormHelperText>
              {editedPriorityError ? 'Priority required' : ''}
            </FormHelperText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: 'primary.dark', color: 'white' }}
            onClick={updateTask}
          >
            {/*Edit button*/}
            <EditIcon fontSize="small" /> Edit
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: 'red', color: 'white' }}
            onClick={clickUpdateCancel}
          >
            <DoNotDisturbAltIcon fontSize="small" />
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
