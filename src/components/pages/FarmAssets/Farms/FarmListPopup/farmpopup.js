
import React, { useState } from 'react'
import { Button, Icon, Modal, Input } from 'semantic-ui-react'
import GearIcon from 'mdi-react/GearIcon';
import axios from "axios";

export default function Farmpopup(props) {
  const Value = props.Value;

  const [firstOpen, setFirstOpen] = React.useState(false)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [state, setState] = useState();

  const [farm, setfarm] = useState([])
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);


  const getfarmname = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARM_DETAILS",
        "paramArray": [Value],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farmsgenericselect', json)

    if (response) {
      setState(response.data[0].farm_name);
      console.log(response.data)
    }

  }

  const insertFarm = async (prop) => {
    console.log(prop.value.state);
    try {
      var json = {
        objJsonData: [

          {

            farm_name: prop.value.state,
            user_id: db.data[0].user_id
          }

        ]
      };
      var response = await axios.post("http://localhost:3002/farmsinsert", json);
      if (response) {
        alert("New farm added");
        console.log(response.data);
      }


    }
    catch (e) {
      console.log(e)
    }
  }
  const deleteFarm = async (prop) => {

    try {
      var json = {
        "strQuery": "delete from farmer.farms where farmid=$1",
        "arrValues": [Value]
      };
      var response = await axios.post("http://localhost:3002/farmsdelete", json);
      if (response) {
        alert("Farm deleted");
        console.log(response.data);
      }


    }
    catch (e) {
      console.log(e)
    }
  }

  const updateFarm = async (prop) => {
    console.log(prop)
    console.log(Value)
    var json = {
      "objJsonData": {
        "updateSetObjectValue": {
          farmid: Value,
          farm_name: prop,
          user_id: db.data[0].user_id
        },
        "whereInObject": { "farmid": [parseInt(Value)] }
      },
      "arrKeyFields": ["farmid"]
    };
    var response = await axios.post('http://localhost:3002/farmsbulkupdate', json)
    if (response) {
      alert("Farm edited");
    }
  }

  const addRow = () => {
    let newFarm = { value: { state } }
    console.log(newFarm);
    setfarm([...farm, newFarm])

    insertFarm(newFarm);
  }
  const editRow = () => {

    updateFarm(state);

  }
  const deleteRow = () => {
    deleteFarm();

  }
  return (
    <>

      <GearIcon onClick={() => setFirstOpen(true)} style={{ "cursor": "pointer", "color": "black" }} />
      <Modal style={{ "height": "35%", "width": "25%", "background-color": "rgb(0 0 0 / 62%)" }}
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>Farm Options</Modal.Header>
        <Modal.Content>
          <div style={{ "margin-left": "65px" }}>
            <Modal.Description>

              <Button basic color='green' onClick={() => setAddOpen(true)}>
                <span style={{ "fontSize": "18px", "color": "white" }}>.</span>
                <Icon name='plus' />
                <span style={{ "fontSize": "18px", "color": "white" }}>.</span>
                Add Farm
                <span style={{ "fontSize": "18px", "color": "white" }}>..</span>
              </Button>

            </Modal.Description>


            <Modal.Description style={{ "margin-top": "10px" }}>
              <Button basic color='blue' onClick={() => {
                setEditOpen(true);
                getfarmname();
              }}>

                <span style={{ "fontSize": "18px", "color": "white" }}>.</span>
                <Icon name='pencil' />
                <span style={{ "fontSize": "18px", "color": "white" }}>.</span>
                Edit Farm
                <span style={{ "fontSize": "18px", "color": "white" }}>..</span>
              </Button>

            </Modal.Description>


            <Modal.Description style={{ "margin-top": "10px" }}>
              <Button basic color='red' onClick={() => { setDeleteOpen(true); getfarmname(); }
              }>
                <Icon name='minus' />
                Delete Farm
              </Button>

            </Modal.Description>
          </div>
        </Modal.Content>

        <Modal.Actions>
          <Button color='red' onClick={() => setFirstOpen(false)}>
            <Icon name='remove' /> Cancel
          </Button>

        </Modal.Actions>

        <Modal
          onClose={() => setAddOpen(false)}
          open={addOpen}
          size='small'
          style={{ "width": "35%" }}
        >
          <Modal.Header>New Item</Modal.Header>
          <Modal.Content>
            <Input fluid iconPosition='left' placeholder='Name' required>

              <input onChange={(e) => setState(e.target.value)
              } />
            </Input>

          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='close'
              content='Cancel'
              onClick={() => setAddOpen(false)}
            />
            <Button positive
              icon='check'
              content='Save'
              onClick={() => {
                setAddOpen(false);
                addRow();
              }}
            />
          </Modal.Actions>
        </Modal>

        <Modal
          onClose={() => setEditOpen(false)}
          open={editOpen}
          size='small'
          style={{ "width": "35%" }}
        >
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <Input fluid iconPosition='left'>

              <input value={state} onChange={(e) => setState(e.target.value)} />
            </Input>

          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='close'
              content='Cancel'
              onClick={() => setEditOpen(false)}
            />
            <Button positive
              icon='check'
              content='Save'
              onClick={() => { setEditOpen(false); editRow(); }}
            />
          </Modal.Actions>
        </Modal>

        <Modal
          onClose={() => setDeleteOpen(false)}
          open={deleteOpen}
          size='small'
          style={{ "width": "35%" }}
        >
          <Modal.Header>Delete</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete the {state}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setDeleteOpen(false)} color="white"
              icon='close'
              content='Cancel'
            />
            <Button onClick={() => {
              setDeleteOpen(false);
              deleteRow();
            }}
              negative

              content='Delete'
            />
          </Modal.Actions>


        </Modal>

      </Modal>
    </>
  )
}