import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Collpase from 'react-bootstrap/Collapse';

const darkColorHex = '#333333';
const darkColorOpacity = '0.8';
const lightColorHex = '#ffffff';

function AddThoughtForm(props) {
    const [ formVisible, setFormVisible ] = useState(false);

    const toggleButtonElement = (
        <Button variant="dark" onClick={ () => setFormVisible(!formVisible) }>
            Anything on your mind?
        </Button>
    );

    const formElement = (
        <Form onSubmit={ props.submitHandler }>
            <Form.Group className="mb-3">
                <Form.Control type="text" id="user_input" name="user_input" onChange={ props.onChangeHandler } value={props.inputValue}/>
                <Form.Text style={{ color: lightColorHex }}>
                    Add your thought to the collection here
                </Form.Text>
            </Form.Group>
            <Button variant="dark" type="Submit" onClick={ () => setFormVisible(false) } >
                Submit
            </Button>
        </Form>
    );

    return (
        <div id="component-addthoughtform">
            <Card style={{ backgroundColor: darkColorHex, opacity: darkColorOpacity }}>
                <Card.Body>
                    <div id="component-addthoughtform-toggle">
                        { toggleButtonElement }
                    </div>
                    <Collpase in={ formVisible }>
                        <div id="component-addthoughtform-form">
                            <br />
                            { formElement }
                        </div>
                    </Collpase>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AddThoughtForm;