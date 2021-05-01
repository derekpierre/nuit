<<<<<<< HEAD
import React, {useContext, useEffect, useState} from 'react'

import {Context} from '@project/react-app/src/utils'

import {Col, Container, Row} from 'react-bootstrap/';
import {
    Blue,
    ButtonBox,
    CircleQ,
    DataRow,
    EthBalance,
    Grey,
    InputBox,
    NuBalance,
    PendingButton,
    PrimaryButton,
    SubStakeList,
    ToggleButton,
    WorkerRunwayDisplay
} from '@project/react-app/src/components'
=======
import React from 'react'
import { useState, useEffect, useContext } from 'react';

import { Context } from '@project/react-app/src/utils'

import { Container, Row, Col } from 'react-bootstrap/';
import { Grey, Blue, InputBox, ButtonBox, PrimaryButton, PendingButton, ToggleButton, CircleQ, WorkerRunwayDisplay, DataRow, EthBalance, NuBalance, SubStakeList, Spinner} from '@project/react-app/src/components'
>>>>>>> 67f508b (migration feedback)
import Breadcrumbs from '@project/react-app/src/components/breadcrumbs'
import {HistoryPane} from "../components/history";

export function Manage() {

    const context = useContext(Context)
    const {account} = context.wallet
    const stakerData = context.stakerData
    const workerAddress = context.workerAddress.get
    const availableETH = context.availableETH.get
    const availableNU = context.availableNU.get
    const setAvailableETH = context.availableETH.set
    const setAvailableNU = context.availableNU.set

    // TODO:  clean this into a for loop
    const [windingdown, setWindingdown]  = useState(false)
    const [restaking, setRestaking] = useState(false)
    const [bondingworker, setBondingWorker]  = useState(false)
    const [addingsubstake, setAddingSubstake] = useState(false)
    const [migrating, setMigrating] = useState(false)


    const [showInactive, setShowInactive] = useState(false)

    const handleChangeWorker = () => {
        context.modals.triggerModal({message: "Bond Worker", component: "BondWorker"})
    }

    const handleChangeRestake = () => {
        context.modals.triggerModal({message: "Toggle Restake", component: "Restake"})
    }

    const handleChangeWindDown = () => {
        context.modals.triggerModal({message: "Toggle WindDown", component: "Winddown"})
    }

    const handleAddSubstake = () => {
        context.modals.triggerModal({message: "Add Substake", component: "CreateStake"})
    }

    useEffect(() => {
        setWindingdown(context.pending.indexOf('winddown') > -1)
        setRestaking(context.pending.indexOf('restake') > -1)
        setBondingWorker(context.pending.indexOf('bondingworker') > -1)
        setAddingSubstake(context.pending.indexOf('addsubstake') > -1)
        setMigrating(context.pending.indexOf('migrate') > -1)

    }, [context.pending.length, context.pending])


    return (

        <Container>
            <Row>
                <Breadcrumbs paths={[
                    {path:'/', label: 'root', enabled: true },
                    {path: '/manage', label: 'manage', enabled: true},
                ]}/>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-4 mt-2">
                    <h1>Manage Staked Nu</h1>
                </Col>
            </Row>
            {migrating ? <Row><Col className="d-flex justify-content-center"><h3><Spinner/>Please wait for migration to complete. <Spinner/></h3></Col></Row> :
            <Row className="d-flex justify-content-center">
                <Col xl={6} >
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-flex-start mb-1">
                                <h5>Rewards</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-flex flex-md-column justify-content-between">
                                <div className="d-flex flex-md-column">
                                    <div>
                                        <strong>Staking</strong>
                                        <CircleQ tooltip="NU Rewards earned by committing to work for the network"/>
                                    </div>
                                    <PrimaryButton className="mt-2" width="100"><small>Withdraw</small>  <NuBalance balance={stakerData.availableNUWithdrawal}/></PrimaryButton>
                                </div>
                                <div className="d-flex flex-md-column">
                                    <div className="mt-4">
                                        <strong>Policy</strong>
                                        <CircleQ tooltip="ETH rewards collected from policy fees"/>
                                    </div>
                                    <PrimaryButton className="mt-2" width="100"><small>Withdraw</small> {stakerData.availableETHWithdrawal} <Grey>ETH</Grey></PrimaryButton>
                                </div>
                            </Col>
                        </Row>
                    </InputBox>
                    <InputBox className="mt-4 mb-4">
                        <Row>
                            <Col className="d-flex justify-content-flex-start mb-1">
                                <h5>Settings</h5>
                            </Col>
                        </Row>
                        <Row>
                            {stakerData.flags ? <Col className="d-flex justify-content-between">
                                <Col>
                                    <div className="d-flex justify-content-flex-start align-items-center">
                                        <strong>Re-Stake</strong>
                                        <CircleQ tooltip="Compound your staking returns by automatically re-staking each period's rewards."/>
                                    </div>
                                    <ToggleButton abort={setRestaking} activeCheck={restaking} boolState={stakerData.flags.reStake} onClick={handleChangeRestake} />
                                </Col>
                                <Col>
                                    <div className="d-flex justify-content-flex-start align-items-center">
                                        <strong>Wind Down</strong>
                                        <CircleQ tooltip="Each period committed will reduce stake length by one period."/>
                                    </div>
                                    <ToggleButton abort={setWindingdown} activeCheck={windingdown} boolState={stakerData.flags.windDown} onClick={handleChangeWindDown} />
                                </Col>
                            </Col>: null}
                        </Row>
                    </InputBox>
                </Col>
                <Col xl={7}>
                    <InputBox>
                        <Row>
                            <Col className="d-flex justify-content-flex-start mb-4">
                                <h5>Running</h5>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <Grey>Worker</Grey>
                                    <PendingButton small activeCheck={bondingworker} onClick={handleChangeWorker} abort={setBondingWorker}>{workerAddress ? 'Change' : 'Set Worker'}</PendingButton>
                                </div>
                               <ButtonBox className="mb-3 mt-1 control-box">
                                   { workerAddress ?
                                   <div>
                                    <strong>{workerAddress}</strong>
                                    <WorkerRunwayDisplay address={workerAddress}/>
                                    <DataRow>
                                        <strong>Last Committed Period</strong><span><Blue>{stakerData.info.nextCommittedPeriod || stakerData.info.nextCommittedPeriod}</Blue></span>
                                        </DataRow>
                                    </div> : <p> no worker associated with account</p>}
                               </ButtonBox>

                               <div className="d-flex justify-content-between">
                                <Grey className="mb-3">Staker</Grey>
                               </div>
                               <ButtonBox className="mb-3 control-box">
                                   <strong>{account}</strong>
                                   <DataRow className="mt-3">
                                       <strong>ETH balance</strong><span><EthBalance balance={availableETH} onBalance={setAvailableETH}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>NU balance <small>(wallet)</small></strong><span><NuBalance balance={availableNU} onBalance={setAvailableNU}/></span>
                                    </DataRow>
                                    <DataRow>
                                       <strong>Total NU Locked</strong><span><NuBalance balance={stakerData.lockedNU}/></span>
                                    </DataRow>
                               </ButtonBox>
                               <div className="d-flex justify-content-between align-items-center mb-2">
                                <Grey>Substakes</Grey>
                                <PendingButton small activeCheck={addingsubstake} onClick={handleAddSubstake} abort={setAddingSubstake}>Add Substake</PendingButton>
                                </div>
                                {stakerData.substakes.length ? <SubStakeList substakes={stakerData.substakes} element={ButtonBox} /> : null}
                            </Col>
                        </Row>
                    </InputBox>
                </Col>
                <Col>
                    <div id="historyLabel" className="flex-row justify-content-lg-center text-center">
                        <h4>History</h4>
                    </div>
                    <HistoryPane/>
                </Col>
            </Row>}
        </Container>
    )
}