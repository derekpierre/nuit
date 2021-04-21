import React from 'react';
import { ReactComponent as TheIcon } from '@project/react-app/src/assets/icons/circleQ.svg'
import { Form, Button, Tooltip, OverlayTrigger} from 'react-bootstrap/';

export const CircleQ = ({ tooltip }) => {

    return (
        <span className="p-2">
            <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>
            <TheIcon/>
        </OverlayTrigger>
        </span>
    )
}