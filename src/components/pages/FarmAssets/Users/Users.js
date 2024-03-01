import React from "react";
import MaterialTable, { Column } from "material-table";
import "../../Pages.css";
import CreateIcon from "@mui/icons-material/Create";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import UserData from "../../../../Data/UserData";
import { Modal, Button, Dropdown, Form } from "semantic-ui-react";

const options = [
  { key: "payroll", text: "Payroll", value: "Payroll" },
  { key: "add/editusers", text: "Add/Edit Users", value: "Add/Edit Users" },
  { key: "graininventory", text: "Grain Inventory", value: "Grain Inventory" },
  { key: "graincontracts", text: "Grain Contracts", value: "Grain Contracts" },
  {
    key: "chemicalinventory",
    text: "Chemical Inventory",
    value: "Chemical Inventory",
  },
  {
    key: "fertiliserinventory",
    text: "Fertiliser Inventory",
    value: "Fertiliser Inventory",
  },
  { key: "fuelinventory", text: "Fuel Inventory", value: "Fuel Inventory" },
  { key: "waterinventory", text: "Water Inventory", value: "Water Inventory" },
  { key: "spraylogs", text: "Spray Logs", value: "Spray Logs" },
  {
    key: "spraylogapproval",
    text: "Spray Log Approval",
    value: "Spray Log Approval",
  },
  { key: "plantings", text: "Plantings", value: "Plantings" },
  { key: "spreadings", text: "Spreadings", value: "Spreadings" },
  { key: "harvests", text: "Harvests", value: "Harvests" },
  {
    key: "paddockmiantainance",
    text: "Paddock Miantainances",
    value: "Paddock Maintainances",
  },
  { key: "irigation", text: "Irrigation", value: "Irrigation" },
  { key: "grazing", text: "Grazing", value: "Grazing" },
];
const roles = [
  { key: "User", text: "User", value: "User" },
  { key: "admin", text: "Admin", value: "Admin" },
];

var chipcolor = "";

export default function Users() {
  const [open, setOpen] = React.useState(false);
  const [confopen, setconfOpen] = React.useState(false);
  const [rowdatas, setrowdatas] = React.useState({});
  const [newedit, setnewedit] = React.useState(true);

  const columns = [
    {
      title: "Name",
      render: (rowData) => rowData.first_name + " " + rowData.last_name,
    },
    {
      title: "User Role",
      field: "user_role",
      render(rowdata) {
        function Switches(rowdata) {
          if (rowdata.user_role === "Owner") {
            chipcolor = "error";
          } else if (rowdata.user_role === "User") {
            chipcolor = "primary";
          } else {
            chipcolor = "warning";
          }

          return (
            <div>
              <Chip color={chipcolor} label={rowdata.user_role} />
            </div>
          );
        }
        return Switches(rowdata);
      },
    },
    {
      title: "Permissions",
      field: "permissions",
    },
    {
      title: "Phone",
      field: "Phone",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Address",

      render: (rowData) =>
        rowData.address_line1 +
        " " +
        rowData.address_line2 +
        " " +
        rowData.town +
        " " +
        rowData.state +
        " " +
        rowData.pin_code +
        " " +
        rowData.country,
    },
  ];
  return (
    <div className="table-size">
      <div className="subheader">
        <h1 style={{ color: "black", "margin-bottom": "0px" }}>Users </h1>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <Modal onClose={() => setOpen(false)} open={open} as={Form}>
        <Modal.Header>
          {newedit === true ? "New User" : "Edit User"}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="First name "
                placeholder="First name"
                id="form-input-first-name"
                defaultValue={rowdatas.first_name}
              />
              <Form.Input
                required
                fluid
                label="Last name "
                placeholder="Last name"
                id="form-input-last-name"
                defaultValue={rowdatas.last_name}
              />
            </Form.Group>
            {rowdatas.user_role === "Owner" ? (
              ""
            ) : (
              <Form.Group inline>
                <Form.Field required>
                  <label>User Roles</label>
                  <Dropdown
                    widths={5}
                    fluid
                    clearable
                    selection
                    options={roles}
                    defaultValue={(roles.value = rowdatas.user_role)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>User Permissions</label>
                  <Dropdown
                    multiple
                    fluid
                    selection
                    options={options}
                    defaultValue={(options.values = rowdatas.permissions)}
                  />
                </Form.Field>
              </Form.Group>
            )}

            <Form.Input
              fluid
              width={6}
              label="Phone Number"
              placeholder="Ph No"
              id="form-input-phone"
              defaultValue={rowdatas.Phone}
            />
            <Form.Input
              fluid
              width={6}
              label="Email Address"
              placeholder="Email"
              id="form-input-email"
              defaultValue={rowdatas.email}
            />
            <Form.Input
              fluid
              width={6}
              label="Address line 1"
              placeholder="line1"
              id="form-input-address-line1"
              defaultValue={rowdatas.address_line1}
            />
            <Form.Input
              fluid
              width={6}
              label="Address line 2"
              placeholder="line2"
              id="form-input-address-line2"
              defaultValue={rowdatas.address_line2}
            />
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Town"
                placeholder="town"
                id="form-input-town"
                defaultValue={rowdatas.town}
              />
              <Form.Input
                fluid
                label="State"
                placeholder="state"
                id="form-input-state"
                defaultValue={rowdatas.state}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Pin Code"
                placeholder="Pin"
                id="form-input-pincode"
                defaultValue={rowdatas.pin_code}
              />
              <Form.Input
                fluid
                label="Country"
                placeholder="country"
                id="form-input-Country"
                defaultValue={rowdatas.country}
              />
            </Form.Group>
            <Form.Field>
              <label>* indicates required fields</label>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              setOpen(false);
              setconfOpen(true);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>

      <Modal size="tiny" onClose={() => setconfOpen(false)} open={confopen}>
        <Modal.Header>Confirm Login</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Email</label>
              <input placeholder="Username" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder="password" type="password" />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Login"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setconfOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
      <div className="equipment-table"></div>
      <MaterialTable
        columns={columns}
        data={UserData}
        editable={{
          onRowDelete: (selectedRow) => new Promise(() => {}),
        }}
        options={{
          showTitle: false,
          paging: true,
          pageSizeOptions: [2, 5, 10, 15, 20],
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: () => <CreateIcon color="action" />,
            onClick: (rowData, e) => {
              setnewedit(false);
              setrowdatas(e);
              setOpen(true);
            },
          },
          {
            icon: () => (
              <AddCircleRoundedIcon fontSize="large" color="primary" />
            ),
            tooltip: "Add User",
            isFreeAction: true,
            onClick: () => {
              setnewedit(true);
              setrowdatas({});
              setOpen(true);
            },
          },
        ]}
        icons={{
          Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
          Edit: () => <CreateIcon color="action" />,
          Delete: () => <DeleteIcon color="action" />,
        }}
      ></MaterialTable>
    </div>
  );
}
