import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type {  EmployeeActionMenuProps } from "../../types";

// interface Props {
//   active: boolean;
//   onEdit: () => void;
//   onToggleStatus: () => void;
// }

const EmployeeActionMenu = ({
  active,
  onEdit,
  onToggleStatus,
}: EmployeeActionMenuProps) => {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    onEdit();
  };

  const handleStatus = () => {
    handleClose();
    onToggleStatus();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleStatus}>
          <ListItemIcon>
            {active ? (
              <BlockIcon
                color="error"
                fontSize="small"
              />
            ) : (
              <CheckCircleIcon
                color="success"
                fontSize="small"
              />
            )}
          </ListItemIcon>

          <ListItemText>
            {active
              ? "Deactivate"
              : "Activate"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default EmployeeActionMenu;