import React from 'react';
import { Card, ListGroup, Button, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './content.scss';
import Footer from './Products';

export function Content () { 
    return (
        <>
        <div>
        <h2>Products Page</h2>
            <Card style={{ width: '18rem' }}>
                <ListGroup>
                    <ListGroup.Item>Product 1</ListGroup.Item>
                    <ListGroup.Item>Product 2</ListGroup.Item>
                    <ListGroup.Item>Product 3</ListGroup.Item>
                </ListGroup>
            </Card>
            <Link to="/">
            <Button type="submit" color="primary">GO Back</Button>
            </Link>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th className="text">Name</th>
                <th className="text">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="text">Mark</td>
                <td className="text">1</td>
                </tr>
                <tr>
                <td className="text">Jacob</td>
                <td className="text">2</td>
                </tr>
            </tbody> 
            </Table>
            </div>
            <Footer />
        </>
    );  
}

export default Content;
