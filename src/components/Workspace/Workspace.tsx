import { FaCalendarAlt, FaRegBuilding } from 'react-icons/fa';
import { FcBusiness, FcFlowChart, FcSurvey } from 'react-icons/fc';
import { Link, RouteComponentProps } from 'react-router-dom';
import React, { Component } from 'react';

import Button from '../common/Button/Button';
import { GoGitMerge } from 'react-icons/go';
import { IWorkspace } from '../../utils/Rest';
import Img from '../common/Img/Img';
import RestService from '../../utils/RestService';
import { RiSettings3Line } from 'react-icons/ri';
import Work from '../Work/Work';
import cx from "classnames";
import styles from "./Workspace.module.scss";

interface WorkspaceParams {
    id: number;
}
type S = {
    workspace: IWorkspace | null
    sectionHidden: boolean
}
class Workspace extends Component<RouteComponentProps, S> {
    service = new RestService();

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            workspace: null,
            sectionHidden: false
        }
    }

    componentDidMount() {
        const workspaceId = Number((this.props.match.params as WorkspaceParams).id);
        this.getWorkspace(workspaceId);
    }

    componentDidUpdate() {
        const workspaceId = Number((this.props.match.params as WorkspaceParams).id);
        if (this.state.workspace?.id !== workspaceId) {
            this.getWorkspace(workspaceId);
        }
    }

    getLogo(type: IWorkspace['type'] | undefined) {
        let Icon;
        switch (type) {
            case 'Contarct': Icon = FcSurvey; break;
            case 'Corporate': Icon = FcBusiness; break;
            case 'Norms': Icon = FcFlowChart; break;
            default: Icon = FcSurvey; break;
        }
        return Icon && <Icon className={styles.tileLogo} />;
    }
    getWorkspace(id: number) {
        const workspace = this.service.getWorkspace(id);
        if (workspace) {
            this.setState({
                workspace: workspace
            })
        } else {
            this.props.history.push('/404');
        }
    }

    hideSection() {
        this.setState((prevState) => {
            return {
                sectionHidden: !prevState.sectionHidden
            }
        })
    }

    getTiles() {
        const tiles = [{
            title: <>Explore your <b>entities</b></>,
            description: 'Take a few minutes to look at the most important elements and specificities of your entities',
            icon: FaRegBuilding,
            route: '/entities'
        }, {
            title: <>Structure the <b>ownership</b></>,
            description: 'Get a clear view of the ownership by looking at the realations between individuals and entities',
            icon: GoGitMerge,
            route: '/404'
        }, {
            title: <>Define the <b>calendar</b></>,
            description: 'Prepare future events by creating detailed plans around the life of your entity',
            icon: FaCalendarAlt,
            route: '/404'
        }];

        return tiles.map((tile, i) => {
            const Ico = tile.icon;
            const content = <>
                <Ico className={styles.tileIcon} />
                <Ico className={styles.tileIconBg} />
                <h2 className={styles.tileTitle}>{tile.title}</h2>
                <p className={styles.tileDesc}>{tile.description}</p>
            </>;
            return <Link to={tile.route} key={`tile_${i}`} className={styles.tile}>{content}</Link>;
        });
    }

    render() {
        const { workspace, sectionHidden } = this.state;
        return (
            <div className={cx(styles.Workspace)} >
                <section className={cx(styles.WorkspaceSection, styles.head)}>
                    <Img src={workspace?.background} className={styles.banerImage} />
                    <div className={styles.headInfo}>
                        <Button className={styles.headInfoButton} iconOnly icon={RiSettings3Line} />
                        {this.getLogo(workspace?.type)}
                        <div className={styles.headInfoContent}>
                            <h2 className="header-2">{workspace?.title}</h2>
                            <p>Y’know, me too. That’s another thing we have in common. I hate it when you’ve got someone in your face, you try to give someone a hint and they won’t leave, and then there’s that big awkward silence…</p>
                        </div>
                    </div>
                </section>
                <section className={styles.WorkspaceSection} >
                    <h3 className={'header-3'}>Start working on what corporate matters</h3>
                    <Button className={styles.hideBtn} label={sectionHidden ? 'Show' : 'Hide'} onClick={() => this.hideSection()} />
                    <div className={styles.tiles} hidden={sectionHidden}>
                        {this.getTiles()}
                    </div>
                </section>
                <section className={styles.WorkspaceSection}>
                    <Work uselessButtons />
                </section>
            </div >
        );
    }
}

export default Workspace;
