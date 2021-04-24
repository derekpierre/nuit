import React from 'react'
import { useState, useEffect, useContext } from 'react';

import { Context } from '@project/react-app/src/utils'

import { Container, Row, Col } from 'react-bootstrap/';
import { Grey, Blue, InputBox, ButtonBox, PrimaryButton, CircleQ, WorkerRunwayDisplay, DataRow, SecondaryButton } from '@project/react-app/src/components'


export default (props) => {

    const [stakerAddress, setStakerAddress] = useState(null);
    const [workerAddress, setWorkerAddress] = useState(props.workerAddress || null)
    const [stakingBalance, setStakingBalance] = useState(0)

    const context = useContext(Context)
    const {provider, loadWeb3Modal, logoutOfWeb3Modal, account, web3, contracts} = context.wallet;


    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Bond Worker</h1>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={12} >

                    <InputBox className="mt-3">
                        <Row >
                            <Col>
                                <div className="d-flex justify-content-between">
                                <Grey>Worker</Grey>
                                </div>
                               <ButtonBox className="mb-3 mt-1">
                                   <strong>{workerAddress}</strong>
                                   <WorkerRunwayDisplay address={workerAddress}/>
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3">
                                    <strong>{stakerAddress || account}</strong>
                                    <DataRow className="mt-3">
                                    <strong>Staking Balance</strong><span><Blue>{48000 + 96000}</Blue> <Grey>NU</Grey></span>
                                    </DataRow>
                                </ButtonBox>

                                <PrimaryButton className="mt-3">Bond</PrimaryButton>
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
            </Row>
        </Container>
    )
}