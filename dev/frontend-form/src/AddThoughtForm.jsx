import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Collpase from 'react-bootstrap/Collapse';
import Stack from 'react-bootstrap/Stack';

const darkColorHex = '#333333';
const lightColorHex = '#ffffff';

function AddThoughtForm() {
    const [ formVisible, setFormVisible ] = useState(false);

    const toggleButtonElement = (
        <Button variant="dark" onClick={ () => setFormVisible(!formVisible) }>
            Anything on your mind?
        </Button>
    );

    const formElement = ( 
        <div id="component-addthoughtform-form">
            <Form action="/process" method="post">
                <Form.Group className="mb-3">
                    <Form.Control type="text" id="user_input" name="user_input" />
                    <Form.Text style={{ color: lightColorHex }}>
                        Add your thought to the collection here
                    </Form.Text>
                </Form.Group>
                <Button variant="dark" type="Submit" onClick={ () => setFormVisible(true) } >
                    Submit
                </Button>
            </Form>
        </div>
    );

    return (
        <div id="component-addthoughtform">
            <Card style={{ width: '50%', backgroundColor: darkColorHex }}>
                <Card.Body>
                    { toggleButtonElement }
                    <Collpase in={ formVisible }>
                        { formElement }
                    </Collpase>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AddThoughtForm;