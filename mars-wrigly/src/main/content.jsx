import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './content.scss';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export function Content () { 
    return (
        // <>
        <div className="content-section">
            <Link to="/">
            <Button type="submit" color="primary" className="logout"><PowerSettingsNewIcon /></Button>
            </Link>
            </div>
        // </>
    );  
}

export default Content;
