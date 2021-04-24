import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { getDefaultProvider } from '@ethersproject/providers'

import { Context } from '../utils'

import { Form, Button, Tooltip, OverlayTrigger, Row, Col, Container} from 'react-bootstrap/';


import { Contract } from '@ethersproject/contracts'
import { addresses, abis } from '@project/contracts'

import { Grey, Blue, Input} from '@project/react-app/src/components'


export const NuBalance = (props) => {
    const context = useContext(Context)
    const {provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts} = context.wallet

    useEffect(() => {
        if (!props.balance && props.onBalance){
            function handleBalance(nunits) {
                props.onBalance(nunits)
            }
            if (provider && account){
                const defaultProvider = getDefaultProvider(parseInt(provider.chainId))
                const NUtoken = new Contract(addresses[provider.chainId].NU, abis[provider.chainId].NU, defaultProvider)
                NUtoken.balanceOf(account).then(handleBalance)
            }
        }
    }, [ account ])

    return (
        <div>
            {props.balance ? <strong><Blue>{(parseFloat(props.balance) / 10 ** 18).toFixed(2)}</Blue> <Grey>NU</Grey></strong> : ''}
        </div>
    )
}


function NuCLickDisplay (props) {

    return (
        <Button onClick={props.onClick} variant="link">
            <NuBalance balance={props.balance} onBalance={props.onBalance}/>
        </Button>
    )
}

export const NuStakeAllocator = (props) => {

    const [NUBalance, setNUBalance] = useState(null)
    const [localValue, setLocalValue] = useState(props.value? props.value : '')

    const setValue = (value) => {
        props.onChange(value)
        setLocalValue(value)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="d-flex justify-content-between">
                        <Grey>Stake</Grey>
                        <NuCLickDisplay onClick={(e) => setValue(NUBalance)} balance={NUBalance} onBalance={setNUBalance}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        as={Input}
                        onChange={(e) => setValue(e.target.value)}
                        isInvalid={props.valid === false }
                        type="text"
                        value={localValue}
                    />
                    <Form.Control.Feedback type="invalid">Amount is less than the minimum 15,000 NU.</Form.Control.Feedback>
                </Form.Group>
            </Row>
    </Container>
    )
}