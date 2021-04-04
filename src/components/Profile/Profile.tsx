import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { VscClose, VscEdit, VscSave } from 'react-icons/vsc';
import { inputDate, newMomentDate } from '../../utils/dateUtils';

import { BsBriefcase } from "react-icons/bs";
import Button from '../common/Button/Button';
import Fees from './Fees/Fees';
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IProfile } from '../../utils/Rest';
import { IStore } from '../../store';
import MainInfo from './MainInfo/MainInfo';
import PanellInformations from './PanellInformations/PanellInformations';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import Proposals from './Proposals/Proposals';
import RestService from '../../utils/RestService';
import Reviews from './Reviews/Reviews';
import { UsersState } from '../../reducers/UsersReducer';
import { connect } from 'react-redux';
import styles from "./Profile.module.scss";
import { usersFetchData } from '../../actions/UserActions';
import { v4 as uuid } from "uuid";

interface ProfileParams {
    userId: number;
}

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}
type P = RouteComponentProps & StateProps & DispatchProps;
type S = {
    profileForm: IProfile
    profileEdit: boolean
}

class Profile extends Component<P, S> {
    service = new RestService();
    validTemp: any = {};
    tempProfile: IProfile | null = null;
    constructor(props: P) {
        super(props);
        this.state = {
            profileForm: {
                details: {
                    expertise: [{ id: uuid(), value: "Merges and acquisition" }],
                    specialities: [{ id: uuid(), value: "Cross border operation" }, { id: uuid(), value: "Transactions over 500M€/$" }],
                    admissions: [{ id: uuid(), value: "Paris bar association" }, { id: uuid(), value: "Tunisian bar association" }],
                    counties: [{ id: uuid(), value: "Tunisia" }]
                },
                panelInformations: {
                    hourlyFee: "610$/hour (Negociated)",
                    terms: "Attachement_lorem.jpg",
                    correspondants: [{ id: uuid(), value: "Lorem Kowalski" }, { id: uuid(), value: "Ipsum Nowak"}]
                },
                proposals: [{
                    id: uuid(),
                    name: "Operation time",
                    entity: 'Renault Corporation',
                    location: "France",
                    expertise: '#Tax',
                    date: inputDate(newMomentDate('01/20/2018')),
                    firm: 'Racine'
                }, {
                    id: uuid(),
                    name: "Op. Promtech",
                    entity: 'Renault HQ',
                    location: "USA",
                    expertise: '#M&A',
                    date: inputDate(newMomentDate('02/18/2019')),
                    firm: 'Clifford chance'
                }, {
                    id: uuid(),
                    name: "Op. Latandre",
                    entity: 'Renault Breslau',
                    location: "Germany",
                    expertise: '#Social',
                    date: inputDate(newMomentDate('02/18/2019')),
                    firm: 'SVZ'
                }],
                reviews: [{
                    id: uuid(),
                    name: "Operation time",
                    entity: 'Renault Corporation',
                    location: "France",
                    expertise: '#Tax',
                    date: inputDate(newMomentDate('01/20/2018'))
                }, {
                    id: uuid(),
                    name: "Op. Promtech",
                    entity: 'Renault HQ',
                    location: "USA",
                    expertise: '#M&A',
                    date: inputDate(newMomentDate('02/18/2019')),
                }, {
                    id: uuid(),
                    name: "Op. Latandre",
                    entity: 'Renault Breslau',
                    location: "Germany",
                    expertise: '#Social',
                    date: inputDate(newMomentDate('02/18/2019')),
                }],
                fees: [{
                    id: uuid(),
                    year: 2019,
                    costCenter: "CS 153",
                    totalAmount: 3500,
                    firm: "Clifford chance"
                }, {
                    id: uuid(),
                    year: 2018,
                    costCenter: "CS 153",
                    totalAmount: 9500,
                    firm: "Linklaters"
                }, {
                    id: uuid(),
                    year: 2017,
                    costCenter: "CS 47",
                    totalAmount: 10500,
                    firm: "Linklaters"
                }, {
                    id: uuid(),
                    year: 2017,
                    costCenter: "CS 153",
                    totalAmount: 18500,
                    firm: "Linklaters"
                }, {
                    id: uuid(),
                    year: 2017,
                    costCenter: "CS 32",
                    totalAmount: 15500,
                    firm: "Linklaters"
                }]
            },
            profileEdit: false,
        }

        this.getProfile = this.getProfile.bind(this);
        this.changeState = this.changeState.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        this.getProfile(userId);
    }

    componentDidUpdate() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        const profile = this.props.users.find(v => v.id === userId)?.user;

        if (profile?.id !== userId) {
            this.getProfile(userId);
        }
    }

    getProfile(id: number) {
        this.props.fetchData(id);
    }

    changeState(obj: any) {
        this.setState(obj);
    }

    editProfile() {
        this.tempProfile = JSON.parse(JSON.stringify(this.state.profileForm));
        this.setState({
            profileEdit: true
        })
    }

    cancelEdit() {
        this.setState({
            profileEdit: false,
            profileForm: this.tempProfile as IProfile
        }, () => {
            this.tempProfile = null;
        });
    }
    saveProfile() {
        this.setState({
            profileEdit: false
        });
        this.tempProfile = null;
    }

    render() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        const profile = this.props.users.find(v => v.id === userId)?.user;

        return profile
            ? <section className={styles.Profile}>
                <div className={styles.ProfileHeader}>
                    <Button className={styles.ProfileHeaderButton} label={"Message"} icon={FiMessageCircle} />
                    <Button className={styles.ProfileHeaderButton} label={"Create a request"} icon={HiOutlineDocumentText} />
                    <Button className={styles.ProfileHeaderButton} label={"Add to cluster"} icon={BsBriefcase} />
                </div>
                <MainInfo profile={profile} changeState={this.changeState} />
                <hr />
                <div className={styles.ProfileContent}>
                    <div className={styles.editHeader}>
                        {this.state.profileEdit
                            ? <>
                                <Button iconOnly className={styles.editButton} disabled={false} icon={VscSave} onClick={() => this.saveProfile()} />
                                <Button iconOnly className={styles.editButton} icon={VscClose} onClick={this.cancelEdit} />
                            </>
                            : <Button iconOnly className={styles.editButton} icon={VscEdit} onClick={this.editProfile} />}
                    </div>
                    <ProfileDetails data={this.state.profileForm.details} formActive={this.state.profileEdit} />
                    <hr />
                    <PanellInformations data={this.state.profileForm.panelInformations} formActive={this.state.profileEdit} />
                    <hr />
                    <Proposals data={this.state.profileForm.proposals} formActive={this.state.profileEdit} />
                    <hr />
                    <Reviews data={this.state.profileForm.reviews} formActive={this.state.profileEdit} />
                    <hr />
                    <Fees data={this.state.profileForm.fees} formActive={this.state.profileEdit} />
                </div>
            </section>
            : <div></div>;
    }
}

const mapStateToProps = (state: IStore) => {
    return {
        users: state.users.users,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(usersFetchData(id) as unknown as AnyAction)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));