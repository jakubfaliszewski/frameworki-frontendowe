import { BiBookAlt, BiBuildings } from 'react-icons/bi';
import { FcBusiness, FcFlowChart, FcSurvey } from "react-icons/fc";
import React, { Component, RefObject } from 'react';
import { formatDate, newMomentDate } from '../../../utils/dateUtils';

import { FiUsers } from "react-icons/fi";
import { IWorkspace } from '../../../utils/Rest';
import Img from '../../common/Img/Img';
import { Link } from 'react-router-dom';
import RestService from '../../../utils/RestService';
import { RiNewspaperLine } from "react-icons/ri";
import styles from "./WorkspacesSlider.module.scss";

type S = {
    workspaces: Array<IWorkspace> | null
}

class WorkspacesSlider extends Component<{}, S> {
    slider: RefObject<HTMLDivElement> = React.createRef();

    constructor(props: {}) {
        super(props);
        this.state = {
            workspaces: null
        }

        this.dragEvent = this.dragEvent.bind(this);
    }

    componentDidMount() {
        const service = new RestService();
        this.setState({
            workspaces: service.getWorkspaces()
        })
        this.slider.current?.addEventListener('drag', this.dragEvent);
    }

    componentWillUnmount() {
        this.slider.current?.removeEventListener('drag', this.dragEvent);
    }

    dragEvent(ev: DragEvent) {
        console.log(ev);
    }

    getLogo(type: IWorkspace['type']) {
        let Icon;
        switch (type) {
            case 'Contarct': Icon = FcSurvey; break;
            case 'Corporate': Icon = FcBusiness; break;
            case 'Norms': Icon = FcFlowChart; break;
            default: Icon = FcSurvey; break;
        }
        return Icon && <Icon className={styles.tileLogo} />;
    }

    getIcon(type: IWorkspace['type']) {
        let Icon;
        switch (type) {
            case 'Contarct': Icon = RiNewspaperLine; break;
            case 'Corporate': Icon = BiBuildings; break;
            case 'Norms': Icon = BiBookAlt; break;
            default: Icon = RiNewspaperLine; break;
        }
        return Icon && <Icon />;
    }

    getWorkspaceTile(work: IWorkspace) {
        return <Link className={styles.tile} to={`/workspace/${work.id}`}>
            <div className={styles.tileBg} style={{ backgroundImage: `url(${work.background})` }}></div>
            <div className={styles.tileContent}>
                <div className={styles.tileTitle}>
                    {this.getLogo(work.type)}
                    <h3>{work.title}</h3>
                </div>
                <div className={styles.tileInfo}>
                    {this.getIcon(work.type)}
                    <span>{work.type}</span>
                    <div className={styles.separator} />
                    <FiUsers />
                    <span>{work.users} users</span>
                </div>
                <time>Last update {formatDate(newMomentDate(work.lastUpdate), true)}</time>
            </div>
        </Link>
    }

    render() {
        const { workspaces } = this.state;
        return (<>
            <h2 className={'header-2 header-indent'}>Workspaces</h2>
            <section className={styles.Workspaces} ref={this.slider}>
                {workspaces?.map((ws) => this.getWorkspaceTile(ws))}
            </section>
        </>);
    }
}

export default WorkspacesSlider;